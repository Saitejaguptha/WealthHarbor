import React, { useState, useMemo, useEffect } from 'react';
import { FiActivity, FiPieChart, FiBriefcase } from 'react-icons/fi';
import { MF_SECTORS, FUND_HOUSES, type MutualFund } from '../../types/mutualFund';
import AssetCard from '../../components/common/AssetCard';
import PageHeader from '../../components/common/PageHeader';
import PageShell from '../../components/layout/PageShell';
import FilterBar from '../../components/common/FilterBar';
import { getMutualFunds, filterMutualFundsData } from './mutualFundsService';

const MutualFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedHouse, setSelectedHouse] = useState<string>('All');
    const [funds, setFunds] = useState<MutualFund[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadFunds = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getMutualFunds();
            setFunds(data);
        } catch (err) {
            setError('Failed to load mutual funds');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadFunds();
    }, []);

    const filteredFunds = useMemo(() => {
        return filterMutualFundsData(funds, searchTerm, selectedSector, selectedHouse);
    }, [funds, searchTerm, selectedSector, selectedHouse]);

    const handleFilterChange = (label: string, value: string) => {
        if (label === 'Category') setSelectedSector(value);
        if (label === 'Fund House') setSelectedHouse(value);
    };

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="Mutual Funds"
                description="Explore top-rated mutual funds curated for your goals"
                onRefresh={loadFunds}
                refreshLabel="Refresh NAV"
            >
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search funds or AMC (e.g. Parag Parikh)..."
                    filters={[
                        { label: 'Category', value: selectedSector, icon: <FiPieChart />, options: MF_SECTORS },
                        { label: 'Fund House', value: selectedHouse, icon: <FiBriefcase />, options: FUND_HOUSES }
                    ]}
                    onFilterChange={handleFilterChange}
                    currentFilters={{
                        'Category': selectedSector,
                        'Fund House': selectedHouse
                    }}
                />
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-rose-600">{error}</h3>
                    </div>
                ) : filteredFunds.length > 0 ? (
                    filteredFunds.map((fund) => (
                        <AssetCard
                            key={fund.id}
                            name={fund.name}
                            subtitle={fund.fundHouse}
                            price={fund.nav}
                            change={fund.return1Y}
                            changePercent={true}
                            isPositive={fund.return1Y >= 0}
                            tags={[fund.sector, `${fund.rating}★`]}
                            detailsRoute={`/mutual-funds/${fund.id}`}
                            Icon={FiActivity}
                            analyzeLabel="Analyze Fund"
                            metrics={[
                                { label: 'Exp. Ratio', value: `${fund.expenseRatio}%` },
                                { label: 'AUM', value: `₹${fund.aum}` }
                            ]}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg py-8 font-medium">No mutual funds found matching your criteria.</p>
                )}
            </div>
        </PageShell>
    );
};

export default MutualFunds;
