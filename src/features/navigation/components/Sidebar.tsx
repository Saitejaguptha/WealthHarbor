import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiTrendingUp,
    FiBriefcase,
    FiPieChart,
    FiDatabase,
    FiLayers,
    FiActivity,
    FiX
} from 'react-icons/fi';
import { NAV_ITEMS } from '../../../constants/navigation';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const getIcon = (name: string) => {
        switch (name) {
            case 'Stocks': return <FiTrendingUp />;
            case 'Indices': return <FiActivity />;
            case 'Mutual Fund': return <FiBriefcase />;
            case 'ETF': return <FiPieChart />;
            case 'Gold & Silver': return <FiLayers />;
            case 'Commodities': return <FiDatabase />;
            default: return null;
        }
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-indigo-900/20 backdrop-blur-sm z-[60] md:hidden transition-opacity cursor-pointer"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-indigo-50/95 backdrop-blur-md flex flex-col h-full border-r border-indigo-100 z-[70] transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:bg-indigo-50/80
                ${isOpen ? 'translate-x-0 shadow-2xl shadow-indigo-900/10' : '-translate-x-full md:flex-shrink-0 hide-scrollbar overflow-y-auto'}
            `}>
                <div className="p-5 border-b border-indigo-100 flex items-center justify-between">
                    <div className="font-bold text-indigo-900 text-lg tracking-tight uppercase text-xs opacity-50 px-2">
                        Market Explorer
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 md:hidden text-indigo-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-5 pt-0 mt-4 h-full overflow-y-auto hide-scrollbar">
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth < 768) onClose();
                                }}
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
        </>
    );
};

export default Sidebar;
