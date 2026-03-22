import React, { useMemo, useState } from 'react';
import { FiSearch, FiActivity, FiPieChart } from 'react-icons/fi';
import { getIndicesByExchange } from '../utils/indexData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';
import PageShell from '../components/layout/PageShell';

const Indices: React.FC = () => {
    const [exchange, setExchange] = useState<'NSE' | 'BSE' | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Benchmark', 'Sectoral', 'Thematic'];

    const filteredIndices = useMemo(() => {
        const baseIndices = getIndicesByExchange(exchange === 'ALL' ? undefined : exchange);
        return baseIndices.filter(idx => {
            const matchesSearch = idx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                idx.exchange.toLowerCase().includes(searchTerm.toLowerCase());
            
            let matchesCategory = true;
            if (selectedCategory === 'Benchmark') {
                matchesCategory = idx.name.includes('Nifty 50') || idx.name.includes('Sensex') || idx.name.includes('Next 50') || idx.name.includes('100') || idx.name.includes('500');
            } else if (selectedCategory === 'Sectoral') {
                matchesCategory = idx.name.includes('Bank') || idx.name.includes('IT') || idx.name.includes('Pharma') || idx.name.includes('FMCG') || idx.name.includes('Auto') || idx.name.includes('Realty') || idx.name.includes('Metal') || idx.name.includes('Energy') || idx.name.includes('Media') || idx.name.includes('Oil & Gas');
            } else if (selectedCategory === 'Thematic') {
                matchesCategory = !idx.name.includes('Nifty 50') && !idx.name.includes('Sensex') && !idx.name.includes('Next 50') && !idx.name.includes('100') && !idx.name.includes('500') && !idx.name.includes('Bank') && !idx.name.includes('IT') && !idx.name.includes('Pharma') && !idx.name.includes('FMCG') && !idx.name.includes('Auto') && !idx.name.includes('Realty') && !idx.name.includes('Metal') && !idx.name.includes('Energy') && !idx.name.includes('Media') && !idx.name.includes('Oil & Gas');
            }
            
            return matchesSearch && (selectedCategory === 'All' || matchesCategory);
        });
    }, [exchange, searchTerm, selectedCategory]);

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="Market Indices"
                description="Live performance of major benchmark indices"
            >
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center w-full">
                    {/* Search Bar */}
                    <div className="relative group flex-1 w-full max-w-xl">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                        <input
                            type="text"
                            placeholder="Search indices (e.g. NIFTY)..."
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters Container */}
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        {/* Exchange Switcher */}
                        <div className="bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-white flex gap-1 shadow-lg shadow-indigo-100/50 w-full md:w-auto">
                            {['ALL', 'NSE', 'BSE'].map((ex) => (
                                <button
                                    key={ex}
                                    onClick={() => setExchange(ex as 'NSE' | 'BSE' | 'ALL')}
                                    className={`flex-1 md:flex-none px-6 md:px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${
                                        exchange === ex 
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 active:scale-95' 
                                            : 'text-indigo-400 hover:bg-white hover:text-indigo-600'
                                    }`}
                                >
                                    {ex}
                                </button>
                            ))}
                        </div>

                        {/* Category Filter */}
                        <div className="relative group min-w-[180px]">
                            <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-sm hover:shadow-md"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat === 'All' ? 'All Types' : cat}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-300">▼</div>
                        </div>
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {filteredIndices.length > 0 ? (
                    filteredIndices.map((idx, i) => (
                        <AssetCard
                            key={`${idx.name}-${i}`}
                            name={idx.name}
                            subtitle={idx.exchange}
                            price={idx.value}
                            change={idx.points}
                            changePercent={false}
                            isPositive={idx.isPositive}
                            tags={[]}
                            analyzeLabel="Analyze Index"
                            detailsRoute={`/index-details/${encodeURIComponent(idx.name)}`}
                            Icon={FiActivity}
                            metrics={[
                                { label: 'Points Change', value: idx.points },
                                { label: 'Change %', value: idx.change }
                            ]}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-indigo-200">
                        <div className="text-4xl mb-4">📉</div>
                        <h3 className="text-xl font-bold text-indigo-950 uppercase tracking-widest">No indices found</h3>
                        <p className="text-indigo-900/50">No matches for "{searchTerm}" in {exchange === 'ALL' ? 'both exchanges' : exchange}.</p>
                    </div>
                )}
            </div>
        </PageShell>
    );
};

export default Indices;
