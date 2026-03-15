import type { ETF, ETFSector, ETFMarketCap } from '../types/etf';
import { generatePriceHistory } from './historyUtils';

export const ETF_SECTORS: ETFSector[] = [
    'Technology', 'Banking', 'Energy', 'Pharma', 'Financials', 
    'Index', 'Commodity', 'Consumption', 'Infrastructure', 'Auto'
];

export const ETF_MARKET_CAPS: ETFMarketCap[] = ['Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap'];

export const ETF_FUND_HOUSES = [
    'Nippon India', 'SBI Mutual Fund', 'ICICI Prudential', 'HDFC Mutual Fund',
    'UTI Mutual Fund', 'Kotak Mutual Fund', 'Axis Mutual Fund', 'Motilal Oswal'
];

const etfSymbols = ['NIFTYBEES', 'BANKBEES', 'GOLDBEES', 'ITBEES', 'PHARMABEES', 'SETFNIF50', 'SETFNN50', 'LIQUIDBEES', 'MON100', 'CPSEETF'];
const etfNames = ['Nippon India Nifty 50 BeES', 'Nippon India Bank BeES', 'Nippon India Gold BeES', 'Nippon India IT BeES', 'Nippon India Pharma BeES', 'SBI ETF Nifty 50', 'SBI ETF Nifty Next 50', 'Nippon India Liquid BeES', 'Motilal Oswal Nasdaq 100 ETF', 'CPSE ETF'];

export const generateRandomETFs = (): ETF[] => {
    return Array.from({ length: etfSymbols.length }).map((_, i) => {
        const sector = ETF_SECTORS[i % ETF_SECTORS.length];
        const marketCap = ETF_MARKET_CAPS[i % ETF_MARKET_CAPS.length];
        const house = ETF_FUND_HOUSES[i % ETF_FUND_HOUSES.length];
        const symbol = etfSymbols[i];
        const name = etfNames[i];
        const price = 20 + Math.random() * 5000;
        const change = -10 + Math.random() * 20;

        return {
            id: `etf-${i}`,
            symbol,
            name,
            fundHouse: house,
            sector,
            marketCap,
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((change / (price / 100)).toFixed(2)),
            expenseRatio: parseFloat((0.05 + Math.random() * 0.9).toFixed(2)),
            trackingError: parseFloat((0.01 + Math.random() * 0.2).toFixed(2)),
            aum: (Math.random() * 50000 + 1000).toFixed(0) + ' Cr',
            avgVolume: (Math.random() * 5 + 0.1).toFixed(1) + 'M',
            rating: Math.floor(Math.random() * 5) + 1,
            description: `${name} tracks its underlying index with precision. It offers investors exposure to a diversified basket of securities with deep liquidity on the NSE/BSE.`,
            history: generatePriceHistory(price)
        };
    });
};

let cachedETFs: ETF[] | null = null;

export const getETFs = () => {
    if (!cachedETFs) {
        cachedETFs = generateRandomETFs();
    }
    return cachedETFs;
};

export const refreshETFs = () => {
    cachedETFs = generateRandomETFs();
    return cachedETFs;
};
