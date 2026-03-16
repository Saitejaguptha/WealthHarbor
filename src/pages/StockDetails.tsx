import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowLeft, FiTrendingUp, FiTrendingDown, FiPieChart,
    FiActivity, FiTarget, FiBarChart2, FiAward, FiRefreshCw,
    FiCheckCircle, FiAlertCircle, FiCalendar, FiFileText,
    FiDollarSign, FiLayers, FiUsers, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { getStockBySymbol, refreshStocks } from '../utils/stockData';
import PriceHistoryChart from '../components/common/PriceHistoryChart';
import MetricInfo from '../components/common/MetricInfo';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../utils/watchlistUtils';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useAuth } from '../features/auth/AuthContext';
import RevenueMixSection from '../components/stock/RevenueMixSection';
import PeerComparisonSection from '../components/stock/PeerComparisonSection';
import CorporateActionsSection from '../components/stock/CorporateActionsSection';
import DocumentsSection from '../components/stock/DocumentsSection';
import AnalysisViewsSection from '../components/stock/AnalysisViewsSection';

const fmtNum = (n: number) => n?.toLocaleString('en-IN') ?? '-';

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <h2 className="text-lg md:text-2xl font-black text-indigo-950 mb-4 md:mb-6 tracking-tight flex items-center gap-2 md:gap-3">
        <span className="text-indigo-400 text-xl md:text-2xl shrink-0">{icon}</span>
        <span className="whitespace-nowrap">{title}</span>
        <div className="h-0.5 md:h-1 flex-1 bg-indigo-50 rounded-full" />
    </h2>
);

