import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiActivity, FiGlobe, FiPieChart } from 'react-icons/fi';
import { getNews } from '../utils/newsData';

const mockMovers = [
    { symbol: 'RELIANCE', company: 'Reliance Industries', price: '₹2,985.40', change: '+1.2%', isPositive: true, volume: '4.5M' },
    { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd', price: '₹1,442.20', change: '-0.8%', isPositive: false, volume: '18.2M' },
    { symbol: 'TCS', company: 'Tata Consultancy', price: '₹4,120.15', change: '+2.4%', isPositive: true, volume: '2.1M' },
    { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd', price: '₹1,085.60', change: '+1.5%', isPositive: true, volume: '12.4M' },
    { symbol: 'INFY', company: 'Infosys Ltd', price: '₹1,620.35', change: '-1.1%', isPositive: false, volume: '6.8M' }
];

const MarketAnalysis: React.FC = () => {
    // News Data
    const latestNews = useMemo(() => getNews(), []);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-indigo-950 mb-2 tracking-tight">Market Overview</h1>
                    <p className="text-indigo-900/60 font-medium">Real-time news and market dynamics at a glance</p>
                </div>

                {/* Market Status Indicator */}
                <div className="bg-white px-5 py-3 rounded-2xl border border-indigo-50 shadow-sm flex items-center gap-4 w-fit">
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

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                    <div className="flex items-center gap-3 mb-4 opacity-80">
                        <FiActivity className="text-2xl" />
                        <span className="font-bold tracking-widest uppercase text-xs">Market Sentiment</span>
                    </div>
                    <div className="text-3xl font-black mb-1">Cautiously Bullish</div>
                    <p className="text-sm opacity-90">Driven by tech sector earnings and steady interest rates.</p>
                </div>
                <div className="bg-white border-2 border-indigo-50 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                        <span className="font-bold tracking-widest uppercase text-xs text-indigo-900/40">India VIX Volatility</span>
                    </div>
                    <div className="text-3xl font-black text-indigo-950 mb-1">15.45</div>
                    <p className="text-sm text-emerald-600 font-bold">-0.85 (-5.21%) today</p>
                </div>
                <div className="bg-white border-2 border-indigo-50 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                        <span className="font-bold tracking-widest uppercase text-xs text-indigo-900/40">Domestic Top Gainer Sector</span>
                    </div>
                    <div className="text-3xl font-black text-indigo-950 mb-1">Technology</div>
                    <p className="text-sm text-emerald-600 font-bold">+2.4% Average Growth</p>
                </div>
            </div>

            {/* News and Movers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* News Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-indigo-950 tracking-tight flex items-center gap-2">
                        <FiClock className="text-indigo-600" /> Real-time Coverage
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {latestNews.map((news) => (
                            <Link 
                                key={news.id} 
                                to={`/news/${news.id}`}
                                className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-lg shadow-indigo-100/30 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-black rounded-lg tracking-widest uppercase">
                                            {news.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs font-bold text-indigo-900/40">
                                            <FiClock />
                                            {new Date(news.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-indigo-950 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-indigo-900/60 leading-relaxed line-clamp-2">
                                        {news.summary}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-indigo-50 mt-6">
                                    <span className="text-xs font-bold text-indigo-900/40 uppercase tracking-widest">{news.source}</span>
                                    <span className="flex items-center gap-1 text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                                        Read Full Article <FiArrowRight />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Top Movers Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-indigo-950 tracking-tight flex items-center gap-2">
                        <FiPieChart className="text-indigo-600" /> Top Movers
                    </h2>

                    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl shadow-xl shadow-indigo-100/50 overflow-hidden">
                        {mockMovers.map((mover, i) => (
                            <div key={i} className={`p-5 flex items-center justify-between hover:bg-indigo-50/50 transition-colors cursor-pointer gap-2 ${
                                i !== mockMovers.length - 1 ? 'border-b border-indigo-50/50' : ''
                            }`}>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="font-black text-indigo-950">{mover.symbol}</div>
                                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${mover.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {mover.change}
                                        </span>
                                    </div>
                                    <div className="text-[10px] text-indigo-900/40 font-black uppercase tracking-widest truncate">{mover.company}</div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-black text-indigo-950">{mover.price}</div>
                                    <div className="text-[10px] text-indigo-900/30 font-black uppercase tracking-widest">Vol {mover.volume}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200">
                        <div className="flex items-center gap-3 mb-4 opacity-80">
                            <FiActivity className="text-2xl" />
                            <span className="font-bold tracking-widest uppercase text-xs">Market Sentiment</span>
                        </div>
                        <div className="text-2xl font-black mb-1">Cautiously Bullish</div>
                        <p className="text-xs opacity-80 leading-relaxed">Driven by tech sector earnings and steady interest rates across global markets.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketAnalysis;
