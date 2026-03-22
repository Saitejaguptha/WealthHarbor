/**
 * WealthHarbor — Central API Service Layer
 *
 * All data in the app is fetched through this module.
 * The current implementation uses in-memory mock functions that return
 * Promises (simulating async API calls). Swap the Promise bodies with
 * real axios / fetch calls when a backend is ready.
 */

import { getETFs } from '../data/etfData';
import { getMutualFunds } from '../data/mutualFundData';
import { getAllCommodities, getCommodityById } from '../data/commodityData';
import { INDIAN_INDICES, getIndicesByExchange, getIndexByName } from '../data/indexData';
import { getGoldData, getSilverData } from '../data/metalData';
import { mockNews } from '../data/newsData';
import type { Stock } from '../types/stock';
import type { ETF } from '../types/etf';
import type { MutualFund } from '../types/mutualFund';
import type { CommodityData } from '../types/commodity';
import type { MetalData } from '../types/metals';
import type { NewsArticle } from '../data/newsData';
import type { MarketIndex } from '../data/indexData';

// ---------- helpers ---------------------------------------------------------
const delay = <T>(data: T, ms = 300): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(data), ms));

// ---------- Stocks ----------------------------------------------------------
// Stocks are still served from the /api/ JSON files (real axios calls)
import axios from 'axios';
const apiAxios = axios.create({ baseURL: '/api' });

export const StockService = {
    getStocks: async (): Promise<Stock[]> => {
        const res = await apiAxios.get<Stock[]>('/stocks_list.json');
        return res.data;
    },
    getStockDetails: async (symbol: string): Promise<Stock | undefined> => {
        const res = await apiAxios.get<Stock[]>('/stocks.json');
        return res.data.find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
    },
};

// ---------- ETFs ------------------------------------------------------------
export const ETFService = {
    getETFs: (): Promise<ETF[]> => delay(getETFs()),
    getETFDetails: (id: string): Promise<ETF | undefined> =>
        delay(getETFs().find(e => e.id === id)),
};

// ---------- Mutual Funds ----------------------------------------------------
export const MutualFundService = {
    getMutualFunds: (): Promise<MutualFund[]> => delay(getMutualFunds()),
    getMutualFundDetails: (id: string): Promise<MutualFund | undefined> =>
        delay(getMutualFunds().find(f => f.id === id)),
};

// ---------- Commodities -----------------------------------------------------
export const CommodityService = {
    getCommodities: (): Promise<CommodityData[]> => delay(getAllCommodities()),
    getCommodityById: (id: string): Promise<CommodityData | undefined> =>
        delay(getCommodityById(id)),
};

// ---------- Market Indices --------------------------------------------------
export const IndexService = {
    getAllIndices: (): Promise<MarketIndex[]> => delay(INDIAN_INDICES),
    getIndicesByExchange: (exchange?: 'NSE' | 'BSE'): Promise<MarketIndex[]> =>
        delay(getIndicesByExchange(exchange)),
    getIndexByName: (name: string): Promise<MarketIndex | undefined> =>
        delay(getIndexByName(name)),
};

// ---------- Gold & Silver ---------------------------------------------------
export const MetalService = {
    getGoldData: (): Promise<MetalData> => delay(getGoldData()),
    getSilverData: (): Promise<MetalData> => delay(getSilverData()),
};

// ---------- News ------------------------------------------------------------
export const NewsService = {
    getNews: (): Promise<NewsArticle[]> => delay(mockNews),
    getNewsById: (id: string): Promise<NewsArticle | undefined> =>
        delay(mockNews.find(n => n.id === id)),
};
