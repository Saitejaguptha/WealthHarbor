import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowLeft, FiTrendingUp, FiTrendingDown, FiPieChart,
    FiActivity, FiTarget, FiBarChart2, FiAward, FiRefreshCw,
    FiCheckCircle, FiAlertCircle, FiCalendar, FiFileText,
    FiDollarSign, FiLayers, FiUsers, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import PriceHistoryChart from '../../components/common/PriceHistoryChart';
import MetricInfo from '../../components/common/MetricInfo';
import { removeFromWatchlist, isInWatchlist, addToWatchlist } from '../../utils/watchlistUtils';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useAuth } from '../../features/auth/authHooks';
import type { Stock } from '../../types/stock';
import RevenueMixSection from '../../components/stock/RevenueMixSection';
import PeerComparisonSection from '../../components/stock/PeerComparisonSection';
import CorporateActionsSection from '../../components/stock/CorporateActionsSection';
import DocumentsSection from '../../components/stock/DocumentsSection';
import AnalysisViewsSection from '../../components/stock/AnalysisViewsSection';
import PageShell from '../../components/layout/PageShell';
import { formatNumberEnIn, formatIntegerEnIn, formatMetricCell } from '../../utils/numberFormat';
import { fetchStockDetails } from './stockDetailsService';
import SectionTitle from '../../components/common/SectionTitle';
import FinancialTable, { type TableRowDef } from '../../components/common/FinancialTable';

// Quarterly Results Table ─────────────────────────────
const QuarterlyResultsSection: React.FC<{ stock: Stock }> = ({ stock }) => {
    const [page, setPage] = useState(0);
    if (!stock) return null;
    const perPage = 4;
    const quarters = stock.quarterlyResults || [];
    const totalPages = Math.ceil(quarters.length / perPage);
    const visible = quarters.slice(page * perPage, page * perPage + perPage);

    const rows: TableRowDef<typeof visible[0]>[] = [
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
        <div className="mb-6 md:mb-12">
            <SectionTitle icon={<FiCalendar />} title="Quarterly Results" />
            <div className="bg-white rounded-2xl md:rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50/50 overflow-hidden">
                <div className="flex items-center justify-between p-3 md:p-4 border-b border-indigo-50 bg-indigo-50/40 gap-3">
                    <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest">
                        {page * perPage + 1}–{Math.min((page + 1) * perPage, quarters.length)} of {quarters.length} Quarters
                    </span>
                    <div className="flex gap-1.5">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="p-1.5 md:p-2 rounded-xl bg-white border border-indigo-100 text-indigo-600 disabled:opacity-30 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                        ><FiChevronLeft className="text-base" /></button>
                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            className="p-1.5 md:p-2 rounded-xl bg-white border border-indigo-100 text-indigo-600 disabled:opacity-30 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                        ><FiChevronRight className="text-base" /></button>
                    </div>
                </div>
                <FinancialTable
                    data={visible}
                    columns={visible.map(q => ({ label: q.quarter, key: 'quarter' as any }))}
                    rows={rows}
                    metricColumnLabel="Metric"
                />
            </div>
        </div>
    );
};

// P&L Section ─────────────────────────────
const ProfitLossSection: React.FC<{ stock: Stock }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.profitLoss || [];

    const rows: TableRowDef<typeof data[0]>[] = [
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
        <div className="mb-6 md:mb-12">
            <SectionTitle icon={<FiFileText />} title="Profit & Loss" />
            <div className="bg-white rounded-2xl md:rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50/50 overflow-hidden">
                <FinancialTable
                    data={data}
                    columns={data.map(d => ({ label: d.year, key: 'year' as any }))}
                    rows={rows}
                    metricColumnLabel="Metric (₹ Cr)"
                />
            </div>
        </div>
    );
};

