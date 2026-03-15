import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCommodities, refreshCommodities } from '../utils/commodityData';
import { FiTrendingUp, FiTrendingDown, FiSearch, FiActivity, FiGlobe, FiRefreshCw } from 'react-icons/fi';

const Commodities: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currency, setCurrency] = useState<'INR' | 'USD'>(() => {
        return (localStorage.getItem('wealthharbor_currency') as 'INR' | 'USD') || 'INR';
    });

    const handleCurrencyChange = (newCurrency: 'INR' | 'USD') => {
        setCurrency(newCurrency);
        localStorage.setItem('wealthharbor_currency', newCurrency);
    };

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [commodities, setCommodities] = useState(() => getAllCommodities());

    const handleRefresh = () => {
        setCommodities(refreshCommodities());
    };

    const categories = ['All', 'Metals', 'Energy', 'Utilities'];
    const USD_CONVERSION = 0.012; // 1 INR = 0.012 USD

    const filteredCommodities = useMemo(() => {
        return commodities.filter(c => {
            if (c.name.toLowerCase().includes('gold') || c.name.toLowerCase().includes('silver')) return false;
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
        const [width, setWidth] = useState(window.innerWidth < 640 ? 80 : 120);
        const height = 30;

        React.useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth < 380 ? 60 : window.innerWidth < 640 ? 80 : 120);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const points = history.map((h, i) => {
            const x = (i / (history.length - 1)) * width;
            const y = height - ((h.price - min) / (range || 1)) * height;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="overflow-visible">
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                />
            </svg>
        );
    };

    return (
        <div className="p-4 md:p-8 pb-24 lg:pb-32 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-indigo-950 mb-2 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                            <FiGlobe className="text-3xl" />
                        </div>
                        Commodities Market
                    </h1>
                    <p className="text-indigo-900/60 font-medium tracking-tight">Monitor global energy, metals, and utility markets</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 p-1 rounded-xl flex items-center gap-1 border border-indigo-100">
                        <button
                            onClick={() => handleCurrencyChange('INR')}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest ${currency === 'INR' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                        >
                            INR (₹)
                        </button>
                        <button
                            onClick={() => handleCurrencyChange('USD')}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest ${currency === 'USD' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                        >
                            USD ($)
                        </button>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-50 text-indigo-600 font-bold rounded-2xl hover:border-indigo-500 hover:text-indigo-800 transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <FiRefreshCw className="text-xl" />
                        <span className="hidden sm:inline">Refresh Data</span>
                    </button>
                </div>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 group">
                {/* Search Bar */}
                <div className="lg:col-span-3 relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search commodities (e.g. Oil, Copper)..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                    <select
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Commodity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredCommodities.length > 0 ? (
                    filteredCommodities.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 group relative flex flex-col justify-between overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                                <FiGlobe className="text-8xl" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg tracking-widest uppercase shadow-sm">
                                                {item.symbol}
                                            </span>
                                            <span className="text-[10px] font-bold text-indigo-900/40 uppercase tracking-widest">{item.category}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-indigo-950 leading-tight">{item.name}</h3>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className={`flex items-center justify-end gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${item.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                            } mb-1`}>
                                            {item.change >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                            {Math.abs(item.changePercent)}%
                                        </div>
                                        <span className="text-2xl font-black text-indigo-950 tabular-nums">
                                            {formatPrice(item.currentPrice)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6 flex items-center justify-center py-2">
                                    <Sparkline history={item.history} color={item.change >= 0 ? '#10B981' : '#F43F5E'} />
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 mb-6 font-medium">
                                    <div className="min-w-0">
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1 truncate">24h Vol ({item.unit})</p>
                                        <p className="text-sm text-indigo-950 font-bold truncate">{item.currentVolume.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right min-w-0">
                                        <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-1 truncate">Day Range</p>
                                        <p className="text-sm text-indigo-950 font-bold truncate">{item.dayLow} - {item.dayHigh}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/commodities/${item.id}`)}
                                className="relative z-10 w-full py-4 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-100/50 flex items-center justify-center uppercase tracking-widest"
                            >
                                Analyze Now
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No commodities found</h3>
                        <p className="text-indigo-900/30">Try adjusting your search or category filters</p>
                    </div>
                )}
            </div>

            {/* Footer Disclaimer */}
            <div className="mt-12 p-8 bg-indigo-950 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl scale-150 group-hover:scale-175 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">⚠️</div>
                    <div>
                        <h4 className="text-xl font-black mb-1">Market Risk Disclosure</h4>
                        <p className="text-indigo-200/60 font-medium text-xs leading-relaxed max-w-4xl">
                            Commodity futures and spot prices are subject to high volatility. The data shown is for informational purposes only.
                            Always consult with a financial advisor before making investment decisions in the commodities market.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commodities;
