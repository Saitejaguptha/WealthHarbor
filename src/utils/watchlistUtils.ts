export type WatchlistItem = {
    id: string;
    name: string;
    symbol: string;
    type: 'stock' | 'mutual-fund' | 'etf' | 'commodity';
    price?: number | string;
    change?: number;
    changePercent?: number;
};

const WATCHLIST_KEY = 'wealthharbor_watchlist';

export const getWatchlist = (): WatchlistItem[] => {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
};

export const addToWatchlist = (item: WatchlistItem) => {
    const watchlist = getWatchlist();
    if (!watchlist.find(i => i.id === item.id)) {
        watchlist.push(item);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    }
};

export const removeFromWatchlist = (id: string) => {
    const watchlist = getWatchlist();
    const updated = watchlist.filter(i => i.id !== id);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
};

export const isInWatchlist = (id: string): boolean => {
    const watchlist = getWatchlist();
    return !!watchlist.find(i => i.id === id);
};