// Balance Sheet Section ─────────────────────────────
const BalanceSheetSection: React.FC<{ stock: Stock }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.balanceSheet || [];

    const liabilityRows: TableRowDef<typeof data[0]>[] = [
        { key: 'equityCapital', label: 'Share Capital', prefix: '₹' },
        { key: 'reserves', label: 'Reserves', prefix: '₹' },
        { key: 'borrowings', label: 'Borrowings', prefix: '₹' },
        { key: 'otherLiabilities', label: 'Other Liabilities', prefix: '₹' },
        { key: 'totalLiabilities', label: 'Total Liabilities', prefix: '₹', highlight: true },
    ];
    const assetRows: TableRowDef<typeof data[0]>[] = [
        { key: 'fixedAssets', label: 'Fixed Assets', prefix: '₹' },
        { key: 'cwip', label: 'CWIP', prefix: '₹' },
        { key: 'investments', label: 'Investments', prefix: '₹' },
        { key: 'otherAssets', label: 'Other Assets', prefix: '₹' },
        { key: 'totalAssets', label: 'Total Assets', prefix: '₹', highlight: true },
    ];

    return (
        <div className="mb-6 md:mb-12">
            <SectionTitle icon={<FiLayers />} title="Balance Sheet" />
            <div className="bg-white rounded-2xl md:rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-indigo-100 bg-indigo-50/30">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">All figures in ₹ Cr</span>
                </div>
                <div className="flex flex-col">
                    <FinancialTable
                        data={data}
                        columns={data.map(d => ({ label: d.year, key: 'year' as any }))}
                        rows={liabilityRows}
                        metricColumnLabel="Liabilities"
                        headerClassName="bg-indigo-50/20"
                    />
                    <FinancialTable
                        data={data}
                        columns={data.map(d => ({ label: d.year, key: 'year' as any }))}
                        rows={assetRows}
                        metricColumnLabel="Assets"
                        headerClassName="bg-indigo-50/20"
                    />
                </div>
            </div>
        </div>
    );
};

// Cash Flow Section ─────────────────────────────
const CashFlowSection: React.FC<{ stock: Stock }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.cashFlow || [];

    const rows: TableRowDef<typeof data[0]>[] = [
        { 
            key: 'operatingActivity', 
            label: 'Cash from Operating Activity',
            cellClassName: (val: any) => typeof val === 'number' ? (val >= 0 ? 'text-emerald-600' : 'text-rose-600') : '',
            format: (val: any) => typeof val === 'number' ? `${val >= 0 ? '+' : ''}₹${formatNumberEnIn(val)}` : val
        },
        { 
            key: 'investingActivity', 
            label: 'Cash from Investing Activity',
            cellClassName: (val: any) => typeof val === 'number' ? (val >= 0 ? 'text-emerald-600' : 'text-rose-600') : '',
            format: (val: any) => typeof val === 'number' ? `${val >= 0 ? '+' : ''}₹${formatNumberEnIn(val)}` : val
        },
        { 
            key: 'financingActivity', 
            label: 'Cash from Financing Activity',
            cellClassName: (val: any) => typeof val === 'number' ? (val >= 0 ? 'text-emerald-600' : 'text-rose-600') : '',
            format: (val: any) => typeof val === 'number' ? `${val >= 0 ? '+' : ''}₹${formatNumberEnIn(val)}` : val
        },
        { 
            key: 'netCashFlow', 
            label: 'Net Cash Flow', 
            highlight: true,
            cellClassName: (val: any) => typeof val === 'number' ? (val >= 0 ? 'text-emerald-600' : 'text-rose-600') : '',
            format: (val: any) => typeof val === 'number' ? `${val >= 0 ? '+' : ''}₹${formatNumberEnIn(val)}` : val
        },
    ];

    return (
        <div className="mb-6 md:mb-12">
            <SectionTitle icon={<FiDollarSign />} title="Cash Flows" />
            <div className="bg-white rounded-2xl md:rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50/50 overflow-hidden">
                <FinancialTable
                    data={data}
                    columns={data.map(d => ({ label: d.year, key: 'year' as any }))}
                    rows={rows}
                    metricColumnLabel="Activity (₹ Cr)"
                    metricColumnWidth="md:min-w-[220px]"
                />
            </div>
        </div>
    );
};

