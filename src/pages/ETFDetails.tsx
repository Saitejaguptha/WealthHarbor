import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiActivity, FiPieChart, FiZap, FiBarChart2, FiTrendingUp, FiCheck, FiPlus, FiRefreshCw, FiDroplet, FiMaximize2 } from 'react-icons/fi';
import { getETFs, refreshETFs } from '../utils/etfData';
import PriceHistoryChart from '../components/common/PriceHistoryChart';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../utils/watchlistUtils';
import { useAuth } from '../features/auth/AuthContext';
import FundHoldingsSection from '../components/fund/FundHoldingsSection';
import MetricInfo from '../components/common/MetricInfo';
import { formatNumberEnIn } from '../utils/numberFormat';
import PageShell from '../components/layout/PageShell';

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
        <PageShell className="animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/etfs')}
                        className="p-3 bg-white border border-indigo-100 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                    >
                        <FiArrowLeft className="text-xl" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[8px] md:text-[10px] font-black rounded uppercase tracking-widest shrink-0">
                                {etf.symbol}
                            </span>
                            <span className="text-indigo-900/40 text-[9px] md:text-sm font-bold uppercase tracking-widest truncate">{etf.fundHouse}</span>
                        </div>
                        <h1 className="text-lg md:text-3xl font-black text-indigo-950 tracking-tight leading-tight break-words">{etf.name}</h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                    <button
                        onClick={toggleWatchlist}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-[10px] md:text-sm ${inWatchlist
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                    >
                        {inWatchlist ? <FiCheck className="shrink-0" /> : <FiPlus className="shrink-0" />}
                        <span className="whitespace-nowrap">{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                    </button>
                    <button
                        onClick={() => { refreshETFs(); window.location.reload(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-xl md:rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-[10px] md:text-sm"
                    >
                        <FiRefreshCw className="shrink-0" />
                        <span className="whitespace-nowrap">Update Data</span>
                    </button>
                </div>
            </div>

            {/* Market Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8 min-w-0">
                {/* Main Price Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-indigo-950 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden min-w-0 max-w-full">
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-2 md:mb-3">
                                <p className="text-white/40 font-bold uppercase tracking-widest text-[9px] md:text-xs">Market Price</p>
                                <MetricInfo metricKey="Market Price" position="inline-beside" />
                            </div>
                            <div className="flex items-baseline gap-2 md:gap-6 flex-wrap">
                                <span className="text-3xl md:text-7xl font-black text-white">₹{formatNumberEnIn(etf.price)}</span>
                                <div className={`flex items-center gap-1 font-black text-sm md:text-2xl ${etf.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {etf.change >= 0 ? <FiTrendingUp /> : <FiActivity />}
                                    <span>{etf.change >= 0 ? '+' : ''}{formatNumberEnIn(etf.changePercent)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/10">
                            <div className="min-w-0">
                                <p className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">NAV</p>
                                <div className="flex items-center gap-2 min-w-0">
                                    <p className="text-xs md:text-xl font-black text-white truncate min-w-0 flex-1">₹{formatNumberEnIn(etf.nav)}</p>
                                    <MetricInfo metricKey="NAV" position="inline-beside" />
                                </div>
                            </div>
                            <div className="min-w-0">
                                <p className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">Disc/Prem</p>
                                <div className="flex items-center gap-2 min-w-0">
                                    <p className={`text-xs md:text-xl font-black truncate min-w-0 flex-1 ${etf.navDiscount >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                        {formatNumberEnIn(etf.navDiscount)}%
                                    </p>
                                    <MetricInfo metricKey="Discount/Prem" position="inline-beside" />
                                </div>
                            </div>
                            <div className="min-w-0 sm:col-span-1 col-span-2 sm:col-auto">
                                <p className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">AUM</p>
                                <div className="flex items-center gap-2 min-w-0">
                                    <p className="text-xs md:text-xl font-black text-white truncate min-w-0 flex-1">₹{etf.aum}</p>
                                    <MetricInfo metricKey="AUM" position="inline-beside" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ETF Overview Card */}
                <div className="bg-white/70 backdrop-blur-md p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-100/30 flex flex-col justify-center relative overflow-hidden min-w-0 max-w-full">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <span className="text-indigo-950 font-black text-lg md:text-2xl tracking-tight">ETF Overview</span>
                        <div className="flex gap-1 drop-shadow-sm">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm md:text-lg ${i < etf.rating ? 'text-amber-400' : 'text-indigo-50'}`}>★</span>
                            ))}
                        </div>
                    </div>
                    <p className="text-indigo-900/60 leading-relaxed font-medium text-[11px] md:text-base mb-4 md:mb-6">
                        {etf.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 md:gap-3 min-w-0">
                        <div className="p-2 md:p-3 bg-indigo-50 rounded-xl border border-indigo-100 min-w-0">
                            <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Exp. Ratio</p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="text-xs md:text-base font-black text-indigo-950 tabular-nums">{formatNumberEnIn(etf.expenseRatio)}%</p>
                                <MetricInfo metricKey="Expense Ratio" position="inline-beside" />
                            </div>
                        </div>
                        <div className="p-2 md:p-3 bg-indigo-50 rounded-xl border border-indigo-100 min-w-0">
                            <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Track Error</p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="text-xs md:text-base font-black text-indigo-950 tabular-nums">{formatNumberEnIn(etf.trackingError)}%</p>
                                <MetricInfo metricKey="Tracking Error" position="inline-beside" />
                            </div>
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
                <h2 className="text-lg md:text-2xl font-black text-indigo-950 mb-4 md:mb-6 tracking-tight flex items-center gap-2 md:gap-3">
                    <span className="text-indigo-400 text-xl md:text-2xl shrink-0"><FiBarChart2 /></span>
                    <span className="truncate min-w-0">Key ETF Statistics</span>
                    <div className="h-0.5 md:h-1 flex-1 bg-indigo-50 rounded-full min-w-[20px]" />
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 min-w-0">
                    {[
                        { icon: <FiMaximize2 />, label: "Market Cap", display: etf.marketCap, sub: "Basket focus", color: "bg-indigo-600", key: "Market Cap" },
                        { icon: <FiDroplet />, label: "Avg. Volume", display: etf.avgVolume, sub: "Daily trading", color: "bg-cyan-500", key: "Avg. Volume" },
                        { icon: <FiActivity />, label: "P/E Ratio", display: formatNumberEnIn(etf.peRatio), sub: "Market valuation", color: "bg-violet-500", key: "PE Ratio" },
                        { icon: <FiZap />, label: "Yield", display: `${formatNumberEnIn(etf.yield)}%`, sub: "Annual dividend", color: "bg-emerald-500", key: "Yield" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-2xl md:rounded-[2rem] border border-indigo-50 shadow-lg p-4 md:p-6 group hover:border-indigo-200 transition-colors overflow-hidden flex flex-col justify-between min-h-[140px] md:min-h-0 min-w-0">
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl ${stat.color} flex items-center justify-center text-white mb-2 md:mb-4 shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                                <span className="text-sm md:text-lg">{stat.icon}</span>
                            </div>
                            <div className="min-w-0 mt-auto">
                                <p className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-0.5 md:mb-1 truncate">{stat.label}</p>
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <p className="text-base md:text-xl font-black text-indigo-950 truncate min-w-0 flex-1">{stat.display}</p>
                                    <MetricInfo metricKey={stat.key} position="inline-beside" />
                                </div>
                                <p className="text-[7px] md:text-[10px] text-indigo-900/40 mt-1 uppercase font-bold tracking-widest truncate">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Liquidity & Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 min-w-0">
                <div className="lg:col-span-2 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 p-5 sm:p-8 min-w-0 max-w-full">
                    <div className="flex items-center gap-3 mb-8">
                        <FiDroplet className="text-indigo-600 text-xl shrink-0" />
                        <h3 className="text-xl font-black text-indigo-950">Liquidity Metrics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-w-0">
                        <div className="space-y-4 min-w-0">
                            <div className="flex justify-between items-center gap-2 min-w-0">
                                <span className="text-sm font-bold text-indigo-950 shrink-0">Liquidity Score</span>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-lg font-black text-indigo-600 tabular-nums">{etf.liquidityScore}/10</span>
                                    <MetricInfo metricKey="Liquidity Score" position="inline-beside" />
                                </div>
                            </div>
                            <div className="h-3 bg-white rounded-full overflow-hidden border border-indigo-100">
                                <div 
                                    className="h-full bg-indigo-600 rounded-full"
                                    style={{ width: `${etf.liquidityScore * 10}%` }}
                                />
                            </div>
                            <p className="text-[11px] text-indigo-900/40">Higher score indicates lower impact cost during large trades.</p>
                        </div>
                        <div className="p-6 bg-white rounded-[2rem] border border-indigo-100 shadow-sm overflow-hidden min-w-0">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Bid-Ask Spread</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-2xl font-black text-indigo-950 tabular-nums">{formatNumberEnIn(etf.bidAskSpread)}%</p>
                                <MetricInfo metricKey="Bid-Ask Spread" position="inline-beside" />
                            </div>
                            <p className="text-[10px] text-emerald-600 mt-1 font-bold uppercase tracking-widest">Highly Liquid</p>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900 rounded-[2.5rem] p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-w-0 max-w-full">
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
                                        <span className="text-white">{formatNumberEnIn(asset.value)}%</span>
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
        </PageShell>
    );
};

export default ETFDetails;
