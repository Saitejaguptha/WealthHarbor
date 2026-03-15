import type { Stock, MarketCap } from '../types/stock';
import { generatePriceHistory } from './historyUtils';

export const SECTORS = [
    'Banking', 'IT Services', 'FMCG', 'Energy', 'Automobile',
    'Healthcare', 'Telecom', 'Construction', 'Metal & Mining',
    'Chemicals', 'Consumer Durables', 'Financial Services', 'Agriculture'
];

export const MARKET_CAPS: MarketCap[] = ['High Cap', 'Mid Cap', 'Small Cap', 'Micro Cap'];

const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'BHARTIARTL', 'SBIN', 'ITC', 'ASIANPAINT', 'TITAN', 'LTIM', 'MARUTI', 'SUNPHARMA', 'TATASTEEL', 'NTPC'];
const names = ['Reliance Industries', 'Tata Consultancy Services', 'HDFC Bank', 'Infosys Ltd', 'ICICI Bank', 'Bharti Airtel', 'State Bank of India', 'ITC Ltd', 'Asian Paints', 'Titan Company', 'LTI Mindtree', 'Maruti Suzuki', 'Sun Pharmaceutical', 'Tata Steel', 'NTPC Ltd'];

export const generateRandomStocks = (count: number): Stock[] => {
    return Array.from({ length: count }).map((_, i) => {
        const change = (Math.random() * 20) - 10;
        const price = 200 + Math.random() * 5000;
        return {
            id: `stock-${i}`,
            symbol: symbols[i % symbols.length],
            name: names[i % names.length],
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((change / (price / 100)).toFixed(2)),
            marketCap: MARKET_CAPS[i % 3], // Distribute across caps
            sector: SECTORS[i % SECTORS.length],

            // Advanced Metrics
            peRatio: parseFloat((10 + Math.random() * 50).toFixed(2)),
            marketCapValue: (1000 + Math.random() * 1500000).toFixed(0) + ' Cr',
            dividendYield: parseFloat((Math.random() * 3).toFixed(2)),
            netProfit: (500 + Math.random() * 10000).toFixed(0) + ' Cr',
            qtrProfit: (100 + Math.random() * 2000).toFixed(0) + ' Cr',
            qtrSales: (1000 + Math.random() * 50000).toFixed(0) + ' Cr',
            salesGrowth: parseFloat((Math.random() * 25).toFixed(1)),
            roce: parseFloat((5 + Math.random() * 35).toFixed(1)),
            debtToEquity: parseFloat(Math.random().toFixed(2)),
            fiftyTwoWeekHigh: parseFloat((price * (1 + Math.random() * 0.4)).toFixed(2)),
            fiftyTwoWeekLow: parseFloat((price * (1 - Math.random() * 0.4)).toFixed(2)),
            history: generatePriceHistory(price)
        };
    });
};

// Global singleton for demo consistency
let cachedStocks: Stock[] | null = null;

export const refreshStocks = () => {
    cachedStocks = generateRandomStocks(15);
    return cachedStocks;
};

export const getStocks = () => {
    if (!cachedStocks) {
        cachedStocks = generateRandomStocks(15);
    }
    return cachedStocks;
};

export const getStockBySymbol = (symbol: string) => {
    return getStocks().find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
};