// Quarterly Results Table ─────────────────────────────
const QuarterlyResultsSection: React.FC<{ stock: ReturnType<typeof getStockBySymbol> }> = ({ stock }) => {
    const [page, setPage] = useState(0);
    if (!stock) return null;
    const perPage = 4;
    const quarters = stock.quarterlyResults;
    const totalPages = Math.ceil(quarters.length / perPage);
    const visible = quarters.slice(page * perPage, page * perPage + perPage);

    const rows: { key: keyof typeof visible[0]; label: string; prefix?: string; suffix?: string; highlight?: boolean }[] = [
        { key: 'sales', label: 'Sales', prefix: '₹', suffix: ' Cr' },
        { key: 'expenses', label: 'Expenses', prefix: '₹', suffix: ' Cr' },
        { key: 'operatingProfit', label: 'Operating Profit', prefix: '₹', suffix: ' Cr', highlight: true },
        { key: 'opm', label: 'OPM %', suffix: '%' },
        { key: 'otherIncome', label: 'Other Income', prefix: '₹', suffix: ' Cr' },
        { key: 'profitBeforeTax', label: 'Profit Before Tax', prefix: '₹', suffix: ' Cr' },
        { key: 'taxPercent', label: 'Tax %', suffix: '%' },
        { key: 'netProfit', label: 'Net Profit', prefix: '₹', suffix: ' Cr', highlight: true },
        { key: 'eps', label: 'EPS (₹)', prefix: '₹' },
    ];

    return (
        <div className="mb-8 md:mb-12">
            <SectionTitle icon={<FiCalendar />} title="Quarterly Results" />
            <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                {/* Pagination header */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-indigo-50 bg-indigo-50/40 gap-3">
                    <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest text-center sm:text-left">
                        Showing {page * perPage + 1}–{Math.min((page + 1) * perPage, quarters.length)} of {quarters.length} Quarters
                    </span>
                    <div className="flex gap-1.5">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 md:p-1.5 rounded-xl bg-white border border-indigo-100 text-indigo-600 disabled:opacity-30 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                        ><FiChevronLeft className="text-lg md:text-base" /></button>
                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            className="p-2 md:p-1.5 rounded-xl bg-white border border-indigo-100 text-indigo-600 disabled:opacity-30 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                        ><FiChevronRight className="text-lg md:text-base" /></button>
                    </div>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-indigo-50">
                                <th className="text-left px-5 py-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest min-w-[140px] md:min-w-[160px]">Metric</th>
                                {visible.map(q => (
                                    <th key={q.quarter} className="text-right px-4 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-widest whitespace-nowrap min-w-[90px] md:min-w-[110px]">{q.quarter}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, ri) => (
                                <tr key={ri} className={`border-b border-indigo-50/50 ${row.highlight ? 'bg-indigo-50/40' : 'hover:bg-indigo-50/20'} transition-colors`}>
                                    <td className={`px-5 py-3 text-xs font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-900/70'} whitespace-nowrap`}>{row.label}</td>
                                    {visible.map(q => (
                                        <td key={q.quarter} className={`text-right px-4 py-3 text-sm font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-950'} whitespace-nowrap`}>
                                            {row.prefix || ''}{fmtNum(q[row.key] as number)}{row.suffix || ''}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// P&L Section ─────────────────────────────
const ProfitLossSection: React.FC<{ stock: ReturnType<typeof getStockBySymbol> }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.profitLoss;

    const rows: { key: keyof typeof data[0]; label: string; prefix?: string; suffix?: string; highlight?: boolean }[] = [
        { key: 'sales', label: 'Sales', prefix: '₹', suffix: ' Cr' },
        { key: 'expenses', label: 'Expenses', prefix: '₹', suffix: ' Cr' },
        { key: 'operatingProfit', label: 'Operating Profit', prefix: '₹', suffix: ' Cr', highlight: true },
        { key: 'opm', label: 'OPM %', suffix: '%' },
        { key: 'otherIncome', label: 'Other Income', prefix: '₹', suffix: ' Cr' },
        { key: 'depreciation', label: 'Depreciation', prefix: '₹', suffix: ' Cr' },
        { key: 'interest', label: 'Interest', prefix: '₹', suffix: ' Cr' },
        { key: 'profitBeforeTax', label: 'Profit Before Tax', prefix: '₹', suffix: ' Cr' },
        { key: 'tax', label: 'Tax', prefix: '₹', suffix: ' Cr' },
        { key: 'netProfit', label: 'Net Profit', prefix: '₹', suffix: ' Cr', highlight: true },
        { key: 'eps', label: 'EPS (₹)', prefix: '₹' },
        { key: 'dividendPayout', label: 'Dividend Payout %', suffix: '%' },
    ];

    return (
        <div className="mb-8 md:mb-12">
            <SectionTitle icon={<FiFileText />} title="Profit & Loss" />
            <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-indigo-50 bg-indigo-50/40">
                                <th className="text-left px-5 py-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest min-w-[120px] md:min-w-[180px]">Metric (₹ Cr)</th>
                                {data.map(d => (
                                    <th key={d.year} className="text-right px-5 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-widest min-w-[80px] md:min-w-[100px]">{d.year}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, ri) => (
                                <tr key={ri} className={`border-b border-indigo-50/50 ${row.highlight ? 'bg-indigo-50/40' : 'hover:bg-indigo-50/20'} transition-colors`}>
                                    <td className={`px-5 py-3 text-xs font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-900/70'}`}>{row.label}</td>
                                    {data.map(d => (
                                        <td key={d.year} className={`text-right px-5 py-3 text-sm font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-950'}`}>
                                            {row.prefix || ''}{fmtNum(d[row.key] as number)}{row.suffix || ''}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Balance Sheet Section ─────────────────────────────
const BalanceSheetSection: React.FC<{ stock: ReturnType<typeof getStockBySymbol> }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.balanceSheet;

    const liabilityRows: { key: keyof typeof data[0]; label: string; highlight?: boolean }[] = [
        { key: 'equityCapital', label: 'Share Capital' },
        { key: 'reserves', label: 'Reserves' },
        { key: 'borrowings', label: 'Borrowings' },
        { key: 'otherLiabilities', label: 'Other Liabilities' },
        { key: 'totalLiabilities', label: 'Total Liabilities', highlight: true },
    ];
    const assetRows: { key: keyof typeof data[0]; label: string; highlight?: boolean }[] = [
        { key: 'fixedAssets', label: 'Fixed Assets' },
        { key: 'cwip', label: 'CWIP' },
        { key: 'investments', label: 'Investments' },
        { key: 'otherAssets', label: 'Other Assets' },
        { key: 'totalAssets', label: 'Total Assets', highlight: true },
    ];

    const TableBlock = ({ rows, title }: { rows: typeof liabilityRows; title: string }) => (
        <div className="min-w-full">
            <div className="px-5 py-3 border-b border-indigo-100 bg-indigo-50/60">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{title}</span>
            </div>
            {rows.map((row, ri) => (
                <div key={ri} className={`flex justify-between items-center px-5 py-3 border-b border-indigo-50/60 ${row.highlight ? 'bg-indigo-50/50' : 'hover:bg-indigo-50/20'} transition-colors overflow-x-auto`}>
                    <span className={`text-xs font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-900/70'} whitespace-nowrap mr-6`}>{row.label}</span>
                    <div className="flex gap-4 md:gap-6">
                        {data.map(d => (
                            <span key={d.year} className={`text-sm font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-950'} min-w-[70px] md:min-w-[80px] text-right`}>
                                ₹{fmtNum(d[row.key] as number)}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="mb-8 md:mb-12">
            <SectionTitle icon={<FiLayers />} title="Balance Sheet" />
            <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                {/* Year headers */}
                <div className="flex justify-end items-center px-5 py-3 border-b border-indigo-100 bg-indigo-50/30 gap-6">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mr-auto">All figures in ₹ Cr</span>
                    {data.map(d => (
                        <span key={d.year} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest min-w-[80px] text-right">{d.year}</span>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <TableBlock rows={liabilityRows} title="Liabilities" />
                    <TableBlock rows={assetRows} title="Assets" />
                </div>
            </div>
        </div>
    );
};

// Cash Flow Section ─────────────────────────────
const CashFlowSection: React.FC<{ stock: ReturnType<typeof getStockBySymbol> }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.cashFlow;

    const rows: { key: keyof typeof data[0]; label: string; highlight?: boolean }[] = [
        { key: 'operatingActivity', label: 'Cash from Operating Activity' },
        { key: 'investingActivity', label: 'Cash from Investing Activity' },
        { key: 'financingActivity', label: 'Cash from Financing Activity' },
        { key: 'netCashFlow', label: 'Net Cash Flow', highlight: true },
    ];

    return (
        <div className="mb-8 md:mb-12">
            <SectionTitle icon={<FiDollarSign />} title="Cash Flows" />
            <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-indigo-50 bg-indigo-50/40">
                                <th className="text-left px-5 py-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest min-w-[160px] md:min-w-[220px]">Activity (₹ Cr)</th>
                                {data.map(d => (
                                    <th key={d.year} className="text-right px-5 py-3 text-[10px] font-black text-indigo-600 uppercase tracking-widest min-w-[80px] md:min-w-[100px]">{d.year}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, ri) => (
                                <tr key={ri} className={`border-b border-indigo-50/50 ${row.highlight ? 'bg-indigo-50/40' : 'hover:bg-indigo-50/20'} transition-colors`}>
                                    <td className={`px-5 py-3 text-xs font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-900/70'}`}>{row.label}</td>
                                    {data.map(d => {
                                        const val = d[row.key] as number;
                                        return (
                                            <td key={d.year} className={`text-right px-5 py-3 text-sm font-bold ${row.highlight ? 'text-indigo-700' : val >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {val >= 0 ? '+' : ''}₹{fmtNum(val)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Shareholding Pattern ─────────────────────────────
const ShareholdingSection: React.FC<{ stock: ReturnType<typeof getStockBySymbol> }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.shareholding;
    const latest = data[data.length - 1];

    const holders = [
        { key: 'promoters' as const, label: 'Promoters', color: '#6366F1', bg: 'bg-indigo-600' },
        { key: 'fii' as const, label: 'FII', color: '#8B5CF6', bg: 'bg-violet-500' },
        { key: 'dii' as const, label: 'DII', color: '#06B6D4', bg: 'bg-cyan-500' },
        { key: 'government' as const, label: 'Government', color: '#10B981', bg: 'bg-emerald-500' },
        { key: 'public' as const, label: 'Public', color: '#F59E0B', bg: 'bg-amber-500' },
        { key: 'others' as const, label: 'Others', color: '#6B7280', bg: 'bg-gray-400' },
    ];

    return (
        <div className="mb-8 md:mb-12">
            <SectionTitle icon={<FiUsers />} title="Shareholding Pattern" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latest Bar Chart */}
                <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 p-6">
                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-5">{latest?.quarter} — Latest Holdings</p>
                    <div className="flex rounded-full overflow-hidden h-4 mb-6 gap-0.5">
                        {holders.map(h => (
                            <div key={h.key} title={`${h.label}: ${latest?.[h.key]}%`}
                                style={{ width: `${latest?.[h.key] ?? 0}%`, backgroundColor: h.color }}
                                className="transition-all duration-500" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {holders.map(h => (
                            <div key={h.key} className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/50">
                                <div className={`w-3 h-3 rounded-full ${h.bg} shrink-0`} />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{h.label}</p>
                                    <p className="text-base font-black text-indigo-950">{latest?.[h.key]?.toFixed(2)}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-indigo-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">No. of Shareholders</span>
                        <span className="text-sm font-black text-indigo-950">{latest?.noOfShareholders?.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {/* Trend Table */}
                <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                    <div className="px-5 py-4 border-b border-indigo-50 bg-indigo-50/30">
                        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Historical Trend (%)</p>
                    </div>
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-indigo-50 bg-indigo-50/20">
                                    <th className="text-left px-4 py-2.5 text-[9px] font-black text-indigo-400 uppercase tracking-widest min-w-[100px]">Holder</th>
                                    {data.map(d => (
                                        <th key={d.quarter} className="text-right px-3 py-2.5 text-[9px] font-black text-indigo-500 uppercase tracking-widest whitespace-nowrap min-w-[80px]">{d.quarter}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {holders.map(h => (
                                    <tr key={h.key} className="border-b border-indigo-50/50 hover:bg-indigo-50/20 transition-colors">
                                        <td className="px-4 py-2.5 text-xs font-bold text-indigo-900/70 flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${h.bg} shrink-0`} />
                                            {h.label}
                                        </td>
                                        {data.map(d => (
                                            <td key={d.quarter} className="text-right px-3 py-2.5 text-xs font-bold text-indigo-950">{d[h.key]?.toFixed(2)}%</td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="border-b border-indigo-50/50 bg-indigo-50/20">
                                    <td className="px-4 py-2.5 text-xs font-black text-indigo-700">Shareholders</td>
                                    {data.map(d => (
                                        <td key={d.quarter} className="text-right px-3 py-2.5 text-xs font-bold text-indigo-700 whitespace-nowrap">{d.noOfShareholders?.toLocaleString('en-IN')}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Component ─────────────────────────────────────────
const StockDetails: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const stock = getStockBySymbol(symbol || '');
    const [inWatchlist, setInWatchlist] = useState(false);

    const userEmail = user?.email || '';

    React.useEffect(() => {
        if (stock && userEmail) {
            setInWatchlist(isInWatchlist(userEmail, stock.symbol));
        }
    }, [stock, userEmail]);

    const toggleWatchlist = () => {
        if (!stock || !userEmail) return;
        if (inWatchlist) {
            removeFromWatchlist(userEmail, stock.symbol);
            setInWatchlist(false);
        } else {
            addToWatchlist(userEmail, {
                id: stock.symbol,
                name: stock.name,
                symbol: stock.symbol,
                type: 'stock',
                price: stock.price,
                change: stock.change,
                changePercent: stock.changePercent
            });
            setInWatchlist(true);
        }
    };

    if (!stock) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Stock not found</h2>
                <button onClick={() => navigate('/stocks')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                    Back to Stocks
                </button>
            </div>
        );
    }

    const metrics = [
        { label: 'P/E Ratio', value: stock.peRatio, icon: <FiActivity />, suffix: '' },
        { label: 'Market Cap', value: stock.marketCapValue, icon: <FiPieChart />, suffix: '' },
        { label: 'Div. Yield', value: stock.dividendYield, icon: <FiTarget />, suffix: '%' },
        { label: 'ROCE', value: stock.roce, icon: <FiAward />, suffix: '%' },
        { label: 'ROE', value: stock.roe, icon: <FiBarChart2 />, suffix: '%' },
        { label: 'Book Value', value: `₹${stock.bookValue}`, icon: <FiLayers />, suffix: '' },
        { label: 'Net Profit', value: stock.netProfit, icon: <FiTarget />, suffix: '' },
        { label: 'Face Value', value: `₹${stock.faceValue}`, icon: <FiDollarSign />, suffix: '' },
        { label: 'Day High', value: `₹${stock.dayHigh}`, icon: <FiTrendingUp />, suffix: '' },
        { label: 'Day Low', value: `₹${stock.dayLow}`, icon: <FiTrendingDown />, suffix: '' },
        { label: 'Debt to Equity', value: stock.debtToEquity, icon: <FiActivity />, suffix: '' },
        { label: '52W High', value: `₹${stock.fiftyTwoWeekHigh}`, icon: <FiTrendingUp />, suffix: '' },
        { label: '52W Low', value: `₹${stock.fiftyTwoWeekLow}`, icon: <FiTrendingDown />, suffix: '' },
    ];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/stocks')}
                        className="p-3 bg-white border border-indigo-100 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                    >
                        <FiArrowLeft className="text-lg md:text-xl" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] md:text-[10px] font-black rounded uppercase tracking-widest shrink-0">
                                {stock.symbol}
                            </span>
                            <span className="text-indigo-900/40 text-[10px] md:text-sm font-bold uppercase tracking-widest truncate">
                                {stock.sector} • {stock.marketCap}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight leading-tight truncate">{stock.name}</h1>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
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
                        onClick={() => { refreshStocks(); window.location.reload(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-sm"
                    >
                        <FiRefreshCw className="shrink-0" />
                        Re-Analyze
                    </button>
                </div>
            </div>

            {/* Price Card + Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-white shadow-2xl shadow-indigo-100">
                    <p className="text-indigo-100/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">Current Price</p>
                    <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
                        <span className="text-4xl md:text-6xl font-black">₹{stock.price}</span>
                        <div className={`flex items-center gap-1 font-bold text-base md:text-lg ${stock.change >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {stock.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent}%</span>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4 text-sm">
                        <div>
                            <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest">Day High</p>
                            <p className="font-black text-emerald-300">₹{stock.dayHigh}</p>
                        </div>
                        <div>
                            <p className="text-indigo-200/50 text-[10px] uppercase tracking-widest">Day Low</p>
                            <p className="font-black text-rose-300">₹{stock.dayLow}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-50 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                        <span className="text-indigo-950 font-black text-lg md:text-xl">Quick Overview</span>
                        <FiActivity className="text-indigo-200 text-2xl md:text-3xl" />
                    </div>
                    <p className="text-indigo-900/60 leading-relaxed font-medium text-xs md:text-sm">
                        {stock.name} is a leading player in the {stock.sector} sector with a {stock.marketCap} valuation.
                        Currently trading at ₹{stock.price}, the stock has shown a {stock.changePercent}% movement in the latest session.
                    </p>
                </div>
            </div>

            {/* Price History Chart */}
            <div className="mb-8 md:mb-12">
                <div className="bg-white/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] p-0 border border-white/50 shadow-sm overflow-hidden">
                    <PriceHistoryChart
                        history={stock.history}
                        color={stock.change >= 0 ? "#10B981" : "#F43F5E"}
                        title={`${stock.symbol} Price History`}
                    />
                </div>
            </div>

            {/* Financial Metrics Grid */}
            <div className="mb-8 md:mb-12">
                <SectionTitle icon={<FiBarChart2 />} title="Financial Metrics" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-3.5 md:p-5 rounded-[1.25rem] md:rounded-3xl border border-indigo-50 hover:border-indigo-200 hover:shadow-lg transition-all group relative overflow-hidden"
                        >
                            <div className="text-indigo-400 mb-2 text-base md:text-lg group-hover:text-indigo-600 transition-colors">
                                {metric.icon}
                            </div>
                            <p className="text-indigo-900/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 truncate">{metric.label}</p>
                            <p className="text-sm md:text-lg font-bold text-indigo-950 truncate">
                                {metric.value}{metric.suffix}
                            </p>
                            <MetricInfo metricKey={metric.label} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pros & Cons */}
            <div className="mb-8 md:mb-12">
                <SectionTitle icon={<FiCheckCircle />} title="Pros & Cons" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-50 overflow-hidden">
                        <div className="px-6 py-4 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-600 text-lg" />
                            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Pros</span>
                        </div>
                        <ul className="divide-y divide-emerald-50/60">
                            {stock.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-3 px-6 py-3.5 hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                    <span className="text-sm font-medium text-indigo-900/80 leading-relaxed">{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cons */}
                    <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-50 overflow-hidden">
                        <div className="px-6 py-4 bg-rose-50/60 border-b border-rose-100 flex items-center gap-2">
                            <FiAlertCircle className="text-rose-500 text-lg" />
                            <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Cons</span>
                        </div>
                        <ul className="divide-y divide-rose-50/60">
                            {stock.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-3 px-6 py-3.5 hover:bg-rose-50/30 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                    <span className="text-sm font-medium text-indigo-900/80 leading-relaxed">{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Quarterly Results */}
            <QuarterlyResultsSection stock={stock} />

            {/* Profit & Loss */}
            <ProfitLossSection stock={stock} />

            {/* Balance Sheet */}
            <BalanceSheetSection stock={stock} />

            {/* Cash Flows */}
            <CashFlowSection stock={stock} />

            {/* Shareholding Pattern */}
            <ShareholdingSection stock={stock} />

            {/* Revenue Mix */}
            <RevenueMixSection
                revenueMix={stock.revenueMix}
                locationBreakup={stock.locationBreakup}
                productBreakup={stock.productBreakup}
            />

            {/* Peer Comparison */}
            <PeerComparisonSection peers={stock.peers} currentSymbol={stock.symbol} />

            {/* Corporate Actions & Suppliers */}
            <CorporateActionsSection
                corporateActions={stock.corporateActions}
                suppliers={stock.suppliers}
            />

            {/* Investor Documents */}
            <DocumentsSection
                annualReportUrl={stock.annualReportUrl}
                investorPresentationUrl={stock.investorPresentationUrl}
                earningsReleaseUrl={stock.earningsReleaseUrl}
                conferenceCallUrl={stock.conferenceCallUrl}
                conferenceCallSummary={stock.conferenceCallSummary}
                companyName={stock.name}
            />

            {/* Investment Views + Scores + Fair Value */}
            <AnalysisViewsSection
                shortTermView={stock.shortTermView}
                longTermView={stock.longTermView}
                fundamentalsScore={stock.fundamentalsScore}
                valuationScore={stock.valuationScore}
                currentPrice={stock.price}
                fairValue={stock.fairValue}
            />
        </div>
    );
};

export default StockDetails;
