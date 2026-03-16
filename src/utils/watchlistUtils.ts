import { toast } from 'react-hot-toast';

export type WatchlistItem = {
    id: string;
    name: string;
    symbol: string;
    type: 'stock' | 'mutual-fund' | 'etf' | 'commodity';
    price?: number | string;
    change?: number;
    changePercent?: number;
    email?: string; // Extra email key as requested
};

const getWatchlistKey = (email: string) => `wealthharbor_watchlist_${email}`;

// Exported notification function
export const addNotification = (email: string, message: string) => {
    const key = `wealthharbor_notifications_${email}`;
    const notifications = JSON.parse(localStorage.getItem(key) || '[]');
    notifications.unshift({
        id: Date.now().toString(),
        message,
        timestamp: new Date().toISOString(),
        read: false
    });
    localStorage.setItem(key, JSON.stringify(notifications.slice(0, 50))); // Keep last 50
    
    // Dispatch custom event to notify Header/NotificationBar
    window.dispatchEvent(new Event('wealthharbor_notifications_updated'));
};

export const getWatchlist = (email: string): WatchlistItem[] => {
    if (!email) return [];
    const data = localStorage.getItem(getWatchlistKey(email));
    return data ? JSON.parse(data) : [];
};

export const addToWatchlist = (email: string, item: WatchlistItem) => {
    if (!email) return;
    const watchlist = getWatchlist(email);
    if (!watchlist.find(i => i.id === item.id)) {
        const itemWithEmail = { ...item, email };
        watchlist.push(itemWithEmail);
        localStorage.setItem(getWatchlistKey(email), JSON.stringify(watchlist));
        
        // Add notification
        const message = `Added ${item.name} (${item.symbol}) to your watchlist`;
        addNotification(email, message);
        toast.success(message);
    }
};

export const removeFromWatchlist = (email: string, id: string) => {
    if (!email) return;
    const watchlist = getWatchlist(email);
    const updatedWatchlist = watchlist.filter(item => item.id !== id);
    localStorage.setItem(getWatchlistKey(email), JSON.stringify(updatedWatchlist));
    
    // Add notification for removal
    const item = watchlist.find(i => i.id === id);
    if (item) { // userEmail was not defined, using 'email' parameter
        addNotification(email, `${item.name} (${item.symbol}) has been removed from your watchlist.`);
    }
    
    return true;
};

export const isInWatchlist = (email: string, id: string): boolean => {
    if (!email) return false;
    const watchlist = getWatchlist(email);
    return !!watchlist.find(i => i.id === id);
};

export const getNotifications = (email: string) => {
    if (!email) return [];
    const key = `wealthharbor_notifications_${email}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
};

export const markNotificationsAsRead = (email: string) => {
    if (!email) return;
    const key = `wealthharbor_notifications_${email}`;
    const notifications = getNotifications(email).map((n: any) => ({ ...n, read: true }));
    localStorage.setItem(key, JSON.stringify(notifications));
    window.dispatchEvent(new Event('wealthharbor_notifications_updated'));
};
