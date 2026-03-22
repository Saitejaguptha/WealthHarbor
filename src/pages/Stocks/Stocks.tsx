import React, { useState, useMemo, useEffect } from 'react';
import { FiTrendingUp, FiActivity, FiPieChart } from 'react-icons/fi';
import { type Stock } from '../../types/stock';
import AssetCard from '../../components/common/AssetCard';
import PageHeader from '../../components/common/PageHeader';
import PageShell from '../../components/layout/PageShell';
import FilterBar from '../../components/common/FilterBar';
import { SECTORS, MARKET_CAPS, DEFAULT_FILTERS } from './stocksData';
import { getStocks, filterStocksData } from './stocksService';

const Stocks: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState(DEFAULT_FILTERS.searchTerm);
    const [selectedCap, setSelectedCap] = useState<string>(DEFAULT_FILTERS.selectedCap);
    const [selectedSector, setSelectedSector] = useState<string>(DEFAULT_FILTERS.selectedSector);
    const [allStocks, setAllStocks] = useState<Stock[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStocks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getStocks();
            setAllStocks(data);
        } catch (err) {
            setError('Failed to load stocks. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStocks();
    }, []);

    const filteredStocks = useMemo(() => {
        return filterStocksData(allStocks, searchTerm, selectedCap, selectedSector);
    }, [searchTerm, selectedCap, selectedSector, allStocks]);

    const handleFilterChange = (label: string, value: string) => {
        if (label === 'Market Cap') setSelectedCap(value);
        if (label === 'Sector') setSelectedSector(value);
    };

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="Stocks"
                description="Monitor and analyze top Indian stocks"
                onRefresh={loadStocks}
                refreshLabel="Refresh Stocks"
            >
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search by name or symbol (e.g. RELIANCE)..."
                    filters={[
                        { label: 'Market Cap', value: selectedCap, icon: <FiActivity />, options: MARKET_CAPS },
                        { label: 'Sector', value: selectedSector, icon: <FiPieChart />, options: SECTORS }
                    ]}
                    onFilterChange={handleFilterChange}
                    currentFilters={{
                        'Market Cap': selectedCap,
                        'Sector': selectedSector
                    }}
                />
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-rose-600">{error}</h3>
                    </div>
                ) : filteredStocks.length > 0 ? (
                    filteredStocks.map((stock) => (
                        <AssetCard
                            key={stock.id}
                            symbol={stock.symbol}
                            name={stock.name}
                            price={stock.price}
                            change={stock.changePercent}
                            changePercent={true}
                            isPositive={stock.change >= 0}
                            tags={[stock.marketCap, stock.sector]}
                            detailsRoute={`/stocks/${stock.symbol.toLowerCase()}`}
                            Icon={FiTrendingUp}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No matching stocks</h3>
                        <p className="text-indigo-900/30">Try a different search term</p>
                    </div>
                )}
            </div>
        </PageShell>
    );
};

export default Stocks;
