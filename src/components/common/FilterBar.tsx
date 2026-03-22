import React from 'react';
import { FiSearch, FiLayers } from 'react-icons/fi';

export interface FilterOption {
    label: string;
    value: string;
    icon?: React.ReactNode;
    options: string[];
}

interface FilterBarProps {
    title?: string;
    description?: string;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filters: FilterOption[];
    onFilterChange: (label: string, value: string) => void;
    currentFilters: Record<string, string>;
    onRefresh?: () => void;
    refreshLabel?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Search...",
    filters,
    onFilterChange,
    currentFilters,
}) => {
    return (
        <div className="flex flex-col xl:flex-row gap-4 w-full">
            {/* Search Bar */}
            <div className="relative group flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-md hover:shadow-lg text-indigo-950 font-medium placeholder:text-indigo-300"
                />
            </div>

            {/* Filters Container */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
                {filters.map((filter) => (
                    <div key={filter.label} className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                            {filter.icon || <FiLayers />}
                        </span>
                        <select
                            className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                            value={currentFilters[filter.label] || 'All'}
                            onChange={(e) => onFilterChange(filter.label, e.target.value)}
                        >
                            <option value="All">{filter.label}</option>
                            {filter.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span className="text-indigo-300">▼</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
