import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiPieChart, FiActivity, FiShield, FiBriefcase, FiPercent, FiInfo, FiUser } from 'react-icons/fi';
import { getMutualFunds } from '../utils/mutualFundData';

const MutualFundDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const funds = getMutualFunds();

    const fund = useMemo(() => {
        return funds.find(f => f.id === id);
    }, [id, funds]);

    if (!fund) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                <div className="text-6xl mb-4 opacity-20">📂</div>
                <h2 className="text-2xl font-bold text-indigo-950 mb-2">Fund Not Found</h2>
                <Link to="/mutual-funds" className="text-indigo-600 font-bold hover:underline">Back to Mutual Funds</Link>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link
                        to="/mutual-funds"
                        className="p-3 bg-white border border-indigo-50 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
                    >
                        <FiArrowLeft className="text-xl" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                                {fund.sector}
                            </span>
                            <span className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest">{fund.fundHouse}</span>
                        </div>
                        <h1 className="text-4xl font-black text-indigo-950 tracking-tight">{fund.name}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Current NAV</p>
                        <span className="text-3xl font-black text-indigo-950">₹{fund.nav}</span>
                    </div>
                    <div className="h-12 w-px bg-indigo-100 mx-2 hidden md:block" />
                    <div className="text-right">
                        <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">1Y Return</p>
                        <span className={`text-3xl font-black ${fund.return1Y >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {fund.return1Y > 0 ? '+' : ''}{fund.return1Y}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Analysis Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Holdings Analysis */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg">
                                <FiPieChart className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-black text-indigo-950">Holdings Analysis</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Equity', value: fund.holdings.equity, color: 'bg-indigo-500' },
                                { label: 'Debt', value: fund.holdings.debt, color: 'bg-emerald-500' },
                                { label: 'Cash', value: fund.holdings.cash, color: 'bg-amber-500' },
                                { label: 'Commodities', value: fund.holdings.commodities, color: 'bg-rose-500' }
                            ].map((item) => (
                                <div key={item.label} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                        <span className="text-lg font-black text-indigo-950">{item.value}%</span>
                                    </div>
                                    <div className="h-2 bg-indigo-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} transition-all duration-1000`}
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risk & Performance Metrics */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg">
                                <FiActivity className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-black text-indigo-950">Risk & Performance</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-50">
                                <FiActivity className="text-indigo-400 mb-3 text-xl" />
                                <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Alpha</p>
                                <p className="text-2xl font-black text-indigo-950">{fund.alpha > 0 ? '+' : ''}{fund.alpha}</p>
                                <p className="text-[10px] text-indigo-900/40 mt-1 italic">Excess return over benchmark</p>
                            </div>
                            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-50">
                                <FiShield className="text-indigo-400 mb-3 text-xl" />
                                <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Beta</p>
                                <p className="text-2xl font-black text-indigo-950">{fund.beta}</p>
                                <p className="text-[10px] text-indigo-900/40 mt-1 italic">Volatility relative to market</p>
                            </div>
                            <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-50">
                                <FiUser className="text-indigo-400 mb-3 text-xl" />
                                <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Fund Manager</p>
                                <p className="text-xl font-black text-indigo-950">{fund.fundManager}</p>
                                <p className="text-[10px] text-indigo-900/40 mt-1 italic">Expert handling this fund</p>
                            </div>
                        </div>
                    </div>

                    {/* Fund Description */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <div className="flex items-center gap-3 mb-6">
                            <FiInfo className="text-indigo-400 text-xl" />
                            <h3 className="text-xl font-black text-indigo-950">About this Fund</h3>
                        </div>
                        <p className="text-indigo-900/60 leading-relaxed font-medium">
                            {fund.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Investment Details */}
                    <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <FiBriefcase /> Investment Summary
                        </h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Min. SIP</span>
                                <span className="text-xl font-black">₹{fund.minSIP}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Fund Size</span>
                                <span className="text-xl font-black">₹{fund.aum}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Expense Ratio</span>
                                <span className="text-xl font-black">{fund.expenseRatio}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Rating</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-sm ${i < fund.rating ? 'text-amber-400' : 'text-white/10'}`}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-white text-indigo-900 font-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-xl">
                            Invest Now
                        </button>
                    </div>

                    {/* Tax & Charges */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/30">
                        <h3 className="text-xl font-black text-indigo-950 mb-6 flex items-center gap-2">
                            <FiPercent className="text-indigo-400" /> Fees & Taxation
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1 underline decoration-indigo-200 decoration-2 underline-offset-4">Exit Load</p>
                                <p className="text-sm font-bold text-indigo-950">{fund.exitLoad}</p>
                            </div>
                            <div>
                                <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1 underline decoration-indigo-200 decoration-2 underline-offset-4">Stamp Duty</p>
                                <p className="text-sm font-bold text-indigo-950">{fund.stampDuty}</p>
                            </div>
                            <div>
                                <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1 underline decoration-indigo-200 decoration-2 underline-offset-4">Tax Implication</p>
                                <p className="text-sm font-bold text-indigo-950">{fund.taxImplication}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MutualFundDetails;
