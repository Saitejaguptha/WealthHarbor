import type { MutualFund, MutualFundSector } from '../types/mutualFund';
import { generatePriceHistory } from './historyUtils';

export const MF_SECTORS: MutualFundSector[] = [
    'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'ELSS', 'Index', 'Sectoral', 'Focused', 'Balanced', 'Debt', 'Liquid'
];

export const FUND_HOUSES = [
    'SBI Mutual Fund', 'ICICI Prudential Mutual Fund', 'HDFC Mutual Fund', 'Axis Mutual Fund',
    'Mirae Asset Mutual Fund', 'Nippon India Mutual Fund', 'Kotak Mahindra Mutual Fund',
    'UTI Mutual Fund', 'Tata Mutual Fund', 'DSP Mutual Fund', 'Aditya Birla Sun Life Mutual Fund',
    'Quant Mutual Fund', 'Parag Parikh Mutual Fund', 'Canara Robeco Mutual Fund', 'Motilal Oswal Mutual Fund'
];

const mfNames = [
    'Parag Parikh Flexi Cap Fund',
    'SBI Bluechip Fund',
    'HDFC Mid-Cap Opportunities Fund',
    'Quant Small Cap Fund',
    'Mirae Asset Emerging Bluechip Fund',
    'ICICI Prudential Bluechip Fund',
    'Axis Growth Opportunities Fund',
    'Nippon India Small Cap Fund',
    'UTI Nifty 50 Index Fund',
    'Kotak Emerging Equity Fund'
];

export const generateRandomMFs = (): MutualFund[] => {
    return Array.from({ length: mfNames.length }).map((_, i) => {
        const nav = 15 + Math.random() * 800;
        const return1Y = 5 + Math.random() * 45;
        const return3Y = 10 + Math.random() * 35;
        const name = mfNames[i];
        const house = FUND_HOUSES.find(h => name.startsWith(h.split(' ')[0])) || FUND_HOUSES[i % FUND_HOUSES.length];
        const sector = MF_SECTORS[i % MF_SECTORS.length];

        // Generate holdings that add up to 100%
        const equity = 60 + Math.random() * 35;
        const debt = Math.random() * (100 - equity);
        const cash = 100 - equity - debt;

        return {
            id: `mf-${i}`,
            name,
            fundHouse: house,
            sector: sector,
            nav: parseFloat(nav.toFixed(2)),
            return1Y: parseFloat(return1Y.toFixed(2)),
            return3Y: parseFloat(return3Y.toFixed(2)),
            aum: (Math.random() * 30000 + 500).toFixed(0) + ' Cr',
            expenseRatio: parseFloat((0.5 + Math.random() * 1.5).toFixed(2)),
            rating: Math.floor(Math.random() * 3) + 3, // Rating 3-5
            minSIP: [500, 1000, 5000][Math.floor(Math.random() * 3)],
            holdings: {
                equity: parseFloat(equity.toFixed(2)),
                debt: parseFloat(debt.toFixed(2)),
                cash: parseFloat(cash.toFixed(2)),
                commodities: 0
            },
            alpha: parseFloat((2 + Math.random() * 10).toFixed(2)),
            beta: parseFloat((0.7 + Math.random() * 0.6).toFixed(2)),
            exitLoad: '1% if redeemed within 1 year',
            stampDuty: '0.005% (One-time on investment)',
            taxImplication: '10% on gains > 1L (LTCG)',
            fundManager: ['Rajeev Thakkar', 'Suresh Soni', 'Anil Kumar', 'Manish Bhargava'][Math.floor(Math.random() * 4)],
            description: `${name} is a top-rated investment vehicle aimed at providing long-term capital appreciation. Managed by professionals at ${house}, this fund focuses on high-growth assets.`,
            history: generatePriceHistory(nav)
        };
    });
};

let cachedMFs: MutualFund[] | null = null;

export const refreshMutualFunds = () => {
    cachedMFs = generateRandomMFs();
    return cachedMFs;
};

export const getMutualFunds = () => {
    if (!cachedMFs) {
        cachedMFs = generateRandomMFs();
    }
    return cachedMFs;
};
