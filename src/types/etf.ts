import type { PriceHistoryPoint } from './history';

export type ETFSector = 'Technology' | 'Banking' | 'Energy' | 'Pharma' | 'Financials' | 'Index' | 'Commodity' | 'Consumption' | 'Infrastructure' | 'Auto' | 'Healthcare' | 'Consumer Discretionary' | 'Utilities' | 'Real Estate' | 'Materials' | 'Industrials' | 'Communication Services';
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
