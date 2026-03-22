import React, { useState, useMemo, useEffect } from 'react';
import { FiTrendingUp, FiLayers } from 'react-icons/fi';
import AssetCard from '../../components/common/AssetCard';
import PageHeader from '../../components/common/PageHeader';
import PageShell from '../../components/layout/PageShell';
import FilterBar from '../../components/common/FilterBar';
import { INDEX_CATEGORIES } from './indicesData';
import { getIndices, filterIndicesData } from './indicesService';
import type { MarketIndex } from '../../data/indexData';

const Indices: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [allIndices, setAllIndices] = useState<MarketIndex[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadIndices = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getIndices();
            setAllIndices(data);
        } catch (err) {
            setError('Failed to load indices. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadIndices();
    }, []);

    const filteredIndices = useMemo(() => {
        return filterIndicesData(allIndices, 'ALL', searchTerm, selectedCategory);
    }, [searchTerm, selectedCategory, allIndices]);

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="Market Indices"
                description="Track major benchmark indices and sectoral movements"
                onRefresh={loadIndices}
                refreshLabel="Update Indices"
            >
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search indices (e.g. NIFTY 50)..."
                    filters={[
                        { label: 'Category', value: selectedCategory, icon: <FiLayers />, options: INDEX_CATEGORIES }
                    ]}
                    onFilterChange={(_, val) => setSelectedCategory(val)}
                    currentFilters={{ 'Category': selectedCategory }}
                />
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-20 text-center text-rose-600 font-bold">{error}</div>
                ) : filteredIndices.length > 0 ? (
                    filteredIndices.map((idx) => (
                        <AssetCard
                            key={idx.name}
                            name={idx.name}
                            price={idx.value}
                            change={idx.change}
                            changePercent={false}
                            isPositive={idx.isPositive}
                            tags={[idx.exchange]}
                            detailsRoute={`/index-details/${encodeURIComponent(idx.name)}`}
                            Icon={FiTrendingUp}
                            analyzeLabel="View Components"
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-indigo-900/40 font-bold uppercase tracking-widest">
                        No matching indices found
                    </div>
                )}
            </div>
        </PageShell>
    );
};

export default Indices;
