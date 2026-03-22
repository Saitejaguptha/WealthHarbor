import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiActivity, FiBriefcase, FiPercent, FiUser, FiTrendingUp, FiDownload } from 'react-icons/fi';
import { getMutualFunds, refreshMutualFunds } from '../utils/mutualFundData';
import PriceHistoryChart from '../components/common/PriceHistoryChart';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../utils/watchlistUtils';
import { FiPlus, FiCheck, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../features/auth/AuthContext';
import FundHoldingsSection from '../components/fund/FundHoldingsSection';
import FundPerformanceSection from '../components/fund/FundPerformanceSection';
import FundRiskSection from '../components/fund/FundRiskSection';
import MetricInfo from '../components/common/MetricInfo';
import { formatNumberEnIn, formatIntegerEnIn } from '../utils/numberFormat';
import PageShell from '../components/layout/PageShell';

const MutualFundDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const funds = getMutualFunds();

    const fund = useMemo(() => {
        return funds.find(f => f.id === id);
    }, [id, funds]);

    const { user } = useAuth();
    const [inWatchlist, setInWatchlist] = React.useState(false);

    const userEmail = user?.email || '';

    React.useEffect(() => {
        if (fund && userEmail) {
            setInWatchlist(isInWatchlist(userEmail, fund.id));
        }
    }, [fund, userEmail]);

    const toggleWatchlist = () => {
        if (!fund || !userEmail) return;
        if (inWatchlist) {
            removeFromWatchlist(userEmail, fund.id);
            setInWatchlist(false);
        } else {
            addToWatchlist(userEmail, {
                id: fund.id,
                name: fund.name,
                symbol: fund.id,
                type: 'mutual-fund',
                price: fund.nav,
                change: fund.change,
                changePercent: fund.changePercent
            });
            setInWatchlist(true);
        }
    };

    if (!fund) {
        return (
            <div className="flex flex-col items-center justify-center p-10 h-[60vh]">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Mutual Fund not found</h2>
                <button onClick={() => navigate('/mutual-funds')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                    Back to Mutual Funds
                </button>
            </div>
        );
    }

    const performanceData = [
        { period: '1 Year', fund: fund.return1Y, benchmark: fund.benchmarkReturn1Y, category: fund.categoryAverage1Y },
        { period: '3 Year', fund: fund.return3Y, benchmark: fund.benchmarkReturn3Y, category: fund.categoryAverage3Y },
        { period: '5 Year', fund: fund.return5Y, benchmark: fund.benchmarkReturn5Y, category: fund.categoryAverage5Y },
    ];

    return (
        <PageShell className="animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/mutual-funds')}
                        className="p-3 bg-white border border-indigo-100 rounded-2xl text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm active:scale-95"
                    >
                        <FiArrowLeft className="text-xl" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[8px] md:text-[10px] font-black rounded uppercase tracking-widest shrink-0">
                                {fund.sector}
                            </span>
                            <span className="text-indigo-900/40 text-[9px] md:text-sm font-bold uppercase tracking-widest truncate">{fund.fundHouse}</span>
                        </div>
                        <h1 className="text-lg md:text-3xl font-black text-indigo-950 tracking-tight leading-tight break-words">{fund.name}</h1>
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
                        onClick={() => { refreshMutualFunds(); window.location.reload(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-xl md:rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-[10px] md:text-sm"
                    >
                        <FiRefreshCw className="shrink-0" />
                        <span className="whitespace-nowrap">Update Data</span>
                    </button>
                </div>
            </div>

            {/* NAV Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8 min-w-0">
                {/* Main NAV Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden min-w-0 max-w-full">
                    <MetricInfo metricKey="NAV" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-indigo-100/60 font-bold uppercase tracking-widest text-[9px] md:text-xs mb-2 md:mb-3">Current NAV</p>
                            <div className="flex items-baseline gap-2 md:gap-6 flex-wrap">
                                <span className="text-3xl md:text-7xl font-black">₹{formatNumberEnIn(fund.nav)}</span>
                                <div className={`flex items-center gap-1 font-black text-sm md:text-2xl ${fund.change >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                                    {fund.change >= 0 ? <FiTrendingUp /> : <FiActivity />}
                                    <span>{fund.change >= 0 ? '+' : ''}{formatNumberEnIn(fund.changePercent)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/10">
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">1Y Return</p>
                                <p className="text-xs md:text-xl font-black text-emerald-300 truncate">{formatNumberEnIn(fund.return1Y)}%</p>
                            </div>
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">3Y Return</p>
                                <p className="text-xs md:text-xl font-black text-emerald-300 truncate">{formatNumberEnIn(fund.return3Y)}%</p>
                            </div>
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">Min. SIP</p>
                                <p className="text-xs md:text-xl font-black text-white truncate">₹{formatIntegerEnIn(fund.minSIP)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Fund Overview Card */}
                <div className="bg-white/70 backdrop-blur-md p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-100/30 flex flex-col justify-center relative overflow-hidden min-w-0 max-w-full">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <span className="text-indigo-950 font-black text-lg md:text-2xl tracking-tight">Fund Overview</span>
                        <div className="flex gap-1 drop-shadow-sm">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm md:text-lg ${i < fund.rating ? 'text-amber-400' : 'text-indigo-100'}`}>★</span>
                            ))}
                        </div>
                    </div>
                    <p className="text-indigo-900/60 leading-relaxed font-medium text-[11px] md:text-base mb-4 md:mb-6">
                        {fund.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full uppercase tracking-widest">{fund.sector}</span>
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full uppercase tracking-widest">{fund.fundHouse}</span>
                    </div>
                </div>
            </div>

            {/* Performance Chart */}
            <div className="mb-8 md:mb-12 min-w-0 max-w-full">
                <div className="bg-white rounded-[2.5rem] p-0 border border-indigo-50 shadow-sm overflow-hidden min-w-0">
                    <PriceHistoryChart
                        history={fund.history}
                        color="#6366F1"
                        title={`${fund.name} NAV History`}
                    />
                </div>
            </div>

            {/* Risk Analysis */}
            <FundRiskSection {...fund.riskMetrics} />

            {/* Performance Comparison */}
            <FundPerformanceSection 
                id={fund.id}
                name={fund.name}
                benchmarkName={fund.benchmarkName}
                performance={performanceData}
            />

            {/* Portfolio Analysis */}
            <FundHoldingsSection 
                topHoldings={fund.topHoldings}
                sectorAllocation={fund.sectorAllocation}
            />

            {/* Manager & Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 min-w-0">
                {/* Fund Manager */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-indigo-50 shadow-xl shadow-indigo-50 p-5 sm:p-8 min-w-0 max-w-full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl">
                            <FiUser />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Expert Fund Management</p>
                            <h3 className="text-2xl font-black text-indigo-950">{fund.fundManager.name}</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs font-black text-indigo-950 uppercase tracking-widest mb-3">Professional Background</p>
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <FiBriefcase className="text-indigo-400 shrink-0 mt-1" />
                                    <p className="text-sm font-medium text-indigo-900/70">{fund.fundManager.experience}</p>
                                </div>
                                <div className="flex gap-3">
                                    <FiPercent className="text-indigo-400 shrink-0 mt-1" />
                                    <p className="text-sm font-medium text-indigo-900/70">{fund.fundManager.education}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black text-indigo-950 uppercase tracking-widest mb-3">Other Funds Managed</p>
                            <div className="flex flex-wrap gap-2">
                                {fund.fundManager.otherFunds.map((f, i) => (
                                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest">{f}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scheme Documents */}
                <div className="bg-indigo-900 rounded-[2.5rem] p-5 sm:p-8 text-white shadow-2xl shadow-indigo-100 flex flex-col justify-between min-w-0 max-w-full overflow-hidden">
                    <div>
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                            <FiPercent /> Scheme Documents
                        </h3>
                        <div className="space-y-4">
                            {fund.schemeDocuments.map((doc, i) => (
                                <a key={i} href={doc.url} className="flex items-center justify-between gap-3 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group min-w-0">
                                    <span className="text-sm font-bold text-white/80 group-hover:text-white min-w-0 break-words">{doc.name}</span>
                                    <FiDownload className="text-white/40 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex justify-between items-center gap-3 mb-2">
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Expense Ratio</span>
                            <div className="flex items-center justify-end gap-2 min-w-0 shrink-0">
                                <span className="text-xl font-black tabular-nums">{formatNumberEnIn(fund.expenseRatio)}%</span>
                                <MetricInfo metricKey="Expense Ratio" position="inline-beside" />
                            </div>
                        </div>
                        <p className="text-[10px] text-white/30 italic">Direct plan. Regular plans may have higher ratios.</p>
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default MutualFundDetails;
