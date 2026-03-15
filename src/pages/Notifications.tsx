import React, { useState, useEffect } from 'react';
import { FiBell, FiTrash2, FiCheckCircle, FiInfo, FiClock } from 'react-icons/fi';
import { useAuth } from '../features/auth/AuthContext';
import { getNotifications, markNotificationsAsRead } from '../utils/watchlistUtils';
import PageHeader from '../components/common/PageHeader';

const Notifications: React.FC = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<any[]>([]);
    const userEmail = user?.email || '';

    const loadNotifications = () => {
        if (userEmail) {
            setNotifications(getNotifications(userEmail));
        }
    };

    useEffect(() => {
        loadNotifications();
        const handleUpdate = () => loadNotifications();
        window.addEventListener('wealthharbor_notifications_updated', handleUpdate);
        return () => window.removeEventListener('wealthharbor_notifications_updated', handleUpdate);
    }, [userEmail]);

    const handleMarkAllRead = () => {
        if (userEmail) {
            markNotificationsAsRead(userEmail);
        }
    };

    const handleClearAll = () => {
        if (userEmail && window.confirm('Are you sure you want to clear all notifications?')) {
            localStorage.removeItem(`wealthharbor_notifications_${userEmail}`);
            loadNotifications();
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="Notifications"
                description="Stay updated with your latest activities and alerts"
                onRefresh={loadNotifications}
                refreshLabel="Refresh Alerts"
            >
                <div className="flex gap-4">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-100 transition-all active:scale-95 flex items-center gap-2 text-sm"
                        >
                            <FiCheckCircle /> Mark All Read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="px-6 py-3 bg-rose-50 text-rose-500 rounded-2xl font-bold hover:bg-rose-100 transition-all active:scale-95 flex items-center gap-2 text-sm"
                        >
                            <FiTrash2 /> Clear All
                        </button>
                    )}
                </div>
            </PageHeader>

            <div className="space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-6 rounded-[2rem] border transition-all flex gap-4 ${
                                notif.read 
                                    ? 'bg-white/50 border-indigo-50/50 grayscale-[0.5] opacity-80' 
                                    : 'bg-white border-white shadow-xl shadow-indigo-100/30'
                            }`}
                        >
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                notif.read ? 'bg-indigo-50 text-indigo-300' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                            }`}>
                                <FiInfo size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <p className={`text-base leading-relaxed ${notif.read ? 'text-indigo-900/60 font-medium' : 'text-indigo-950 font-bold'}`}>
                                        {notif.message}
                                    </p>
                                    {!notif.read && (
                                        <div className="h-2 w-2 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] shrink-0 mt-2" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-indigo-900/40 text-[10px] font-black uppercase tracking-widest">
                                    <FiClock />
                                    <span>{new Date(notif.timestamp).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-32 text-center bg-white/30 backdrop-blur-sm rounded-[3rem] border border-white/50">
                        <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiBell size={48} />
                        </div>
                        <h3 className="text-xl font-black text-indigo-950/40 uppercase tracking-widest">Inbox Zero</h3>
                        <p className="text-indigo-900/30 font-medium mt-2">You don't have any notifications at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
