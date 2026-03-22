"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePriceHistory = void 0;
const numberFormat_1 = require("./numberFormat");
const generatePriceHistory = (basePrice, days = 30) => {
    const history = [];
    const now = new Date();
    let currentPrice = basePrice;
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        // Random walk for price
        const volatility = currentPrice * 0.02;
        const priceChange = (Math.random() - 0.5) * volatility;
        currentPrice += priceChange;
        history.push({
            date: date.toISOString().split('T')[0],
            price: (0, numberFormat_1.roundToMaxDecimals)(currentPrice, numberFormat_1.DISPLAY_MAX_DECIMALS)
        });
    }
    return history;
};
exports.generatePriceHistory = generatePriceHistory;
