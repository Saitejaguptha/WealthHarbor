import React, { useState } from 'react';
import { FiSearch, FiFileText, FiClock, FiArrowRight } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';

const StocksInNews: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const newsItems = [
        {
            id: 1,
            title: "Reliance Invested in Ambuja Cement",
            description: "Reliance Industries has announced a strategic investment in Ambuja Cement to bolster its presence in the construction materials sector.",
            time: "2 hours ago",
            category: "Acquisition",
            impact: "Positive",
            symbol: "RELIANCE"
        },
        {
            id: 2,
            title: "TATA Motors Q3 Results",
            description: "TATA Motors reported a significant surge in quarterly profits, driven by strong sales in the electric vehicle segment.",
            time: "4 hours ago",
            category: "Earnings",
            impact: "Very Positive",
            symbol: "TATAMOTORS"
        },
        {
            id: 3,
            title: "HDFC Bank Expansion Plans",
            description: "HDFC Bank unveils plans to open 500 new branches across rural India to increase its retail footprint.",
            time: "6 hours ago",
            category: "Expansion",
            impact: "Neutral",
            symbol: "HDFCBANK"
        },
        {
            id: 4,
            title: "Infosys Secures Multi-Million Dollar Deal",
            description: "Infosys has bagged a major digital transformation contract from a leading European telecommunications provider.",
            time: "8 hours ago",
            category: "Deal",
            impact: "Positive",
            symbol: "INFY"
        },
        {
            id: 5,
            title: "Adani Enterprises Debt Reduction",
            description: "Adani Enterprises shares rise as the group continues its aggressive debt reduction strategy ahead of schedule.",
            time: "10 hours ago",
            category: "Financials",
            impact: "Positive",
            symbol: "ADANIENT"
        },
        {
            id: 6,
            title: "Zomato Acquires Quick Commerce Startup",
            description: "Zomato strengthens its Blinkit division by acquiring a specialized logistics startup for faster deliveries.",
            time: "12 hours ago",
            category: "M&A",
            impact: "Positive",
            symbol: "ZOMATO"
        }
    ];

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

                            <button className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all group/btn">
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
