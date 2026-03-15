import React, { useState } from 'react';
import { FiSearch, FiFileText, FiClock, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../utils/newsData';
import PageHeader from '../components/common/PageHeader';

const StocksInNews: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const newsItems = getNews().map(news => ({
        id: news.id,
        title: news.title,
        description: news.summary,
        time: new Date(news.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: news.category,
        impact: news.impact || 'Neutral',
        symbol: news.source.split(' ')[0].toUpperCase() // Using source first word as placeholder symbol
    }));

    const filteredNews = newsItems.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="Stocks in News"
                description="Latest market-moving headlines and corporate developments"
                onRefresh={() => {}}
                refreshLabel="Refresh News"
            >
                <div className="relative group max-w-2xl">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search news by stock or keyword..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                        <div 
                            key={news.id} 
                            className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100/30 hover:shadow-2xl hover:shadow-indigo-200/40 transition-all duration-500 group flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                                        <FiFileText size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">{news.category}</span>
                                </div>
                                <div className="flex items-center gap-1 text-indigo-900/30 text-[10px] font-bold">
                                    <FiClock />
                                    <span>{news.time}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-black tracking-tighter shadow-sm border border-indigo-100/50">
                                        {news.symbol}
                                    </span>
                                    <div className={`text-[9px] font-black px-2 py-0.5 rounded shadow-sm border ${
                                        news.impact.includes('Positive') 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : 'bg-indigo-50 text-indigo-400 border-indigo-100'
                                    }`}>
                                        Impact: {news.impact}
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-indigo-950 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-2">
                                    {news.title}
                                </h3>
                            </div>

                            <p className="text-indigo-900/60 text-sm font-medium mb-6 line-clamp-3 leading-relaxed flex-1">
                                {news.description}
                            </p>

                            <button 
                                onClick={() => navigate(`/news/${news.id}`)}
                                className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all group/btn"
                            >
                                Read Full Story <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">📰</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No matching news</h3>
                        <p className="text-indigo-900/30">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StocksInNews;
