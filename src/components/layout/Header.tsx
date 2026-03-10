import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="h-[60px] bg-white flex items-center justify-between px-4 md:px-6 border-b border-indigo-100 shrink-0 shadow-sm z-50 sticky top-0">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 hover:bg-indigo-50 rounded-lg text-indigo-600 md:hidden transition-colors"
                    aria-label="Open menu"
                >
                    <FiMenu className="h-6 w-6" />
                </button>
                <Link to="/" className="text-lg md:text-xl font-bold text-indigo-900 tracking-tight hover:text-indigo-600 transition-colors">
                    WealthHarbor
                </Link>
            </div>

            <div className="flex-1 flex justify-center">
                <div className="text-sm md:text-base font-medium text-indigo-900/60 hidden sm:block">
                    Welcome back, <span className="font-bold text-indigo-600">User!</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
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
