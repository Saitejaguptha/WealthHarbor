import React, { useState, useMemo } from 'react';
import { FiTrendingUp, FiSearch, FiActivity, FiPieChart } from 'react-icons/fi';
import { getStocks, refreshStocks, SECTORS, MARKET_CAPS } from '../utils/stockData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';
import PageShell from '../components/layout/PageShell';

const Stocks: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCap, setSelectedCap] = useState<string>('All');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [allStocks, setAllStocks] = useState(() => getStocks());

    const filteredStocks = useMemo(() => {
        return allStocks.filter(stock => {
            const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCap = selectedCap === 'All' || stock.marketCap === selectedCap;
            const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
            return matchesSearch && matchesCap && matchesSector;
        });
    }, [searchTerm, selectedCap, selectedSector, allStocks]);

    const handleRefresh = () => {
        setAllStocks(refreshStocks());
    };

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="Stocks"
                description="Monitor and analyze top Indian stocks"
                onRefresh={handleRefresh}
                refreshLabel="Refresh Stocks"
            >
                <div className="flex flex-col xl:flex-row gap-4 w-full">
                    {/* Search Bar */}
                    <div className="relative group flex-[2]">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                        <input
                            type="text"
                            placeholder="Search by name or symbol (e.g. RELIANCE)..."
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-md hover:shadow-lg text-indigo-950 font-medium placeholder:text-indigo-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters Container */}
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        {/* Cap Filter */}
                        <div className="relative flex-1">
                            <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-indigo-600" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                                value={selectedCap}
                                onChange={(e) => setSelectedCap(e.target.value)}
                            >
                                <option value="All">All Market Caps</option>
                                {MARKET_CAPS.map(cap => <option key={cap} value={cap}>{cap}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-indigo-300">▼</span>
                            </div>
                        </div>

                        {/* Sector Filter */}
                        <div className="relative flex-1">
                            <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value)}
                            >
                                <option value="All">All Sectors</option>
                                {SECTORS.map(sector => <option key={sector} value={sector}>{sector}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-indigo-300">▼</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {filteredStocks.length > 0 ? (
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