// Shareholding Pattern ─────────────────────────────
const ShareholdingSection: React.FC<{ stock: Stock }> = ({ stock }) => {
    if (!stock) return null;
    const data = stock.shareholding || [];
    const latest = data[data.length - 1] || {};

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
                                    <p className="text-base font-black text-indigo-950">{formatNumberEnIn(latest?.[h.key] as number)}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-indigo-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">No. of Shareholders</span>
                        <span className="text-sm font-black text-indigo-950">{formatIntegerEnIn(latest?.noOfShareholders || 0)}</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl md:rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50/50 overflow-hidden">
                    <div className="px-5 py-4 border-b border-indigo-50 bg-indigo-50/30">
                        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Historical Trend (%)</p>
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-none md:scrollbar-thin pb-2">
                        <table className="w-full text-sm min-w-max border-collapse">
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
                                            <td key={d.quarter} className="text-right px-3 py-2.5 text-xs font-bold text-indigo-950">{formatNumberEnIn(d[h.key] as number)}%</td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="border-b border-indigo-50/50 bg-indigo-50/20">
                                    <td className="px-4 py-2.5 text-xs font-black text-indigo-700">Shareholders</td>
                                    {data.map(d => (
                                        <td key={d.quarter} className="text-right px-3 py-2.5 text-xs font-bold text-indigo-700 whitespace-nowrap">{formatIntegerEnIn(d.noOfShareholders)}</td>
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
    const [stock, setStock] = useState<Stock | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inWatchlist, setInWatchlist] = useState(false);

    const userEmail = user?.email || '';

    const loadStockDetails = async () => {
        if (!symbol) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchStockDetails(symbol);
            if (data) {
                setStock(data);
            } else {
                setError('Stock not found');
            }
        } catch (err) {
            setError('Failed to load stock details');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadStockDetails();
    }, [symbol]);

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

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-indigo-900/60 font-bold tracking-widest uppercase">Loading details...</p>
            </div>
        );
    }

    if (error || !stock) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">{error || 'Stock not found'}</h2>
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
        <PageShell className="animate-in fade-in slide-in-from-bottom-4 duration-700 overflow-x-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/stocks')}
                        className="p-3 bg-white border border-indigo-100 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                    >
                        <FiArrowLeft className="text-lg md:text-xl" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[8px] md:text-[10px] font-black rounded uppercase tracking-widest shrink-0">
                                {stock.symbol}
                            </span>
                            <span className="text-indigo-900/40 text-[9px] md:text-sm font-bold uppercase tracking-widest truncate">
                                {stock.sector} • {stock.marketCap}
                            </span>
                        </div>
                        <h1 className="text-xl md:text-3xl font-black text-indigo-950 tracking-tight leading-tight break-words">{stock.name}</h1>
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
                        onClick={() => { loadStockDetails(); }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white border border-indigo-100 text-indigo-600 font-bold rounded-xl md:rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-indigo-100/50 text-[10px] md:text-sm"
                    >
                        <FiRefreshCw className="shrink-0" />
                        <span className="whitespace-nowrap">Re-Analyze</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200/50 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-indigo-100/60 font-bold uppercase tracking-widest text-[9px] md:text-xs mb-2 md:mb-3">Live Price</p>
                            <div className="flex items-baseline gap-2 md:gap-6 flex-wrap">
                                <span className="text-3xl md:text-7xl font-black">₹{formatNumberEnIn(stock.price)}</span>
                                <div className={`flex items-center gap-1 font-black text-sm md:text-2xl ${stock.change >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                                    {stock.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                    <span>{stock.change >= 0 ? '+' : ''}{formatNumberEnIn(stock.changePercent)}%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/10">
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">Day High</p>
                                <p className="text-xs md:text-xl font-black text-white truncate">₹{formatNumberEnIn(stock.dayHigh)}</p>
                            </div>
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">Day Low</p>
                                <p className="text-xs md:text-xl font-black text-white truncate">₹{formatNumberEnIn(stock.dayLow)}</p>
                            </div>
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">Volume</p>
                                <p className="text-xs md:text-xl font-black text-white truncate">{stock.volume}</p>
                            </div>
                            <div>
                                <p className="text-indigo-100/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">Mkt Cap</p>
                                <p className="text-xs md:text-xl font-black text-white truncate">{stock.marketCap}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="bg-white/70 backdrop-blur-md p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-white shadow-2xl shadow-indigo-100/30 flex flex-col justify-center relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <span className="text-indigo-950 font-black text-lg md:text-2xl tracking-tight">Quick Overview</span>
                        <div className="p-2 md:p-3 bg-indigo-50 rounded-xl md:rounded-2xl text-indigo-600">
                            <FiActivity className="text-lg md:text-2xl" />
                        </div>
                    </div>
                    <p className="text-indigo-900/60 leading-relaxed font-medium text-[11px] md:text-base">
                        {stock.description}
                    </p>
                </div>
            </div>

            <div className="mb-8 md:mb-12">
                <div className="bg-white/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] p-0 border border-white/50 shadow-sm overflow-hidden">
                    <PriceHistoryChart
                        history={stock.history}
                        color={stock.change >= 0 ? "#10B981" : "#F43F5E"}
                        title={`${stock.symbol} Price History`}
                    />
                </div>
            </div>

            <div className="mb-8 md:mb-12">
                <SectionTitle icon={<FiBarChart2 />} title="Financial Metrics" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-4 md:p-6 rounded-[1.25rem] md:rounded-3xl border border-indigo-50 hover:border-indigo-200 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col justify-between min-h-[110px] md:min-h-[140px]"
                        >
                            <div className="flex justify-between items-start mb-2 md:mb-3">
                                <div className="text-indigo-400 text-lg md:text-xl group-hover:text-indigo-600 transition-colors">
                                    {metric.icon}
                                </div>
                                <MetricInfo metricKey={metric.label} />
                            </div>
                            <div>
                                <p className="text-indigo-900/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 truncate">{metric.label}</p>
                                <p className="text-sm md:text-lg font-black text-indigo-950 truncate">
                                    {formatMetricCell(metric.value as string | number, metric.suffix)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8 md:mb-12">
                <SectionTitle icon={<FiCheckCircle />} title="Pros & Cons" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl md:rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-50/50 overflow-hidden">
                        <div className="px-5 md:px-6 py-3 md:py-4 bg-emerald-50/60 border-b border-emerald-100 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-600 text-base md:text-lg" />
                            <span className="text-[10px] md:text-xs font-black text-emerald-700 uppercase tracking-widest">Pros</span>
                        </div>
                        <ul className="divide-y divide-emerald-50/60">
                            {stock.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-3 px-5 md:px-6 py-3 md:py-3.5 hover:bg-emerald-50/30 transition-colors">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                    <span className="text-[11px] md:text-sm font-medium text-indigo-900/80 leading-relaxed">{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl md:rounded-3xl border border-rose-100 shadow-xl shadow-rose-50/50 overflow-hidden">
                        <div className="px-5 md:px-6 py-3 md:py-4 bg-rose-50/60 border-b border-rose-100 flex items-center gap-2">
                            <FiAlertCircle className="text-rose-500 text-base md:text-lg" />
                            <span className="text-[10px] md:text-xs font-black text-rose-600 uppercase tracking-widest">Cons</span>
                        </div>
                        <ul className="divide-y divide-rose-50/60">
                            {stock.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-3 px-5 md:px-6 py-3 md:py-3.5 hover:bg-rose-50/30 transition-colors">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                    <span className="text-[11px] md:text-sm font-medium text-indigo-900/80 leading-relaxed">{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <QuarterlyResultsSection stock={stock} />
            <ProfitLossSection stock={stock} />
            <BalanceSheetSection stock={stock} />
            <CashFlowSection stock={stock} />
            <ShareholdingSection stock={stock} />

            <RevenueMixSection
                revenueMix={stock.revenueMix}
                locationBreakup={stock.locationBreakup}
                productBreakup={stock.productBreakup}
            />

            <PeerComparisonSection peers={stock.peers} currentSymbol={stock.symbol} />

            <CorporateActionsSection
                corporateActions={stock.corporateActions}
                suppliers={stock.suppliers}
            />

            <DocumentsSection
                annualReportUrl={stock.annualReportUrl}
                investorPresentationUrl={stock.investorPresentationUrl}
                earningsReleaseUrl={stock.earningsReleaseUrl}
                conferenceCallUrl={stock.conferenceCallUrl}
                conferenceCallSummary={stock.conferenceCallSummary}
                companyName={stock.name}
            />

            <AnalysisViewsSection
                shortTermView={stock.shortTermView}
                longTermView={stock.longTermView}
                fundamentalsScore={stock.fundamentalsScore}
                valuationScore={stock.valuationScore}
                currentPrice={stock.price}
                fairValue={stock.fairValue}
            />
        </PageShell>
    );
};

export default StockDetails;
