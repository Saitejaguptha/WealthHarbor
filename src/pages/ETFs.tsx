import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiTrendingUp, FiTrendingDown, FiPieChart, FiActivity, FiRefreshCw, FiHome, FiCheckCircle } from 'react-icons/fi';
import { getETFs, ETF_SECTORS, ETF_MARKET_CAPS, ETF_FUND_HOUSES, refreshETFs } from '../utils/etfData';

const ETFs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedCap, setSelectedCap] = useState<string>('All');
    const [selectedHouse, setSelectedHouse] = useState<string>('All');

    const [allETFs, setAllETFs] = useState(() => getETFs());

    const handleRefresh = () => {
        setAllETFs(refreshETFs());
    };

    const filteredETFs = useMemo(() => {
        return allETFs.filter(etf => {
            const matchesSearch = etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                etf.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || etf.sector === selectedSector;
            const matchesCap = selectedCap === 'All' || etf.marketCap === selectedCap;
            const matchesHouse = selectedHouse === 'All' || etf.fundHouse === selectedHouse;
            return matchesSearch && matchesSector && matchesCap && matchesHouse;
        });
    }, [searchTerm, selectedSector, selectedCap, selectedHouse, allETFs]);

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-indigo-950 mb-2 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                            <FiActivity className="text-3xl" />
                        </div>
                        Exchange Traded Funds
                    </h1>
                    <p className="text-indigo-900/60 font-medium">Low-cost, diversified investment vehicles for your portfolio</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-50 text-indigo-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-800 transition-all active:scale-95 shadow-sm hover:shadow-md"
                >
                    <FiRefreshCw className="text-xl" />
                    Refresh ETFs
                </button>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 group">
                {/* Search Bar */}
                <div className="lg:col-span-2 relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search ETFs by name or symbol..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        {ETF_SECTORS.map(sector => <option key={sector} value={sector}>{sector}</option>)}
                    </select>
                </div>

                {/* Cap Filter */}
                <div className="relative">
                    <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <select
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                        value={selectedCap}
                        onChange={(e) => setSelectedCap(e.target.value)}
                    >
                        <option value="All">All Caps</option>
                        {ETF_MARKET_CAPS.map(cap => <option key={cap} value={cap}>{cap}</option>)}
                    </select>
                </div>

                {/* Fund House Filter */}
                <div className="relative">
                    <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <select
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                        value={selectedHouse}
                        onChange={(e) => setSelectedHouse(e.target.value)}
                    >
                        <option value="All">All Houses</option>
                        {ETF_FUND_HOUSES.map(house => <option key={house} value={house}>{house}</option>)}
                    </select>
                </div>
            </div>

            {/* ETFs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredETFs.length > 0 ? (
                    filteredETFs.map((etf) => (
                        <div
                            key={etf.id}
                            className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                                <FiCheckCircle className="text-8xl" />
                            </div>

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg mb-2 tracking-widest uppercase">
                                            {etf.symbol}
                                        </span>
                                        <h3 className="text-xl font-bold text-indigo-950 leading-tight">{etf.name}</h3>
                                        <p className="text-indigo-900/40 text-[10px] font-bold uppercase tracking-widest mt-1">{etf.fundHouse}</p>
                                    </div>
                                    <div className={`flex flex-col items-end ${etf.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <span className="text-2xl font-black">₹{etf.price}</span>
                                        <div className="flex items-center gap-1 text-sm font-bold">
                                            {etf.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                            <span>{etf.change >= 0 ? '+' : ''}{etf.changePercent}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-white border border-indigo-100 text-indigo-900/60 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">
                                        {etf.sector}
                                    </span>
                                    <span className="px-3 py-1 bg-white border border-indigo-100 text-indigo-900/60 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">
                                        {etf.marketCap}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 mb-6 font-medium">
                                    <div>
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1">Expense Ratio</p>
                                        <p className="text-sm text-indigo-950">{etf.expenseRatio}%</p>
                                    </div>
                                    <div>
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1">AUM</p>
                                        <p className="text-sm text-indigo-950">₹{etf.aum}</p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to={`/etfs/${etf.id}`}
                                className="relative z-10 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-200"
                            >
                                Analyze ETF
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No ETFs found</h3>
                        <p className="text-indigo-900/30">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ETFs;
