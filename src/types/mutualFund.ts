import type { PriceHistoryPoint } from './history';

export type MutualFundSector = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap' | 'Flexi Cap' | 'Gold' | 'Silver' | 'Debt' | 'Hybrid' | 'Index' | 'ELSS' | 'Sectoral' | 'Focused' | 'Balanced' | 'Liquid';

export interface MutualFund {
    id: string;
    name: string;
    fundHouse: string;
    sector: MutualFundSector;
    nav: number;
    return1Y: number;
    return3Y: number;
    aum: string; // Assets Under Management
    expenseRatio: number;
    rating: number; // 1-5 stars
    minSIP: number;
    holdings: {
        equity: number;
        debt: number;
        cash: number;
        commodities: number;
    };
    alpha: number;
    beta: number;
    exitLoad: string;
    stampDuty: string;
    taxImplication: string;
    fundManager: string;
    description: string;
    history: PriceHistoryPoint[];
}
