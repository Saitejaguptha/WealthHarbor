"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommodityById = exports.refreshCommodities = exports.getAllCommodities = exports.getCommodities = exports.generateCommodityHistory = void 0;
const numberFormat_1 = require("./numberFormat");
const generateCommodityHistory = (basePrice, baseVolume, days = 30) => {
    const history = [];
    const now = new Date();
    let currentPrice = basePrice;
    let currentVolume = baseVolume;
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        // Random walk for price
        const volatility = currentPrice * 0.02;
        const priceChange = (Math.random() - 0.5) * volatility;
        currentPrice += priceChange;
        // Random walk for volume
        const volumeVolatility = currentVolume * 0.1;
        const volumeChange = (Math.random() - 0.5) * volumeVolatility;
        currentVolume += volumeChange;
        history.push({
            date: date.toISOString().split('T')[0],
            price: (0, numberFormat_1.roundToMaxDecimals)(currentPrice, numberFormat_1.DISPLAY_MAX_DECIMALS),
            volume: Math.floor(currentVolume)
        });
    }
    return history;
};
exports.generateCommodityHistory = generateCommodityHistory;
const COMMODITY_CONFIGS = [
    { id: 'gold', name: 'Gold', symbol: 'GOLD', unit: '10g', currency: 'INR', category: 'Metals', basePrice: 62540.00, baseVolume: 5000, icon: '✨', color: '#F59E0B' },
    { id: 'silver', name: 'Silver', symbol: 'SILVER', unit: 'KG', currency: 'INR', category: 'Metals', basePrice: 71230.00, baseVolume: 12000, icon: '🥈', color: '#94A3B8' },
    { id: 'oil', name: 'Crude Oil', symbol: 'CRUDEOIL', unit: 'Barrel', currency: 'INR', category: 'Energy', basePrice: 6515.50, baseVolume: 350000, icon: '🛢️', color: '#0F172A' },
    { id: 'gas', name: 'Natural Gas', symbol: 'NATGAS', unit: 'MMBtu', currency: 'INR', category: 'Energy', basePrice: 153.85, baseVolume: 150000, icon: '🔥', color: '#3B82F6' },
    { id: 'zinc', name: 'Zinc', symbol: 'ZINC', unit: 'Tonne', currency: 'INR', category: 'Metals', basePrice: 203350.00, baseVolume: 8000, icon: '⛓️', color: '#64748B' },
    { id: 'copper', name: 'Copper', symbol: 'COPPER', unit: 'KG', currency: 'INR', category: 'Metals', basePrice: 715.88, baseVolume: 25000, icon: '🔌', color: '#D97706' },
    { id: 'alu', name: 'Aluminium', symbol: 'ALUMINI', unit: 'Tonne', currency: 'INR', category: 'Metals', basePrice: 182600.00, baseVolume: 15000, icon: '🧊', color: '#CBD5E1' },
    { id: 'nick', name: 'Nickel', symbol: 'NICKEL', unit: 'Tonne', currency: 'INR', category: 'Metals', basePrice: 1452500.00, baseVolume: 3000, icon: '🔩', color: '#475569' }
];
const getCommodities = () => {
    // We should ideally cache this for the current session to keep history consistent
    return COMMODITY_CONFIGS.map(config => {
        const history = (0, exports.generateCommodityHistory)(config.basePrice, config.baseVolume);
        const latest = history[history.length - 1];
        const previous = history[history.length - 2];
        const change = (0, numberFormat_1.roundToMaxDecimals)(latest.price - previous.price, numberFormat_1.DISPLAY_MAX_DECIMALS);
        const changePercent = (0, numberFormat_1.roundToMaxDecimals)((change / previous.price) * 100, numberFormat_1.DISPLAY_MAX_DECIMALS);
        const prices = history.map(h => h.price);
        return {
            ...config,
            currentPrice: latest.price,
            currentVolume: latest.volume,
            change,
            changePercent,
            dayHigh: Math.max(...prices.slice(-24)), // Simplified day high
            dayLow: Math.min(...prices.slice(-24)), // Simplified day low
            history
        };
    });
};
exports.getCommodities = getCommodities;
let cachedCommodities = null;
const getAllCommodities = () => {
    if (!cachedCommodities) {
        cachedCommodities = (0, exports.getCommodities)();
    }
    return cachedCommodities;
};
exports.getAllCommodities = getAllCommodities;
const refreshCommodities = () => {
    cachedCommodities = (0, exports.getCommodities)();
    return cachedCommodities;
};
exports.refreshCommodities = refreshCommodities;
const getCommodityById = (id) => {
    return (0, exports.getAllCommodities)().find(c => c.id === id);
};
exports.getCommodityById = getCommodityById;
