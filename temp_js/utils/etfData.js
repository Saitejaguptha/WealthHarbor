"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshETFs = exports.getETFs = exports.generateRandomETFs = exports.ETF_FUND_HOUSES = exports.ETF_MARKET_CAPS = exports.ETF_SECTORS = void 0;
const historyUtils_1 = require("./historyUtils");
exports.ETF_SECTORS = [
    'Technology', 'Banking', 'Energy', 'Pharma', 'Financials',
    'Index', 'Commodity', 'Consumption', 'Infrastructure', 'Auto'
];
exports.ETF_MARKET_CAPS = ['Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap'];
exports.ETF_FUND_HOUSES = [
    'Nippon India', 'SBI Mutual Fund', 'ICICI Prudential', 'HDFC Mutual Fund',
    'UTI Mutual Fund', 'Kotak Mutual Fund', 'Axis Mutual Fund', 'Motilal Oswal'
];
const etfSymbols = ['NIFTYBEES', 'BANKBEES', 'GOLDBEES', 'ITBEES', 'PHARMABEES', 'SETFNIF50', 'SETFNN50', 'LIQUIDBEES', 'MON100', 'CPSEETF'];
const etfNames = ['Nippon India Nifty 50 BeES', 'Nippon India Bank BeES', 'Nippon India Gold BeES', 'Nippon India IT BeES', 'Nippon India Pharma BeES', 'SBI ETF Nifty 50', 'SBI ETF Nifty Next 50', 'Nippon India Liquid BeES', 'Motilal Oswal Nasdaq 100 ETF', 'CPSE ETF'];
const generateRandomETFs = () => {
    const sectors = ['Technology', 'Banking', 'Energy', 'Pharma', 'Financials', 'Consumption', 'Infrastructure', 'Auto'];
    const companies = ['Reliance', 'TCS', 'HDFC Bank', 'ICICI Bank', 'Infosys', 'Airtel', 'SBI', 'L&T', 'ITC', 'HUL'];
    return Array.from({ length: etfSymbols.length }).map((_, i) => {
        const sector = exports.ETF_SECTORS[i % exports.ETF_SECTORS.length];
        const marketCap = exports.ETF_MARKET_CAPS[i % exports.ETF_MARKET_CAPS.length];
        const house = exports.ETF_FUND_HOUSES[i % exports.ETF_FUND_HOUSES.length];
        const symbol = etfSymbols[i];
        const name = etfNames[i];
        const price = 20 + Math.random() * 5000;
        const change = -2 + Math.random() * 4;
        const nav = price * (0.98 + Math.random() * 0.04); // NAV close to price
        return {
            id: `etf-${i}`,
            symbol,
            name,
            fundHouse: house,
            sector,
            marketCap,
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((change / (price / 100)).toFixed(2)),
            nav: parseFloat(nav.toFixed(2)),
            navDiscount: parseFloat(((nav - price) / nav * 100).toFixed(2)),
            expenseRatio: parseFloat((0.05 + Math.random() * 0.9).toFixed(2)),
            trackingError: parseFloat((0.01 + Math.random() * 0.2).toFixed(2)),
            aum: (Math.random() * 50000 + 1000).toFixed(0) + ' Cr',
            avgVolume: (Math.random() * 5 + 0.1).toFixed(1) + 'M',
            rating: Math.floor(Math.random() * 5) + 1,
            yield: parseFloat((Math.random() * 2).toFixed(2)),
            peRatio: parseFloat((15 + Math.random() * 25).toFixed(2)),
            pbRatio: parseFloat((2 + Math.random() * 8).toFixed(2)),
            topHoldings: companies.slice(0, 6).map(c => ({
                company: c + ' Ltd',
                allocation: parseFloat((5 + Math.random() * 10).toFixed(2))
            })),
            sectorAllocation: sectors.slice(0, 4).map(s => ({
                sector: s,
                percentage: parseFloat((15 + Math.random() * 20).toFixed(2))
            })),
            assetAllocation: {
                equity: 98 + Math.random() * 2,
                debt: 0,
                cash: Math.random() * 2,
                others: 0
            },
            liquidityScore: Math.floor(Math.random() * 4) + 7, // 7-10
            bidAskSpread: parseFloat((0.01 + Math.random() * 0.05).toFixed(3)),
            description: `${name} tracks its underlying index with precision. It offers investors exposure to a diversified basket of securities with deep liquidity on the NSE/BSE and low impact cost.`,
            history: (0, historyUtils_1.generatePriceHistory)(price)
        };
    });
};
exports.generateRandomETFs = generateRandomETFs;
let cachedETFs = null;
const getETFs = () => {
    if (!cachedETFs) {
        cachedETFs = (0, exports.generateRandomETFs)();
    }
    return cachedETFs;
};
exports.getETFs = getETFs;
const refreshETFs = () => {
    cachedETFs = (0, exports.generateRandomETFs)();
    return cachedETFs;
};
exports.refreshETFs = refreshETFs;
