import React from 'react';
import { FiCalendar } from 'react-icons/fi';

interface MonthYearSelectorProps {
    selectedMonth: number;
    selectedYear: number;
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
    className?: string;
}

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
    className = ""
}) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    return (
        <div className={`flex items-center gap-1 md:gap-2 bg-white/70 backdrop-blur-md p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-white flex gap-1 shadow-lg shadow-indigo-100/50 ${className}`}>
            <div className="hidden sm:flex items-center gap-2 px-2 md:px-3 text-indigo-400">
                <FiCalendar className="w-3 h-3 md:w-4 h-4" />
            </div>
            
            <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(Number(e.target.value))}
                className="bg-white border border-indigo-50 text-[10px] md:text-sm font-bold text-indigo-900 rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer appearance-none shadow-sm hover:shadow-md transition-all uppercase tracking-wider"
            >
                {months.map((month, index) => (
                    <option key={month} value={index}>
                        {month.substring(0, 3)}
                    </option>
                ))}
            </select>

            <select
                value={selectedYear}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="bg-white border border-indigo-50 text-[10px] md:text-sm font-bold text-indigo-900 rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer appearance-none shadow-sm hover:shadow-md transition-all uppercase tracking-wider"
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MonthYearSelector;
