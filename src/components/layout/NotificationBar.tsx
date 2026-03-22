import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { useAuth } from '../../features/auth/authHooks';
import { getNotifications } from '../../utils/watchlistUtils';

const NotificationBar: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const { user } = useAuth();

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

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NavLink
            to="/notifications"
            className={({ isActive }) =>
                `p-2 rounded-xl transition-all relative ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600'}`
            }
            title="Notifications"
        >
            <FiBell className="h-5 w-5 md:h-6 md:w-6" />
            {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-white"></span>
                </span>
            )}
        </NavLink>
    );
};

export default NotificationBar;
