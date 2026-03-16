import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiInfo } from 'react-icons/fi';
import { useAuth } from '../../features/auth/AuthContext';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="h-[60px] bg-white/95 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 border-b border-indigo-100 shadow-sm z-50 fixed top-0 left-0 right-0">
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

            <div className="flex-1 flex justify-center px-2">
                <div className="text-[10px] sm:text-sm font-medium text-indigo-900/60 text-center line-clamp-1">
                    Welcome, <span className="font-bold text-indigo-600 truncate max-w-[60px] sm:max-w-none inline-block align-bottom">{user?.username || 'User'}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `p-1.5 md:p-2 rounded-xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600'}`
                    }
                    title="About Project"
                >
                    <FiInfo className="h-5 w-5 md:h-6 md:w-6" />
                </NavLink>

                <NavLink to="/profile" title="Profile">
                    <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 overflow-hidden shadow-sm hover:ring-2 ring-indigo-300 transition-all cursor-pointer">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'Lucky'}`}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
