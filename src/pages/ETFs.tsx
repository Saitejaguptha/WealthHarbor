import React, { useState, useMemo } from 'react';
import { FiSearch, FiActivity } from 'react-icons/fi';
import { getETFs, refreshETFs } from '../utils/etfData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';

const ETFs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const etfs = getETFs();

    const filteredETFs = useMemo(() => {
        return etfs.filter(etf => {
            const matchesSearch = etf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                etf.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [etfs, searchTerm]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="ETFs"
                description="Low-cost index tracking funds for your portfolio"
                onRefresh={refreshETFs}
                refreshLabel="Update Prices"
            >
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-hover:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name or symbol..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white/70 backdrop-blur-md border border-white rounded-2xl shadow-lg shadow-indigo-100/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium transition-all"
                        />
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredETFs.length > 0 ? (
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
        </div>
    );
};

export default ETFs;
