import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

const Header: React.FC = () => {
    return (
        <header className="h-[60px] bg-white flex items-center justify-between px-4 md:px-6 border-b border-indigo-100 shrink-0 shadow-sm z-50 sticky top-0">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-lg md:text-xl font-bold text-indigo-900 tracking-tight hover:text-indigo-600 transition-colors">
                    WealthHarbor
                </Link>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="text-sm md:text-base font-medium text-indigo-900/60">
                    Welcome back, <span className="font-bold text-indigo-600">User!</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `p-2 rounded-full transition-colors ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-indigo-50 text-indigo-400'}`
                    }
                >
                    <FiSettings className="h-5 w-5" />
                </NavLink>
                <div className="flex items-center gap-3 pl-2 border-l border-indigo-100">
                    <NavLink to="/profile">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 overflow-hidden shadow-sm hover:ring-2 ring-indigo-300 transition-all cursor-pointer">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
