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
    nav: number;
    navDiscount: number; // Percentage
    expenseRatio: number;
    trackingError: number;
    aum: string;
    avgVolume: string;
    rating: number;
    yield: number;
    peRatio: number;
    pbRatio: number;
    topHoldings: {
        company: string;
        allocation: number;
    }[];
    sectorAllocation: {
        sector: string;
        percentage: number;
    }[];
    assetAllocation: {
        equity: number;
        debt: number;
        cash: number;
        others: number;
    };
    liquidityScore: number; // 1-10
    bidAskSpread: number; // Percentage
    description: string;
    history: PriceHistoryPoint[];
}
