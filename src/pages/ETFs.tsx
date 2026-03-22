import React, { useState, useMemo } from 'react';
import { FiSearch, FiActivity, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { getETFs, refreshETFs, ETF_SECTORS, ETF_MARKET_CAPS } from '../utils/etfData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';
import PageShell from '../components/layout/PageShell';

const ETFs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedCap, setSelectedCap] = useState<string>('All');

    const etfs = getETFs();

    const filteredETFs = useMemo(() => {
        return etfs.filter(etf => {
            const matchesSearch = etf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                etf.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || etf.sector === selectedSector;
            const matchesCap = selectedCap === 'All' || etf.marketCap === selectedCap;
            return matchesSearch && matchesSector && matchesCap;
        });
    }, [etfs, searchTerm, selectedSector, selectedCap]);

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="ETFs"
                description="Low-cost index tracking funds for your portfolio"
                onRefresh={refreshETFs}
                refreshLabel="Update Prices"
            >
                <div className="flex flex-col xl:flex-row gap-4 w-full">
                    {/* Search Bar */}
                    <div className="relative group flex-[2]">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-hover:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name or symbol (e.g. NIFTYBEES)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-md hover:shadow-lg text-indigo-950 font-medium placeholder:text-indigo-300"
                        />
                    </div>

                    {/* Filters Container */}
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        {/* Category Filter */}
                        <div className="relative flex-1">
                            <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                {ETF_SECTORS.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-indigo-300">▼</span>
                            </div>
                        </div>

                        {/* Market Cap Filter */}
                        <div className="relative flex-1">
                            <FiTrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                                value={selectedCap}
                                onChange={(e) => setSelectedCap(e.target.value)}
                            >
                                <option value="All">All Market Caps</option>
                                {ETF_MARKET_CAPS.map(cap => <option key={cap} value={cap}>{cap}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-indigo-300">▼</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
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
        </PageShell>
    );
};

export default ETFs;
