import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPieChart, FiActivity, FiRefreshCw, FiHome, FiCheckCircle } from 'react-icons/fi';
import { getMutualFunds, MF_SECTORS, FUND_HOUSES, refreshMutualFunds } from '../utils/mutualFundData';

const MutualFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedHouse, setSelectedHouse] = useState<string>('All');

    // State for local MF list to allow immediate refresh updates
    const [allFunds, setAllFunds] = useState(() => getMutualFunds());

    const handleRefresh = () => {
        setAllFunds(refreshMutualFunds());
    };

    const filteredFunds = useMemo(() => {
        return allFunds.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fund.fundHouse.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || fund.sector === selectedSector;
            const matchesHouse = selectedHouse === 'All' || fund.fundHouse === selectedHouse;
            return matchesSearch && matchesSector && matchesHouse;
        });
    }, [searchTerm, selectedSector, selectedHouse, allFunds]);

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-indigo-950 mb-2 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                            <FiPieChart className="text-3xl" />
                        </div>
                        Mutual Funds
                    </h1>
                    <p className="text-indigo-900/60 font-medium">Maximize your wealth with professional management</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-50 text-indigo-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-800 transition-all active:scale-95 shadow-sm hover:shadow-md"
                >
                    <FiRefreshCw className="text-xl" />
                    Refresh Funds
                </button>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 group">
                {/* Search Bar */}
                <div className="lg:col-span-2 relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search funds or fund houses..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Sector Filter */}
                <div className="relative">
                    <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <select
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                        value={selectedSector}
                        onChange={(e) => setSelectedSector(e.target.value)}
                    >
                        <option value="All">All Sectors</option>
                        {MF_SECTORS.map(sector => <option key={sector} value={sector}>{sector}</option>)}
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
                        <option value="All">All Fund Houses</option>
                        {FUND_HOUSES.map(house => <option key={house} value={house}>{house}</option>)}
                    </select>
                </div>
            </div>

            {/* Funds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFunds.length > 0 ? (
                    filteredFunds.map((fund) => (
                        <div
                            key={fund.id}
                            className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <FiCheckCircle className="text-9xl" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg tracking-widest uppercase">
                                                {fund.sector}
                                            </span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-xs ${i < fund.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-indigo-950 leading-tight mb-1">{fund.name}</h3>
                                        <p className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest">{fund.fundHouse}</p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">1Y Return</p>
                                        <span className={`text-3xl font-black ${fund.return1Y >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {fund.return1Y > 0 ? '+' : ''}{fund.return1Y}%
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 p-5 bg-indigo-50/50 rounded-3xl border border-indigo-50">
                                    <div>
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1">NAV</p>
                                        <p className="text-lg font-bold text-indigo-950">₹{fund.nav}</p>
                                    </div>
                                    <div>
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1">AUM</p>
                                        <p className="text-lg font-bold text-indigo-950">₹{fund.aum}</p>
                                    </div>
                                    <div>
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1">Exp. Ratio</p>
                                        <p className="text-lg font-bold text-indigo-950">{fund.expenseRatio}%</p>
                                    </div>
                                </div>

                                <Link
                                    to={`/mutual-funds/${fund.id}`}
                                    className="relative z-10 w-full mt-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-200/50 flex items-center justify-center uppercase tracking-widest text-xs"
                                >
                                    Analyze Now
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No funds matching your criteria</h3>
                        <p className="text-indigo-900/30">Try clearing filters or adjusting your search</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MutualFunds;
