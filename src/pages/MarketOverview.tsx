import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiGlobe, FiActivity } from 'react-icons/fi';

const mockIndices = [
    { name: 'Nifty 50', value: '22,419.55', change: '+0.72%', points: '+161.40', isPositive: true },
    { name: 'BSE Sensex', value: '73,903.91', change: '+0.86%', points: '+630.16', isPositive: true },
    { name: 'Nifty Bank', value: '47,286.90', change: '-0.15%', points: '-72.30', isPositive: false },
    { name: 'Nifty IT', value: '37,120.45', change: '+1.45%', points: '+532.10', isPositive: true }
];

const mockMovers = [
    { symbol: 'RELIANCE', company: 'Reliance Industries', price: '₹2,985.40', change: '+1.2%', isPositive: true, volume: '4.5M' },
    { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd', price: '₹1,442.20', change: '-0.8%', isPositive: false, volume: '18.2M' },
    { symbol: 'TCS', company: 'Tata Consultancy', price: '₹4,120.15', change: '+2.4%', isPositive: true, volume: '2.1M' },
    { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd', price: '₹1,085.60', change: '+1.5%', isPositive: true, volume: '12.4M' },
    { symbol: 'INFY', company: 'Infosys Ltd', price: '₹1,620.35', change: '-1.1%', isPositive: false, volume: '6.8M' }
];

const MarketOverview: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-32 max-w-7xl mx-auto animate-in fade-in duration-700 w-full">
            {/* Header Section */}
            <div className="mb-8 lg:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 lg:gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-indigo-950 mb-2 tracking-tight flex items-center gap-2 md:gap-3">
                        <span className="p-2 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                            <FiActivity size={28} />
                        </span>
                        Market Overview
                    </h1>
                    <p className="text-indigo-900/60 font-medium">Global indices and top movers at a glance.</p>
                </div>

                {/* Market Status Indicator */}
                <div className="bg-white px-5 py-3 rounded-2xl border border-indigo-100 shadow-sm flex items-center gap-4 w-fit">
                    <div className="flex items-center gap-2">
                        <FiGlobe className="text-indigo-400 text-xl" />
                        <div>
                            <h3 className="font-bold text-indigo-950 text-sm leading-tight">Indian Markets</h3>
                            <p className="text-indigo-900/40 text-[10px] font-bold uppercase tracking-widest">Updated 1m ago</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-indigo-50"></div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-sm font-bold rounded-lg flex items-center gap-2 tracking-wide uppercase">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open
                    </span>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                
                {/* Left Column: Major Indices */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-indigo-950 flex items-center gap-2">
                        <FiGlobe className="text-indigo-400" /> Major Indian Indices
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        {mockIndices.map((idx, i) => (
                            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white p-5 sm:p-6 rounded-3xl shadow-lg shadow-indigo-100/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-w-0">
                                <div className="flex justify-between items-start mb-4 gap-2">
                                    <span className="font-bold text-indigo-950 text-base sm:text-lg truncate">{idx.name}</span>
                                    <div className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold flex items-center gap-1 shrink-0 ${
                                        idx.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                    }`}>
                                        {idx.isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                                        {idx.change}
                                    </div>
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-tight mb-1 truncate">{idx.value}</div>
                                <div className={`text-xs sm:text-sm font-semibold truncate ${idx.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {idx.points} pts
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Top Movers */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-indigo-950 flex items-center gap-2">
                        <FiActivity className="text-indigo-400" /> Top Movers Today
                    </h2>

                    <div className="bg-white border border-indigo-50 rounded-3xl shadow-sm overflow-hidden min-w-0">
                        {mockMovers.map((mover, i) => (
                            <div key={i} className={`p-4 sm:p-5 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer gap-2 ${
                                i !== mockMovers.length - 1 ? 'border-b border-indigo-50/50' : ''
                            }`}>
                                <div className="min-w-0 flex-1 pr-2">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <div className="font-black text-indigo-950 text-sm sm:text-base">{mover.symbol}</div>
                                        <span className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${mover.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {mover.change}
                                        </span>
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-indigo-900/50 font-medium truncate w-full">{mover.company}</div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-bold text-indigo-900 text-sm sm:text-base">{mover.price}</div>
                                    <div className="text-[10px] sm:text-xs text-indigo-900/40 font-semibold uppercase">Vol {mover.volume}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketOverview;
