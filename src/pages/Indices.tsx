import React, { useMemo, useState } from 'react';
import { FiActivity, FiSearch } from 'react-icons/fi';
import { getIndicesByExchange } from '../utils/indexData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';

const Indices: React.FC = () => {
    const [exchange, setExchange] = useState<'NSE' | 'BSE' | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIndices = useMemo(() => {
        const baseIndices = getIndicesByExchange(exchange === 'ALL' ? undefined : exchange);
        return baseIndices.filter(idx => 
            idx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            idx.exchange.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [exchange, searchTerm]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
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

                    {/* Exchange Switcher */}
                    <div className="flex bg-indigo-50/50 p-1.5 rounded-2xl w-full lg:w-fit border border-indigo-100/50 backdrop-blur-sm self-stretch lg:self-auto">
                        {['ALL', 'NSE', 'BSE'].map((ex) => (
                            <button
                                key={ex}
                                onClick={() => setExchange(ex as any)}
                                className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all duration-300 ${
                                    exchange === ex 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                                    : 'text-indigo-900/40 hover:text-indigo-600 hover:bg-white/50'
                                }`}
                            >
                                {ex}
                            </button>
                        ))}
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
    );
};

export default Indices;
