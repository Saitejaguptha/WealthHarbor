import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowLeft, FiTrendingUp, FiTrendingDown, FiPieChart,
    FiActivity, FiTarget, FiDollarSign, FiBarChart2, FiAward
} from 'react-icons/fi';
import { getIndexByName } from '../utils/indexData';
import PriceHistoryChart from '../components/common/PriceHistoryChart';
import MetricInfo from '../components/common/MetricInfo';

const IndexDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const indexData = getIndexByName(decodeURIComponent(name || ''));

    if (!indexData) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-10">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Index not found</h2>
                <button
                    onClick={() => navigate('/indices')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                >
                    Back to Indices
                </button>
            </div>
        );
    }

    const metrics = [
        { label: 'P/E Ratio', value: indexData.peRatio, icon: <FiActivity />, suffix: '' },
        { label: 'P/B Ratio', value: indexData.pbRatio, icon: <FiPieChart />, suffix: '' },
        { label: 'Div. Yield', value: indexData.divYield, icon: <FiDollarSign />, suffix: '%' },
        { label: 'Market Cap', value: indexData.marketCapValue, icon: <FiAward />, suffix: '' },
        { label: 'Beta', value: (0.8 + Math.random() * 0.5).toFixed(2), icon: <FiActivity />, suffix: '' },
        { label: 'Standard Dev', value: (10 + Math.random() * 10).toFixed(2), icon: <FiTarget />, suffix: '%' },
        { label: 'Daily Range', value: (parseFloat(indexData.value.replace(/,/g, '')) * 0.98).toFixed(2) + ' - ' + (parseFloat(indexData.value.replace(/,/g, '')) * 1.02).toFixed(2), icon: <FiBarChart2 />, suffix: '' },
        { label: '52W Range', value: (parseFloat(indexData.value.replace(/,/g, '')) * 0.85).toFixed(2) + ' - ' + (parseFloat(indexData.value.replace(/,/g, '')) * 1.15).toFixed(2), icon: <FiTrendingUp />, suffix: '' },
    ];

    return (
        <div className="p-4 md:p-8 pb-24 lg:pb-32 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/indices')}
                        className="p-3 bg-white border border-indigo-100 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                    >
                        <FiArrowLeft className="text-lg md:text-xl" />
                    </button>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-white text-[9px] md:text-[10px] font-black rounded uppercase tracking-widest ${
                                indexData.exchange === 'NSE' ? 'bg-indigo-600' : 'bg-amber-600'
                            }`}>
                                {indexData.exchange}
                            </span>
                            <span className="text-indigo-900/40 text-[10px] md:text-sm font-bold uppercase tracking-widest truncate">
                                Major Market Index
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-indigo-950 tracking-tight leading-tight">{indexData.name}</h1>
                    </div>
                </div>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-white shadow-2xl shadow-indigo-100">
                    <p className="text-indigo-100/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">Current Value</p>
                    <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
                        <span className="text-4xl md:text-6xl font-black">{indexData.value}</span>
                        <div className={`flex items-center gap-1 font-bold text-base md:text-lg ${indexData.isPositive ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {indexData.isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                            <span>{indexData.change}</span>
                        </div>
                    </div>
                    <p className="text-indigo-100/40 text-[10px] font-bold mt-2">{indexData.points} points movement today</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-50 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                        <span className="text-indigo-950 font-black text-lg md:text-xl">Market Sentiment</span>
                        <FiActivity className="text-indigo-200 text-2xl md:text-3xl" />
                    </div>
                    <p className="text-indigo-900/60 leading-relaxed font-medium text-xs md:text-sm">
                        {indexData.name} represents the performance of top companies on the {indexData.exchange}. 
                        The index is currently {indexData.isPositive ? 'gaining' : 'declining'} with a {indexData.change} change today.
                    </p>
                </div>
            </div>

            {/* Price History Chart */}
            <div className="mb-8 md:mb-12">
                <div className="bg-white/40 backdrop-blur-md rounded-[1.5rem] md:rounded-[2.5rem] p-0 border border-white/50 shadow-sm overflow-hidden">
                    <PriceHistoryChart
                        history={indexData.history}
                        color={indexData.isPositive ? "#10B981" : "#F43F5E"}
                        title={`${indexData.name} Points History`}
                    />
                </div>
            </div>

            {/* Metrics Grid */}
            <h2 className="text-xl md:text-2xl font-black text-indigo-950 mb-4 md:mb-6 tracking-tight flex items-center gap-3">
                Index Analysis Parameters
                <div className="h-1 flex-1 bg-indigo-50 rounded-full"></div>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
                {metrics.map((metric, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 md:p-6 rounded-[1.25rem] md:rounded-3xl border border-indigo-50 hover:border-indigo-200 hover:shadow-lg transition-all group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-2 md:mb-3">
                            <div className="text-indigo-400 text-lg md:text-xl group-hover:text-indigo-600 transition-colors">
                                {metric.icon}
                            </div>
                            {/* Star symbol for parameter explanation */}
                            <MetricInfo metricKey={metric.label} />
                        </div>
                        <p className="text-indigo-900/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1">{metric.label}</p>
                        <p className="text-sm md:text-base lg:text-lg font-bold text-indigo-950 truncate">
                            {metric.value}{metric.suffix}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndexDetails;
