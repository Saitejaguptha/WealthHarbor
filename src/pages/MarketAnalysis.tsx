import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiActivity } from 'react-icons/fi';
import { getNews } from '../utils/newsData';

const MarketAnalysis: React.FC = () => {
    // News Data
    const latestNews = useMemo(() => getNews(), []);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-indigo-950 mb-2 tracking-tight">Market Analysis</h1>
                    <p className="text-indigo-900/60 font-medium">Stay updated with the latest events impacting Indian markets</p>
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

            {/* Latest News Section */}
            <div className="animate-in fade-in duration-1000 slide-in-from-bottom-8">
                <h2 className="text-2xl font-bold text-indigo-950 mb-6 tracking-tight flex items-center gap-2">
                    <FiClock className="text-indigo-600" /> Real-time Coverage
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                <p className="text-sm text-indigo-900/60 leading-relaxed mb-6 line-clamp-2">
                                    {news.summary}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-indigo-50 mt-auto">
                                <span className="text-xs font-bold text-indigo-900/40 uppercase tracking-widest">{news.source}</span>
                                <span className="flex items-center gap-1 text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                                    Read Full Article <FiArrowRight />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketAnalysis;
