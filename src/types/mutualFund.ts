import type { PriceHistoryPoint } from './history';

export type MutualFundSector = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap' | 'Flexi Cap' | 'Gold' | 'Silver' | 'Debt' | 'Hybrid' | 'Index' | 'ELSS' | 'Sectoral' | 'Focused' | 'Balanced' | 'Liquid';

export const MF_SECTORS: MutualFundSector[] = [
    'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'ELSS', 'Index', 'Sectoral', 'Focused', 'Balanced', 'Debt', 'Liquid'
];
export const FUND_HOUSES = [
    'SBI Mutual Fund', 'ICICI Prudential Mutual Fund', 'HDFC Mutual Fund', 'Axis Mutual Fund',
    'Mirae Asset Mutual Fund', 'Nippon India Mutual Fund', 'Kotak Mahindra Mutual Fund',
    'UTI Mutual Fund', 'Tata Mutual Fund', 'DSP Mutual Fund', 'Aditya Birla Sun Life Mutual Fund',
    'Quant Mutual Fund', 'Parag Parikh Mutual Fund', 'Canara Robeco Mutual Fund', 'Motilal Oswal Mutual Fund'
];

export interface MutualFund {
    id: string;
    name: string;
    fundHouse: string;
    sector: MutualFundSector;
    nav: number;
    change: number;
    changePercent: number;
    return1Y: number;
    return3Y: number;
    return5Y: number;
    aum: string;
    expenseRatio: number;
    rating: number;
    minSIP: number;
    holdings: {
        equity: number;
        debt: number;
        cash: number;
        commodities: number;
    };
    categoryAverage1Y: number;
    categoryAverage3Y: number;
    categoryAverage5Y: number;
    benchmarkName: string;
    benchmarkReturn1Y: number;
    benchmarkReturn3Y: number;
    benchmarkReturn5Y: number;
    topHoldings: {
        company: string;
        sector: string;
        allocation: number;
    }[];
    sectorAllocation: {
        sector: string;
        percentage: number;
    }[];
    riskMetrics: {
        standardDeviation: number;
        sharpeRatio: number;
        sortinoRatio: number;
        alpha: number;
        beta: number;
    };
    alpha: number; // legacy
    beta: number; // legacy
    exitLoad: string;
    stampDuty: string;
    taxImplication: string;
    fundManager: {
        name: string;
        experience: string;
        education: string;
        otherFunds: string[];
    };
    schemeDocuments: {
        name: string;
        url: string;
    }[];
    description: string;
    history: PriceHistoryPoint[];
}
