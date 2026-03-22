import React, { useState, useMemo, useEffect } from 'react';
import { FiActivity, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { ETF_SECTORS, ETF_MARKET_CAPS } from '../../types/etf';
import { ETFService } from '../../services/api';
import AssetCard from '../../components/common/AssetCard';
import PageHeader from '../../components/common/PageHeader';
import PageShell from '../../components/layout/PageShell';
import FilterBar from '../../components/common/FilterBar';

const ETFs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedCap, setSelectedCap] = useState<string>('All');
    const [etfs, setEtfs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadETFs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await ETFService.getETFs();
            setEtfs(data);
        } catch (err) {
            setError('Failed to load ETFs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadETFs();
    }, []);

    const filteredETFs = useMemo(() => {
        return etfs.filter(etf => {
            const matchesSearch = etf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 etf.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || etf.sector === selectedSector;
            const matchesCap = selectedCap === 'All' || etf.marketCap === selectedCap;
            return matchesSearch && matchesSector && matchesCap;
        });
    }, [etfs, searchTerm, selectedSector, selectedCap]);

    const handleFilterChange = (label: string, value: string) => {
        if (label === 'Category') setSelectedSector(value);
        if (label === 'Market Cap') setSelectedCap(value);
    };

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="ETFs"
                description="Low-cost index tracking funds for your portfolio"
                onRefresh={loadETFs}
                refreshLabel="Update Prices"
            >
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search by name or symbol (e.g. NIFTYBEES)..."
                    filters={[
                        { label: 'Category', value: selectedSector, icon: <FiPieChart />, options: ETF_SECTORS },
                        { label: 'Market Cap', value: selectedCap, icon: <FiTrendingUp />, options: ETF_MARKET_CAPS }
                    ]}
                    onFilterChange={handleFilterChange}
                    currentFilters={{
                        'Category': selectedSector,
                        'Market Cap': selectedCap
                    }}
                />
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-20 text-center text-rose-600 font-bold">{error}</div>
                ) : filteredETFs.length > 0 ? (
                    filteredETFs.map((etf) => (
                        <AssetCard
                            key={etf.id}
                            symbol={etf.symbol}
                            name={etf.name}
                            subtitle={etf.fundHouse}
                            price={etf.price}
                            change={etf.change}
                            changePercent={true}
                            isPositive={etf.change >= 0}
                            tags={[etf.sector, etf.marketCap]}
                            detailsRoute={`/etfs/${etf.id}`}
                            Icon={FiActivity}
                            analyzeLabel="Analyze ETF"
                            metrics={[
                                { label: 'Expense Ratio', value: `${etf.expenseRatio}%` },
                                { label: 'AUM', value: `₹${etf.aum}` }
                            ]}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg py-8 font-medium">No ETFs found matching your criteria.</p>
                )}
            </div>
        </PageShell>
    );
};

export default ETFs;
