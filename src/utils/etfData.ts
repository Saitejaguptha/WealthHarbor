import type { ETF, ETFSector, ETFMarketCap } from '../types/etf';

export const ETF_SECTORS: ETFSector[] = [
    'Technology', 'Healthcare', 'Financials', 'Energy', 'Consumer Discretionary',
    'Utilities', 'Real Estate', 'Materials', 'Industrials', 'Communication Services',
    'Index', 'Commodity'
];

export const ETF_MARKET_CAPS: ETFMarketCap[] = ['Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap'];

export const ETF_FUND_HOUSES = [
    'Nippon India', 'SBI Mutual Fund', 'ICICI Prudential', 'HDFC Mutual Fund',
    'Mirae Asset', 'Motilal Oswal', 'UTI Mutual Fund', 'Kotak Mutual Fund'
];

export const generateRandomETFs = (count: number): ETF[] => {
    return Array.from({ length: count }).map((_, i) => {
        const sector = ETF_SECTORS[Math.floor(Math.random() * ETF_SECTORS.length)];
        const marketCap = ETF_MARKET_CAPS[Math.floor(Math.random() * ETF_MARKET_CAPS.length)];
        const house = ETF_FUND_HOUSES[Math.floor(Math.random() * ETF_FUND_HOUSES.length)];
        const symbol = `${sector.slice(0, 3).toUpperCase()}${i + 1}ETF`;
        const price = 50 + Math.random() * 2000;
        const change = -10 + Math.random() * 20;

        return {
            id: `etf-${i}`,
            symbol,
            name: `${house} ${sector} ${marketCap} ETF`,
            fundHouse: house,
            sector,
            marketCap,
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((change / (price / 100)).toFixed(2)),
            expenseRatio: parseFloat((0.05 + Math.random() * 0.5).toFixed(2)),
            trackingError: parseFloat((0.01 + Math.random() * 0.1).toFixed(2)),
            aum: (Math.random() * 10 + 1).toFixed(1) + 'k Cr',
            avgVolume: (Math.random() * 5 + 0.1).toFixed(1) + 'M',
            rating: Math.floor(Math.random() * 5) + 1,
            description: `${house} ${sector} ETF is designed to track the performance of its underlying ${sector.toLowerCase()} benchmark with high precision and low costs. It offers investors exposure to a diversified basket of securities with deep liquidity.`
        };
    });
};

let cachedETFs: ETF[] | null = null;

export const getETFs = () => {
    if (!cachedETFs) {
        cachedETFs = generateRandomETFs(10);
    }
    return cachedETFs;
};

export const refreshETFs = () => {
    cachedETFs = generateRandomETFs(10);
    return cachedETFs;
};
