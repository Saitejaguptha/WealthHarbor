import type { PriceHistoryPoint } from './history';

export type ETFSector = 'Technology' | 'Healthcare' | 'Financials' | 'Energy' | 'Consumer Discretionary' | 'Utilities' | 'Real Estate' | 'Materials' | 'Industrials' | 'Communication Services' | 'Index' | 'Commodity';
export type ETFMarketCap = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Multi Cap';

export interface ETF {
    id: string;
    symbol: string;
    name: string;
    fundHouse: string;
    sector: ETFSector;
    marketCap: ETFMarketCap;
    price: number;
    change: number;
    changePercent: number;
    expenseRatio: number;
    trackingError: number;
    aum: string;
    avgVolume: string;
    rating: number;
    description: string;
    history: PriceHistoryPoint[];
}
