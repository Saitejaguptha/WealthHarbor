import { IndexService } from '../../services/api';
import type { MarketIndex } from '../../data/indexData';

/**
 * Service to fetch indices.
 * Currently returns mock data from central service.
 */
export const getIndices = async (): Promise<MarketIndex[]> => {
    return await IndexService.getAllIndices();
};

/**
 * Filters the list of indices based on exchange, search term, and category.
 */
export const filterIndicesData = (
    indices: MarketIndex[],
    exchange: 'NSE' | 'BSE' | 'ALL',
    searchTerm: string,
    category: string
): MarketIndex[] => {
    const baseIndices = exchange === 'ALL' ? indices : indices.filter(idx => idx.exchange === exchange);
    
    return baseIndices.filter(idx => {
        const matchesSearch = idx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            idx.exchange.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesCategory = true;
        
        if (category === 'Benchmark') {
            matchesCategory = idx.name.includes('Nifty 50') || 
                            idx.name.includes('Sensex') || 
                            idx.name.includes('Next 50') || 
                            idx.name.includes('100') || 
                            idx.name.includes('500');
        } else if (category === 'Sectoral') {
            matchesCategory = idx.name.includes('Bank') || 
                            idx.name.includes('IT') || 
                            idx.name.includes('Pharma') || 
                            idx.name.includes('FMCG') || 
                            idx.name.includes('Auto') || 
                            idx.name.includes('Realty') || 
                            idx.name.includes('Metal') || 
                            idx.name.includes('Energy') || 
                            idx.name.includes('Media') || 
                            idx.name.includes('Oil & Gas');
        } else if (category === 'Thematic') {
            const isBenchmark = idx.name.includes('Nifty 50') || 
                               idx.name.includes('Sensex') || 
                               idx.name.includes('Next 50') || 
                               idx.name.includes('100') || 
                               idx.name.includes('500');
            
            const isSectoral = idx.name.includes('Bank') || 
                              idx.name.includes('IT') || 
                              idx.name.includes('Pharma') || 
                              idx.name.includes('FMCG') || 
                              idx.name.includes('Auto') || 
                              idx.name.includes('Realty') || 
                              idx.name.includes('Metal') || 
                              idx.name.includes('Energy') || 
                              idx.name.includes('Media') || 
                              idx.name.includes('Oil & Gas');
            
            matchesCategory = !isBenchmark && !isSectoral;
        }
        
        return matchesSearch && (category === 'All' || matchesCategory);
    });
};
