import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiTrendingDown, FiTrash2, FiArrowRight, FiBookmark, FiActivity } from 'react-icons/fi';
import { getWatchlist, removeFromWatchlist, type WatchlistItem } from '../utils/watchlistUtils';
import { useAuth } from '../features/auth/AuthContext';

const Watchlist: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

    const userEmail = user?.email || '';

    useEffect(() => {
        if (userEmail) {
            setWatchlist(getWatchlist(userEmail));
        }
    }, [userEmail]);

    const handleRemove = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (userEmail) {
            removeFromWatchlist(userEmail, id);
            setWatchlist(getWatchlist(userEmail));
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'stock': return 'bg-indigo-600';
            case 'mutual-fund': return 'bg-emerald-600';
            case 'etf': return 'bg-amber-600';
            case 'commodity': return 'bg-rose-600';
            default: return 'bg-gray-600';
        }
    };

    const getNavigationPath = (item: WatchlistItem) => {
        switch (item.type) {
            case 'stock': return `/stocks/${item.symbol}`;
            case 'mutual-fund': return `/mutual-funds/${item.id}`;
            case 'etf': return `/etfs/${item.id}`;
            case 'commodity': return `/commodities/${item.id}`;
            default: return '/';
        }
    };

    if (watchlist.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-10 animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-400 text-4xl mb-6 shadow-inner">
                    <FiBookmark />
                </div>
                <h2 className="text-2xl font-black text-indigo-950 mb-2 uppercase tracking-tight">Your Watchlist is Empty</h2>
                <p className="text-indigo-900/40 font-medium mb-8 text-center max-w-md">
                    Start exploring stocks, mutual funds, and commodities to build your personalized watchlist.
                </p>
                <button
                    onClick={() => navigate('/stocks')}
                    className="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 uppercase tracking-widest text-sm"
                >
                    Explore Markets
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
                    <FiBookmark className="text-2xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-indigo-950 tracking-tight">My Watchlist</h1>
                    <p className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest">
                        {watchlist.length} {watchlist.length === 1 ? 'Asset' : 'Assets'} Tracked
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {watchlist.map((item: WatchlistItem) => (
                    <div
                        key={item.id}
                        onClick={() => navigate(getNavigationPath(item))}
                        className="bg-white/70 backdrop-blur-xl border border-indigo-50 p-6 rounded-[2rem] shadow-xl shadow-indigo-100/20 hover:shadow-2xl hover:shadow-indigo-300/40 hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <FiActivity className="text-8xl text-indigo-950" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`px-2 py-0.5 ${getTypeColor(item.type)} text-white text-[9px] font-black rounded uppercase tracking-widest mb-2 inline-block`}>
                                        {item.type.replace('-', ' ')}
                                    </span>
                                    <h3 className="text-xl font-black text-indigo-950 truncate max-w-[180px]">{item.name}</h3>
                                    <p className="text-indigo-900/40 text-xs font-black uppercase tracking-widest">{item.symbol}</p>
                                </div>
                                <button
                                    onClick={(e) => handleRemove(e, item.id)}
                                    className="p-2 text-rose-300 hover:text-white hover:bg-rose-500 rounded-lg hover:shadow-md hover:shadow-rose-500/30 transition-all active:scale-90"
                                    title="Remove from Watchlist"
                                >
                                    <FiTrash2 className="transition-transform group-hover/btn:scale-110" />
                                </button>
                            </div>

                            <div className="flex items-end justify-between mt-6">
                                <div>
                                    <p className="text-indigo-900/40 text-[9px] font-black uppercase tracking-widest mb-0.5">Price</p>
                                    <span className="text-2xl font-black text-indigo-950">{typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : item.price}</span>
                                </div>
                                {item.changePercent !== undefined && (
                                    <div className={`flex items-center gap-1 font-bold text-sm ${item.changePercent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {item.changePercent >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                        {Math.abs(item.changePercent)}%
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-indigo-50 flex items-center justify-end text-indigo-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 group-hover:text-indigo-700 transition-all">
                                View Details <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Watchlist;
