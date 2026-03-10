import type { PriceHistoryPoint } from './history';

export type MarketCap = 'High Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap';

export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: MarketCap;
    sector: string;

    // Advanced Metrics
    peRatio: number;
    marketCapValue: string; // e.g., "2.8T"
    dividendYield: number;
    netProfit: string; // e.g., "96.9B"
    qtrProfit: string;
    qtrSales: string;
    salesGrowth: number;
    roce: number;
    debtToEquity: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    history: PriceHistoryPoint[];
}
