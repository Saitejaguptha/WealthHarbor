import { StockService } from '../../services/api';
import type { Stock } from '../../types/stock';

/**
 * Fetch stocks list from the API service.
 */
export const getStocks = async (): Promise<Stock[]> => {
    return await StockService.getStocks();
};

/**
 * Filter stocks based on search term, market cap, and sector.
 */
export const filterStocksData = (
    stocks: Stock[],
    searchTerm: string,
    selectedCap: string,
    selectedSector: string
): Stock[] => {
    return stocks.filter(stock => {
        const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCap = selectedCap === 'All' || stock.marketCap === selectedCap;
        const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
        return matchesSearch && matchesCap && matchesSector;
    });
};
