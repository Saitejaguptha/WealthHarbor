import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="h-[50px] bg-white border-t border-indigo-100 flex items-center justify-center px-6 shrink-0 shadow-sm z-50">
            <div className="text-xs md:text-sm font-medium text-indigo-400 italic text-center">
                WealthHarbor &copy; {new Date().getFullYear()} - Your Personal Wealth Intelligence
            </div>
        </footer>
    );
};

export default Footer;
