import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiActivity, FiPieChart, FiInfo, FiBriefcase, FiZap, FiBarChart2 } from 'react-icons/fi';
import { getETFs } from '../utils/etfData';
import PriceHistoryChart from '../components/common/PriceHistoryChart';
import MetricInfo from '../components/common/MetricInfo';

const ETFDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const etfs = getETFs();

    const etf = useMemo(() => {
        return etfs.find(e => e.id === id);
    }, [id, etfs]);

    if (!etf) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                <div className="text-6xl mb-4 opacity-20">📂</div>
                <h2 className="text-2xl font-bold text-indigo-950 mb-2">ETF Not Found</h2>
                <Link to="/etfs" className="text-indigo-600 font-bold hover:underline">Back to ETF Tracker</Link>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link
                        to="/etfs"
                        className="p-3 bg-white border border-indigo-50 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
                    >
                        <FiArrowLeft className="text-xl" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                                {etf.symbol}
                            </span>
                            <span className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest">{etf.fundHouse}</span>
                        </div>
                        <h1 className="text-4xl font-black text-indigo-950 tracking-tight">{etf.name}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Market Price</p>
                        <span className="text-3xl font-black text-indigo-950">₹{etf.price}</span>
                    </div>
                    <div className="h-12 w-px bg-indigo-100 mx-2 hidden md:block" />
                    <div className="text-right">
                        <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">24h Change</p>
                        <span className={`text-3xl font-black ${etf.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {etf.change > 0 ? '+' : ''}{etf.changePercent}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Price History Chart */}
            <div className="mb-8">
                <PriceHistoryChart
                    history={etf.history}
                    color={etf.change >= 0 ? "#10B981" : "#F43F5E"}
                    title={`${etf.symbol} Price History`}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Analysis Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Performance Summary */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg">
                                <FiBarChart2 className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-black text-indigo-950">ETF Performance Overview</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-50 relative overflow-hidden">
                                <FiZap className="text-indigo-400 mb-3 text-xl" />
                                <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Tracking Error</p>
                                <p className="text-3xl font-black text-indigo-950">{etf.trackingError}%</p>
                                <p className="text-[10px] text-indigo-900/40 mt-1 italic">Efficiency in following the index</p>
                                <MetricInfo metricKey="Tracking Error" />
                            </div>
                            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-50">
                                <FiActivity className="text-indigo-400 mb-3 text-xl" />
                                <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Average Volume</p>
                                <p className="text-3xl font-black text-indigo-950">{etf.avgVolume}</p>
                                <p className="text-[10px] text-indigo-900/40 mt-1 italic">Liquidity marker for trading</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <div className="flex items-center gap-3 mb-6">
                            <FiInfo className="text-indigo-400 text-xl" />
                            <h3 className="text-xl font-black text-indigo-950">Product Description</h3>
                        </div>
                        <p className="text-indigo-900/60 leading-relaxed font-medium">
                            {etf.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Fund Details Card */}
                    <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <FiBriefcase /> Fund Statistics
                        </h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">AUM</span>
                                <span className="text-xl font-black">₹{etf.aum}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/10 relative">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Expense Ratio</span>
                                <span className="text-xl font-black">{etf.expenseRatio}%</span>
                                <MetricInfo metricKey="Expense Ratio" />
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Rating</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-sm ${i < etf.rating ? 'text-amber-400' : 'text-white/10'}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Category</span>
                                <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                                    {etf.marketCap}
                                </span>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-white text-indigo-900 font-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-xl">
                            Trade Now
                        </button>
                    </div>

                    {/* Sector Card */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <h3 className="text-xl font-black text-indigo-950 mb-6 flex items-center gap-2">
                            <FiPieChart className="text-indigo-400" /> Sector Focus
                        </h3>
                        <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-50 text-center">
                            <span className="text-lg font-black text-indigo-950">{etf.sector}</span>
                            <p className="text-[10px] text-indigo-900/40 mt-1 uppercase font-bold tracking-widest">Primary Benchmark</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ETFDetails;
