import type { Stock, MarketCap } from '../types/stock';
import { generatePriceHistory } from './historyUtils';

export const SECTORS = [
    'Information Technology', 'Healthcare', 'Finance', 'Utilities', 'Real Estate',
    'Energy', 'Industrials', 'Materials', 'Consumer Discretionary', 'Communication services',
    'Automobile', 'Banks', 'Consumer staples', 'Financials', 'Agriculture',
    'Commercial services', 'Retail', 'Chemical substance', 'Defence'
];

export const MARKET_CAPS: MarketCap[] = ['High Cap', 'Mid Cap', 'Small Cap', 'Micro Cap'];

const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'BRK.B', 'NVDA', 'META', 'V', 'JPM', 'UNH', 'MA', 'PG', 'HD', 'LLY'];
const names = ['Apple Inc.', 'Microsoft Corp.', 'Alphabet Inc.', 'Amazon.com Inc.', 'Tesla Inc.', 'Berkshire Hathaway', 'NVIDIA Corp.', 'Meta Platforms', 'Visa Inc.', 'JPMorgan Chase', 'UnitedHealth Group', 'Mastercard Inc.', 'Procter & Gamble', 'Home Depot', 'Eli Lilly'];

export const generateRandomStocks = (count: number): Stock[] => {
    return Array.from({ length: count }).map((_, i) => {
        const change = (Math.random() * 20) - 10;
        const price = 50 + Math.random() * 500;
        return {
            id: `stock-${i}`,
            symbol: symbols[i % symbols.length] + (i >= symbols.length ? `-${i}` : ''),
            name: names[i % names.length] + (i >= names.length ? ` ${i}` : ''),
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((change / (price / 100)).toFixed(2)),
            marketCap: MARKET_CAPS[Math.floor(Math.random() * MARKET_CAPS.length)],
            sector: SECTORS[Math.floor(Math.random() * SECTORS.length)],

            // Advanced Metrics
            peRatio: parseFloat((15 + Math.random() * 40).toFixed(2)),
            marketCapValue: (10 + Math.random() * 900).toFixed(1) + (Math.random() > 0.5 ? 'B' : 'T'),
            dividendYield: parseFloat((Math.random() * 5).toFixed(2)),
            netProfit: (5 + Math.random() * 100).toFixed(1) + 'B',
            qtrProfit: (1 + Math.random() * 20).toFixed(1) + 'B',
            qtrSales: (10 + Math.random() * 200).toFixed(1) + 'B',
            salesGrowth: parseFloat((Math.random() * 30).toFixed(1)),
            roce: parseFloat((10 + Math.random() * 40).toFixed(1)),
            debtToEquity: parseFloat(Math.random().toFixed(2)),
            fiftyTwoWeekHigh: parseFloat((price * (1 + Math.random() * 0.3)).toFixed(2)),
            fiftyTwoWeekLow: parseFloat((price * (1 - Math.random() * 0.3)).toFixed(2)),
            history: generatePriceHistory(price)
        };
    });
};

// Global singleton for demo consistency
let cachedStocks: Stock[] | null = null;

export const refreshStocks = () => {
    cachedStocks = generateRandomStocks(10);
    return cachedStocks;
};

export const getStocks = () => {
    if (!cachedStocks) {
        cachedStocks = generateRandomStocks(10);
    }
    return cachedStocks;
};

export const getStockBySymbol = (symbol: string) => {
    return getStocks().find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
};
