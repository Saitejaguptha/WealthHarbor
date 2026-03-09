import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiTrendingUp, FiTrendingDown, FiPieChart, FiActivity, FiRefreshCw } from 'react-icons/fi';
import { getStocks, SECTORS, MARKET_CAPS, refreshStocks } from '../utils/stockData';

const Stocks: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCap, setSelectedCap] = useState<string>('All');
    const [selectedSector, setSelectedSector] = useState<string>('All');

    // State for local stock list to allow immediate refresh updates
    const [allStocks, setAllStocks] = useState(() => getStocks());

    const handleRefresh = () => {
        setAllStocks(refreshStocks());
    };



    const filteredStocks = useMemo(() => {
        return allStocks.filter(stock => {
            const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCap = selectedCap === 'All' || stock.marketCap === selectedCap;
            const matchesSector = selectedSector === 'All' || stock.sector === selectedSector;
            return matchesSearch && matchesCap && matchesSector;
        });
    }, [searchTerm, selectedCap, selectedSector, allStocks]);

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-indigo-950 mb-2 tracking-tight">Market Stocks</h1>
                    <p className="text-indigo-900/60 font-medium">Explore and filter top performing assets</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-50 text-indigo-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-800 transition-all active:scale-95 shadow-sm hover:shadow-md"
                >
                    <FiRefreshCw className="text-xl" />
                    Refresh Stocks
                </button>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 group">
                {/* Search Bar */}
                <div className="lg:col-span-2 relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search by name or symbol..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Cap Filter */}
                <div className="relative">
                    <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <select
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                        value={selectedCap}
                        onChange={(e) => setSelectedCap(e.target.value)}
                    >
                        <option value="All">All Market Caps</option>
                        {MARKET_CAPS.map(cap => <option key={cap} value={cap}>{cap}</option>)}
                    </select>
                </div>

                {/* Sector Filter */}
                <div className="relative">
                    <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <select
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                    >
                        <option value="All">All Sectors</option>
                        {SECTORS.map(sector => <option key={sector} value={sector}>{sector}</option>)}
                    </select>
                </div>
            </div>

            {/* Stocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStocks.length > 0 ? (
                    filteredStocks.map((stock) => (
                        <div
                            key={stock.id}
                            className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                                <FiTrendingUp className="text-8xl" />
                            </div>

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-black rounded-lg mb-2 tracking-widest uppercase">
                                            {stock.symbol}
                                        </span>
                                        <h3 className="text-xl font-bold text-indigo-950 leading-tight">{stock.name}</h3>
                                    </div>
                                    <div className={`flex flex-col items-end ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <span className="text-2xl font-black">${stock.price}</span>
                                        <div className="flex items-center gap-1 text-sm font-bold">
                                            {stock.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                            <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-white border border-indigo-100 text-indigo-900/60 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">
                                        {stock.marketCap}
                                    </span>
                                    <span className="px-3 py-1 bg-white border border-indigo-100 text-indigo-900/60 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">
                                        {stock.sector}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={`/stocks/${stock.symbol.toLowerCase()}`}
                                className="relative z-10 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-200 select-none cursor-pointer"
                            >
                                Analyze Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No stocks found</h3>
                        <p className="text-indigo-900/30">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stocks;
