import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowLeft, FiTrendingUp, FiTrendingDown, FiPieChart,
    FiActivity, FiTarget, FiDollarSign, FiBarChart2, FiAward, FiRefreshCw
} from 'react-icons/fi';
import { getStockBySymbol, refreshStocks } from '../utils/stockData';

const StockDetails: React.FC = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const navigate = useNavigate();
    const stock = getStockBySymbol(symbol || '');

    if (!stock) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Stock not found</h2>
                <button
                    onClick={() => navigate('/stocks')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                >
                    Back to Stocks
                </button>
            </div>
        );
    }

    const metrics = [
        { label: 'P/E Ratio', value: stock.peRatio, icon: <FiActivity />, suffix: '' },
        { label: 'Market Cap', value: stock.marketCapValue, icon: <FiPieChart />, suffix: '' },
        { label: 'Div. Yield', value: stock.dividendYield, icon: <FiDollarSign />, suffix: '%' },
        { label: 'ROCE', value: stock.roce, icon: <FiAward />, suffix: '%' },
        { label: 'Net Profit', value: stock.netProfit, icon: <FiTarget />, suffix: '' },
        { label: 'Qtr Profit', value: stock.qtrProfit, icon: <FiTrendingUp />, suffix: '' },
        { label: 'Qtr Sales', value: stock.qtrSales, icon: <FiBarChart2 />, suffix: '' },
        { label: 'Sales Growth', value: stock.salesGrowth, icon: <FiTrendingUp />, suffix: '%' },
        { label: 'Debt to Equity', value: stock.debtToEquity, icon: <FiActivity />, suffix: '' },
        { label: '52W High', value: stock.fiftyTwoWeekHigh, icon: <FiTrendingUp />, suffix: '' },
        { label: '52W Low', value: stock.fiftyTwoWeekLow, icon: <FiTrendingDown />, suffix: '' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/stocks')}
                    className="p-3 bg-white border border-indigo-100 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95"
                >
                    <FiArrowLeft className="text-xl" />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-widest">
                            {stock.symbol}
                        </span>
                        <span className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest">
                            {stock.sector} • {stock.marketCap}
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-indigo-950 tracking-tight">{stock.name}</h1>
                </div>
                <button
                    onClick={() => {
                        refreshStocks();
                        window.location.reload(); // Quick way to re-randomize for this specific demo setup
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                >
                    <FiRefreshCw />
                    Re-Analyze
                </button>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2rem] text-white shadow-2xl shadow-indigo-200">
                    <p className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-2">Current Price</p>
                    <div className="flex items-baseline gap-4">
                        <span className="text-6xl font-black">${stock.price}</span>
                        <div className={`flex items-center gap-1 font-bold text-lg ${stock.change >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {stock.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                            <span>{stock.change >= 0 ? '+' : ''}{stock.changePercent}%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-50 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-indigo-950 font-black text-xl">Quick Overview</span>
                        <FiActivity className="text-indigo-200 text-3xl" />
                    </div>
                    <p className="text-indigo-900/60 leading-relaxed font-medium">
                        {stock.name} is a leading player in the {stock.sector} sector with a {stock.marketCap} valuation.
                        Currently trading at ${stock.price}, the stock has shown a {stock.changePercent}% movement in the latest session.
                    </p>
                </div>
            </div>

            {/* Metrics Grid */}
            <h2 className="text-2xl font-black text-indigo-950 mb-6 tracking-tight flex items-center gap-3">
                Financial Metrics
                <div className="h-1 flex-1 bg-indigo-50 rounded-full"></div>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                    <div
                        key={idx}
                        className="bg-white/50 backdrop-blur-sm border border-indigo-50 p-6 rounded-3xl hover:border-indigo-200 hover:shadow-lg transition-all group"
                    >
                        <div className="text-indigo-400 mb-3 text-xl group-hover:text-indigo-600 transition-colors">
                            {metric.icon}
                        </div>
                        <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">{metric.label}</p>
                        <p className="text-xl font-bold text-indigo-950">
                            {metric.value}{metric.suffix}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default StockDetails;
