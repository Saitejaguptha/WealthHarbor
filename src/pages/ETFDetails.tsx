import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiActivity, FiPieChart, FiZap, FiBarChart2, FiTrendingUp, FiCheck, FiPlus, FiRefreshCw, FiDroplet, FiMaximize2 } from 'react-icons/fi';
import { getETFs, refreshETFs } from '../utils/etfData';
import PriceHistoryChart from '../components/common/PriceHistoryChart';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../utils/watchlistUtils';
import { useAuth } from '../features/auth/AuthContext';
import FundHoldingsSection from '../components/fund/FundHoldingsSection';
import MetricInfo from '../components/common/MetricInfo';

const ETFDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const etfs = getETFs();

    const etf = useMemo(() => {
        return etfs.find(e => e.id === id);
    }, [id, etfs]);

    const { user } = useAuth();
    const [inWatchlist, setInWatchlist] = React.useState(false);

    const userEmail = user?.email || '';

    React.useEffect(() => {
        if (etf && userEmail) {
            setInWatchlist(isInWatchlist(userEmail, etf.id));
        }
    }, [etf, userEmail]);

    const toggleWatchlist = () => {
        if (!etf || !userEmail) return;
        if (inWatchlist) {
            removeFromWatchlist(userEmail, etf.id);
            setInWatchlist(false);
        } else {
            addToWatchlist(userEmail, {
                id: etf.id,
                name: etf.name,
                symbol: etf.symbol,
                type: 'etf',
                price: etf.price,
                change: etf.change,
                changePercent: etf.changePercent
            });
            setInWatchlist(true);
        }
    };

    if (!etf) {
        return (
            <div className="flex flex-col items-center justify-center p-10 h-[60vh]">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">ETF not found</h2>
                <button onClick={() => navigate('/etfs')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                    Back to ETF Tracker
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/etfs')}
                        className="p-3 bg-white border border-indigo-100 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                    >
                        <FiArrowLeft className="text-xl" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] md:text-[10px] font-black rounded uppercase tracking-widest shrink-0">
                                {etf.symbol}
                            </span>
                            <span className="text-indigo-900/40 text-[10px] md:text-sm font-bold uppercase tracking-widest truncate">{etf.fundHouse}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight leading-tight">{etf.name}</h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={toggleWatchlist}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-sm ${inWatchlist
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                    >
                        {inWatchlist ? <FiCheck /> : <FiPlus />}
                        {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                    </button>
                    <button
                        onClick={() => { refreshETFs(); window.location.reload(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-sm"
                    >
                        <FiRefreshCw className="shrink-0" />
                        Update Data
                    </button>
                </div>
            </div>

            {/* Market Overview Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
                <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-6 md:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                    <MetricInfo metricKey="Market Price" />
                    <div className="relative z-10">
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">Market Price</p>
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl md:text-6xl font-black text-white">₹{etf.price}</span>
                            <div className={`flex items-center gap-1 font-bold text-lg ${etf.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {etf.change >= 0 ? <FiTrendingUp /> : <FiActivity />}
                                <span>{etf.change >= 0 ? '+' : ''}{etf.changePercent}%</span>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="relative">
                                <MetricInfo metricKey="NAV" />
                                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">NAV</p>
                                <p className="text-base md:text-lg font-black text-white truncate">₹{etf.nav}</p>
                            </div>
                            <div className="relative">
                                <MetricInfo metricKey="Discount/Prem" />
                                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Disc/Prem</p>
                                <p className={`text-base md:text-lg font-black truncate ${etf.navDiscount >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                    {etf.navDiscount}%
                                </p>
                            </div>
                            <div className="relative col-span-2 sm:col-span-1">
                                <MetricInfo metricKey="AUM" />
                                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">AUM</p>
                                <p className="text-base md:text-lg font-black text-white truncate">₹{etf.aum}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-50 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-widest">
                                {etf.sector} Focus
                            </span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-sm ${i < etf.rating ? 'text-amber-400' : 'text-indigo-50'}`}>★</span>
                                ))}
                            </div>
                        </div>
                        <p className="text-indigo-900/60 leading-relaxed font-medium text-sm">
                            {etf.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 relative overflow-hidden">
                            <MetricInfo metricKey="Expense Ratio" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Exp. Ratio</p>
                            <p className="text-lg font-black text-indigo-950">{etf.expenseRatio}%</p>
                        </div>
                        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 relative overflow-hidden">
                            <MetricInfo metricKey="Tracking Error" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Tracking Error</p>
                            <p className="text-lg font-black text-indigo-950">{etf.trackingError}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Chart */}
            <div className="mb-8 md:mb-12">
                <div className="bg-white rounded-[2.5rem] p-0 border border-indigo-50 shadow-sm overflow-hidden">
                    <PriceHistoryChart
                        history={etf.history}
                        color="#4F46E5"
                        title={`${etf.symbol} Price History`}
                    />
                </div>
            </div>

            {/* Portfolio Sections */}
            <FundHoldingsSection 
                topHoldings={etf.topHoldings}
                sectorAllocation={etf.sectorAllocation}
                title="Underlying Basket Analysis"
            />

            {/* Key Statistics Grid */}
            <div className="mb-8 md:mb-12">
                <h2 className="text-xl md:text-2xl font-black text-indigo-950 mb-6 tracking-tight flex items-center gap-3">
                    <span className="text-indigo-400 text-2xl"><FiBarChart2 /></span>
                    Key ETF Statistics
                    <div className="h-1 flex-1 bg-indigo-50 rounded-full" />
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: <FiMaximize2 />, label: "Market Cap", value: etf.marketCap, sub: "Basket focus", color: "bg-indigo-600", key: "Market Cap" },
                        { icon: <FiDroplet />, label: "Avg. Volume", value: etf.avgVolume, sub: "Daily trading", color: "bg-cyan-500", key: "Avg. Volume" },
                        { icon: <FiActivity />, label: "P/E Ratio", value: etf.peRatio, sub: "Market valuation", color: "bg-violet-500", key: "PE Ratio" },
                        { icon: <FiZap />, label: "Yield", value: `${etf.yield}%`, sub: "Annual dividend", color: "bg-emerald-500", key: "Yield" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-[2rem] border border-indigo-50 shadow-lg p-6 group hover:border-indigo-200 transition-colors relative overflow-hidden">
                            <MetricInfo metricKey={stat.key} />
                            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-xl font-black text-indigo-950">{stat.value}</p>
                            <p className="text-[10px] text-indigo-900/40 mt-1 uppercase font-bold tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Liquidity & Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <FiDroplet className="text-indigo-600 text-xl" />
                        <h3 className="text-xl font-black text-indigo-950">Liquidity Metrics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-indigo-950">Liquidity Score</span>
                                <span className="text-lg font-black text-indigo-600">{etf.liquidityScore}/10</span>
                            </div>
                            <div className="h-3 bg-white rounded-full overflow-hidden border border-indigo-100">
                                <div 
                                    className="h-full bg-indigo-600 rounded-full"
                                    style={{ width: `${etf.liquidityScore * 10}%` }}
                                />
                            </div>
                            <p className="text-[11px] text-indigo-900/40">Higher score indicates lower impact cost during large trades.</p>
                        </div>
                        <div className="p-6 bg-white rounded-[2rem] border border-indigo-100 shadow-sm relative overflow-hidden">
                            <MetricInfo metricKey="Bid-Ask Spread" />
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Bid-Ask Spread</p>
                            <p className="text-2xl font-black text-indigo-950">{etf.bidAskSpread}%</p>
                            <p className="text-[10px] text-emerald-600 mt-1 font-bold uppercase tracking-widest">Highly Liquid</p>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <MetricInfo metricKey="Liquidity Score" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <FiPieChart className="text-indigo-400" /> Asset Split
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Equity', value: etf.assetAllocation.equity },
                                { label: 'Debt', value: etf.assetAllocation.debt },
                                { label: 'Cash', value: etf.assetAllocation.cash },
                            ].map((asset, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/60">
                                        <span>{asset.label}</span>
                                        <span className="text-white">{asset.value}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-white rounded-full"
                                            style={{ width: `${asset.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ETFDetails;
