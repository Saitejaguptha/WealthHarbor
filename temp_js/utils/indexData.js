"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexByName = exports.getIndicesByExchange = exports.INDIAN_INDICES = void 0;
const historyUtils_1 = require("./historyUtils");
const generateIndices = () => {
    const rawIndices = [
        // NSE Indices
        { name: 'Nifty 50', value: '22,419.55', change: '+0.72%', points: '+161.40', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Bank', value: '47,286.90', change: '-0.15%', points: '-72.30', isPositive: false, exchange: 'NSE' },
        { name: 'Nifty IT', value: '37,120.45', change: '+1.45%', points: '+532.10', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Next 50', value: '60,125.30', change: '+0.95%', points: '+565.40', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Midcap 50', value: '13,845.20', change: '+1.12%', points: '+153.15', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Pharma', value: '18,920.15', change: '+0.54%', points: '+102.30', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty FMCG', value: '54,120.80', change: '-0.42%', points: '-228.35', isPositive: false, exchange: 'NSE' },
        { name: 'Nifty Auto', value: '20,845.60', change: '+1.85%', points: '+379.20', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Realty', value: '942.35', change: '+2.15%', points: '+19.85', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Metal', value: '8,125.40', change: '-0.65%', points: '-53.20', isPositive: false, exchange: 'NSE' },
        { name: 'Nifty Energy', value: '38,420.15', change: '+0.78%', points: '+297.45', isPositive: true, exchange: 'NSE' },
        { name: 'Nifty Media', value: '2,145.30', change: '-1.25%', points: '-27.15', isPositive: false, exchange: 'NSE' },
        // BSE Indices
        { name: 'S&P BSE Sensex', value: '73,903.91', change: '+0.86%', points: '+630.16', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE 100', value: '22,945.20', change: '+0.75%', points: '+171.45', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE 500', value: '31,845.60', change: '+0.92%', points: '+291.20', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE MidCap', value: '39,420.15', change: '+1.25%', points: '+487.35', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE SmallCap', value: '45,120.30', change: '+1.42%', points: '+632.15', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE Auto', value: '48,125.40', change: '+1.95%', points: '+920.45', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE Bankex', value: '53,845.20', change: '-0.12%', points: '-64.35', isPositive: false, exchange: 'BSE' },
        { name: 'S&P BSE FMCG', value: '19,120.60', change: '-0.38%', points: '-72.15', isPositive: false, exchange: 'BSE' },
        { name: 'S&P BSE IT', value: '38,125.30', change: '+1.52%', points: '+572.40', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE Metal', value: '27,120.45', change: '-0.55%', points: '-149.30', isPositive: false, exchange: 'BSE' },
        { name: 'S&P BSE Oil & Gas', value: '28,145.20', change: '+1.15%', points: '+320.15', isPositive: true, exchange: 'BSE' },
        { name: 'S&P BSE Realty', value: '7,125.30', change: '+2.25%', points: '+156.40', isPositive: true, exchange: 'BSE' }
    ];
    return rawIndices.map(idx => {
        const basePrice = parseFloat(idx.value.replace(/,/g, ''));
        return {
            ...idx,
            exchange: idx.exchange,
            history: (0, historyUtils_1.generatePriceHistory)(basePrice, 30),
            peRatio: parseFloat((15 + Math.random() * 15).toFixed(2)),
            pbRatio: parseFloat((2 + Math.random() * 5).toFixed(2)),
            divYield: parseFloat((0.5 + Math.random() * 2).toFixed(2)),
            marketCapValue: idx.exchange === 'NSE' ? '185.4T' : '390.2T'
        };
    });
};
exports.INDIAN_INDICES = generateIndices();
const getIndicesByExchange = (exchange) => {
    if (!exchange)
        return exports.INDIAN_INDICES;
    return exports.INDIAN_INDICES.filter(idx => idx.exchange === exchange);
};
exports.getIndicesByExchange = getIndicesByExchange;
const getIndexByName = (name) => {
    return exports.INDIAN_INDICES.find(idx => idx.name === name);
};
exports.getIndexByName = getIndexByName;
