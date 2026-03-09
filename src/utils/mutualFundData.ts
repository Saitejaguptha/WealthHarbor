import type { MutualFund, MutualFundSector } from '../types/mutualFund';

export const MF_SECTORS: MutualFundSector[] = [
    'Large Cap', 'Mid Cap', 'Small Cap', 'Micro Cap', 'Flexi Cap', 'Gold', 'Silver', 'Debt', 'Hybrid', 'Index'
];

export const FUND_HOUSES = [
    'SBI Mutual Fund', 'ICICI Prudential Mutual Fund', 'HDFC Mutual Fund', 'Axis Mutual Fund',
    'Mirae Asset Mutual Fund', 'Nippon India Mutual Fund', 'Kotak Mahindra Mutual Fund',
    'UTI Mutual Fund', 'Tata Mutual Fund', 'DSP Mutual Fund', 'Aditya Birla Sun Life Mutual Fund',
    'Quant Mutual Fund', 'Parag Parikh Mutual Fund', 'Canara Robeco Mutual Fund', 'Motilal Oswal Mutual Fund'
];

export const generateRandomMFs = (count: number): MutualFund[] => {
    return Array.from({ length: count }).map((_, i) => {
        const nav = 10 + Math.random() * 500;
        const return1Y = -5 + Math.random() * 40;
        const return3Y = -2 + Math.random() * 30;
        const houseIndex = Math.floor(Math.random() * FUND_HOUSES.length);
        const house = FUND_HOUSES[houseIndex];
        const sector = MF_SECTORS[Math.floor(Math.random() * MF_SECTORS.length)];

        // Generate holdings that add up to 100%
        const equity = 40 + Math.random() * 50;
        const debt = Math.random() * (100 - equity);
        const cash = Math.random() * (100 - equity - debt);
        const commodities = 100 - equity - debt - cash;

        return {
            id: `mf-${i}`,
            name: `${house.split(' ')[0]} ${sector} Growth Fund`,
            fundHouse: house,
            sector: sector,
            nav: parseFloat(nav.toFixed(2)),
            return1Y: parseFloat(return1Y.toFixed(2)),
            return3Y: parseFloat(return3Y.toFixed(2)),
            aum: (Math.random() * 50 + 1).toFixed(1) + 'k Cr',
            expenseRatio: parseFloat((0.1 + Math.random() * 2).toFixed(2)),
            rating: Math.floor(Math.random() * 5) + 1,
            minSIP: [500, 1000, 2000, 5000][Math.floor(Math.random() * 4)],
            holdings: {
                equity: parseFloat(equity.toFixed(2)),
                debt: parseFloat(debt.toFixed(2)),
                cash: parseFloat(cash.toFixed(2)),
                commodities: parseFloat(commodities.toFixed(2))
            },
            alpha: parseFloat((-2 + Math.random() * 8).toFixed(2)),
            beta: parseFloat((0.5 + Math.random() * 1.5).toFixed(2)),
            exitLoad: Math.random() > 0.5 ? '1% if redeemed within 1 year' : 'Nil',
            stampDuty: '0.005% (One-time on investment)',
            taxImplication: sector === 'Debt' ? 'Taxed as per income slab' : '10% on gains > 1L (LTCG)',
            fundManager: ['John Doe', 'Sarah Smith', 'Aman Gupta', 'Elena Rodriguez'][Math.floor(Math.random() * 4)],
            description: `A highly diversified ${sector.toLowerCase()} mutual fund aimed at providing long-term capital appreciation. Managed by professionals at ${house}, this fund focuses on high-growth assets.`
        };
    });
};

let cachedMFs: MutualFund[] | null = null;

export const getMutualFunds = () => {
    if (!cachedMFs) {
        cachedMFs = generateRandomMFs(10);
    }
    return cachedMFs;
};

export const refreshMutualFunds = () => {
    cachedMFs = generateRandomMFs(10);
    return cachedMFs;
};
