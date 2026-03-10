import React, { useState, useMemo } from 'react';
import { FiTrendingUp, FiTrendingDown, FiSearch, FiActivity, FiGlobe } from 'react-icons/fi';
import { getCommodities } from '../utils/commodityData';


const Commodities: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [commodities] = useState(() => getCommodities());

    const categories = ['All', 'Metals', 'Energy', 'Utilities'];
    const USD_CONVERSION = 0.012; // 1 INR = 0.012 USD

    const filteredCommodities = useMemo(() => {
        return commodities.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, commodities]);

    const formatPrice = (price: number) => {
        const adjustedPrice = currency === 'USD' ? price * USD_CONVERSION : price;
        return adjustedPrice.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: currency === 'USD' ? 2 : 0
        });
    };

    const Sparkline = ({ history, color }: { history: any[], color: string }) => {
        const prices = history.map(h => h.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const range = max - min;
        const width = 120;
        const height = 40;

        const points = history.map((h, i) => {
            const x = (i / (history.length - 1)) * width;
            const y = height - ((h.price - min) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="overflow-visible">
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                />
            </svg>
        );
    };

    return (
        <div className="p-4 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-8 md:space-y-12">
            {/* Header Section */}
            <div className="bg-white/40 backdrop-blur-3xl border border-white/50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-indigo-100/30 flex flex-col xl:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                    <FiGlobe className="text-[12rem] text-indigo-950" />
                </div>

                <div className="text-center xl:text-left relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black rounded-full mb-6 tracking-widest uppercase">
                        <FiActivity className="animate-pulse" /> Live Market Feed
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-indigo-950 mb-4 tracking-tighter leading-none">
                        Commodities <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Hub</span>
                    </h1>
                    <p className="text-indigo-900/60 font-medium text-lg max-w-xl">
                        Monitor global energy, metals, and utility markets with real-time price tracking and volume analysis.
                    </p>
                </div>

                <div className="flex flex-col items-center xl:items-end gap-6 relative z-10 w-full xl:w-auto">
                    <div className="bg-indigo-50 p-1.5 rounded-2xl flex items-center gap-1">
                        <button
                            onClick={() => setCurrency('INR')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${currency === 'INR' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                        >
                            INR (₹)
                        </button>
                        <button
                            onClick={() => setCurrency('USD')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${currency === 'USD' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                        >
                            USD ($)
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-white/80 p-6 rounded-3xl border border-indigo-50 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-900/40 block mb-1">Global Volume</span>
                            <span className="text-xl font-black text-indigo-950 font-mono">
                                {currency === 'INR' ? '₹1.24T' : '$14.9B'}
                            </span>
                        </div>
                        <div className="bg-white/80 p-6 rounded-3xl border border-indigo-50 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-900/40 block mb-1">Market Sentiment</span>
                            <span className="text-xl font-black text-emerald-600 font-mono">BULLISH</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-6 z-40">
                <div className="relative w-full md:w-96 group">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search commodities (e.g. Oil, Gas)..."
                        className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-xl border-2 border-white rounded-2xl focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 outline-none transition-all duration-300 shadow-xl shadow-indigo-100/20 text-indigo-950 font-semibold placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-xl shadow-indigo-100/20 overflow-x-auto no-scrollbar max-w-full">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-widest whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 shadow-offset-y-2'
                                : 'text-indigo-900/40 hover:text-indigo-600 hover:bg-indigo-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Commodity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCommodities.length > 0 ? (
                    filteredCommodities.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 group relative flex flex-col justify-between min-h-[320px] overflow-hidden"
                        >
                            <div className="absolute -top-4 -right-4 w-40 h-40 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100/50 transition-colors" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/50"
                                            style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-2xl font-black text-indigo-950 tracking-tight">{item.name}</h3>
                                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-400 text-[10px] font-black rounded-md border border-indigo-100/50">
                                                    {item.symbol}
                                                </span>
                                            </div>
                                            <p className="text-indigo-900/40 text-xs font-black uppercase tracking-widest">
                                                {item.category} Market
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <Sparkline history={item.history} color={item.change >= 0 ? '#10B981' : '#F43F5E'} />
                                    </div>
                                </div>

                                <div className="flex items-end justify-between mb-8">
                                    <div>
                                        <span className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest block mb-1">Last Traded Price</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-indigo-950 tabular-nums">
                                                {formatPrice(item.currentPrice)}
                                            </span>
                                            <span className={`flex items-center gap-1 text-sm font-black px-2 py-1 rounded-xl ${item.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                                }`}>
                                                {item.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                                {Math.abs(item.changePercent)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-4 pt-6 border-t border-indigo-50/50">
                                <div>
                                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block mb-0.5">24h Vol ({item.unit})</span>
                                    <span className="text-sm font-black text-indigo-900/70">{item.currentVolume.toLocaleString()}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block mb-0.5">Day Range</span>
                                    <span className="text-sm font-black text-indigo-900/70">{item.dayLow} - {item.dayHigh}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center bg-white/40 backdrop-blur-xl border border-white rounded-[3rem]">
                        <div className="text-8xl mb-6 opacity-10">📦</div>
                        <h3 className="text-2xl font-black text-indigo-950/40 uppercase tracking-widest">Market Data Not Found</h3>
                        <p className="text-indigo-900/30 font-medium">Try broadening your search or switching categories</p>
                    </div>
                )}
            </div>

            {/* Footer Disclaimer */}
            <div className="p-8 bg-indigo-950 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl scale-150 group-hover:scale-175 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">⚠️</div>
                    <div>
                        <h4 className="text-xl font-black mb-1">Market Risk Disclosure</h4>
                        <p className="text-indigo-200/60 font-medium text-sm leading-relaxed max-w-4xl">
                            Commodity futures and spot prices are subject to high volatility due to geopolitical events, weather, and supply chain shifts.
                            The data shown is for informational purposes only and may be delayed by up to 15 minutes. Always consult with a financial advisor
                            before making investment decisions in the commodities market.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commodities;
