"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSilverData = exports.getGoldData = exports.generateMetalHistory = void 0;
const numberFormat_1 = require("./numberFormat");
const generateMetalHistory = (basePrice, days = 30) => {
    const history = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        // Random walk for price
        const volatility = basePrice * 0.01;
        const change = (Math.random() - 0.5) * volatility;
        basePrice += change;
        history.push({
            date: date.toISOString().split('T')[0],
            price: (0, numberFormat_1.roundToMaxDecimals)(basePrice, numberFormat_1.DISPLAY_MAX_DECIMALS)
        });
    }
    return history;
};
exports.generateMetalHistory = generateMetalHistory;
const getGoldData = () => {
    const history = (0, exports.generateMetalHistory)(7500); // Base price per gram in INR
    return {
        name: 'Gold',
        currentPrice: history[history.length - 1].price,
        currency: 'INR',
        unit: 'gram',
        history
    };
};
exports.getGoldData = getGoldData;
const getSilverData = () => {
    const history = (0, exports.generateMetalHistory)(95); // Base price per gram in INR
    return {
        name: 'Silver',
        currentPrice: history[history.length - 1].price,
        currency: 'INR',
        unit: 'gram',
        history
    };
};
exports.getSilverData = getSilverData;
