import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiTrendingUp,
    FiBriefcase,
    FiPieChart,
    FiDatabase,
    FiLayers
} from 'react-icons/fi';
import { NAV_ITEMS } from '../../../constants/navigation';

const Sidebar: React.FC = () => {
    const getIcon = (name: string) => {
        switch (name) {
            case 'Stocks': return <FiTrendingUp />;
            case 'Mutual Fund': return <FiBriefcase />;
            case 'ETF': return <FiPieChart />;
            case 'Gold & Silver': return <FiLayers />;
            case 'Commodities': return <FiDatabase />;
            default: return null;
        }
    };

    return (
        <aside className="w-64 flex-shrink-0 bg-indigo-50/80 flex flex-col h-full border-r border-indigo-100 hide-scrollbar overflow-y-auto">
            <div className="p-5 border-b border-indigo-100">
                <div className="font-bold text-indigo-900 text-lg tracking-tight uppercase text-xs opacity-50 mb-4 px-2">
                    Market Explorer
                </div>
                <div className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 translate-x-1'
                                    : 'text-indigo-900/70 hover:bg-white hover:text-indigo-900 hover:translate-x-1'
                                }`
                            }
                        >
                            <span className="text-lg opacity-80">{getIcon(item.name)}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;
