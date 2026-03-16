import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiBookmark, FiGlobe, FiFileText, FiBell, FiActivity } from 'react-icons/fi';

const BottomNav: React.FC = () => {
    const navItems = [
        { to: "/market-summary", icon: <FiActivity />, label: "Overview" },
        { to: "/watchlist", icon: <FiBookmark />, label: "Watchlist" },
        { to: "/market-analysis", icon: <FiGlobe />, label: "Market" },
        { to: "/stocks-in-news", icon: <FiFileText />, label: "News" },
        { to: "/notifications", icon: <FiBell />, label: "Alerts" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-indigo-100 flex items-center justify-around px-4 py-3 z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:justify-center md:gap-20">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all duration-300 ${
                            isActive 
                                ? 'text-indigo-600 scale-110' 
                                : 'text-indigo-400 hover:text-indigo-500'
                        }`
                    }
                >
                    <span className="text-xl md:text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
