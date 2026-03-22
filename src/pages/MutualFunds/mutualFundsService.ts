import { MutualFundService } from '../../services/api';
import { type MutualFund } from '../../types/mutualFund';

/**
 * Fetch all available mutual funds.
 */
export const getMutualFunds = async (): Promise<MutualFund[]> => {
    return await MutualFundService.getMutualFunds();
};

/**
 * Filter mutual funds based on search term, category (sector), and fund house.
 */
export const filterMutualFundsData = (
    funds: MutualFund[],
    searchTerm: string,
    selectedSector: string,
    selectedHouse: string
): MutualFund[] => {
    return funds.filter(fund => {
        const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            fund.fundHouse.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSector = selectedSector === 'All' || fund.sector === selectedSector;
        const matchesHouse = selectedHouse === 'All' || fund.fundHouse === selectedHouse;
        return matchesSearch && matchesSector && matchesHouse;
    });
};
