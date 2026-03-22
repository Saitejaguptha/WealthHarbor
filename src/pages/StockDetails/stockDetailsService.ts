import { StockService } from '../../services/api';
import type { Stock } from '../../types/stock';

/**
 * Fetch detailed stock data for a specific symbol.
 */
export const fetchStockDetails = async (symbol: string): Promise<Stock | undefined> => {
    return await StockService.getStockDetails(symbol);
};
