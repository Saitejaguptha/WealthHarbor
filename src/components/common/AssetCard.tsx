import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatNumberEnIn } from '../../utils/numberFormat';

interface AssetCardProps {
    id?: string;
    symbol?: string;
    name: string;
    subtitle?: string;
    price: string | number;
    change: string | number;
    changePercent?: boolean;
    isPositive: boolean;
    tags: string[];
    detailsRoute: string;
    analyzeLabel?: string;
    Icon: React.ElementType;
    metrics?: { label: string; value: string | number }[];
}

const AssetCard: React.FC<AssetCardProps> = ({
    symbol,
    name,
    subtitle,
    price,
    change,
    changePercent,
    isPositive,
    tags,
    detailsRoute,
    analyzeLabel = "Analyze Details",
    Icon,
    metrics
}) => {
    return (
        <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 hover-lift transition-luxury group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                <Icon className="text-8xl text-indigo-950" />
            </div>

            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="min-w-0 flex-1">
                        {symbol && (
                            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg mb-2 tracking-widest uppercase">
                                {symbol}
                            </span>
                        )}
                        <h3 className="text-xl font-black text-indigo-950 tracking-tight truncate pr-2 leading-tight">
                            {name}
                        </h3>
                        {subtitle && (
                            <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <div className={`flex flex-col items-end shrink-0 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="text-2xl font-black text-indigo-950">
                            ₹{typeof price === 'number' ? formatNumberEnIn(price) : price}
                        </span>
                        <div className="flex items-center gap-1 text-sm font-bold">
                            {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                            <span>
                                {isPositive && !String(change).startsWith('+') ? '+' : ''}
                                {typeof change === 'number' ? formatNumberEnIn(change) : change}
                                {changePercent && !String(change).endsWith('%') ? '%' : ''}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-indigo-100 text-indigo-900/60 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                {metrics && metrics.length > 0 && (
                    <div className={`grid grid-cols-${metrics.length} gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 mb-6 font-medium`}>
                        {metrics.map((m, idx) => (
                            <div key={idx}>
                                <p className="text-indigo-900/40 text-[8px] font-black uppercase tracking-widest mb-1">{m.label}</p>
                                <p className="text-sm font-bold text-indigo-950 truncate">{m.value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Link
                to={detailsRoute}
                className="relative z-10 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-200"
            >
                {analyzeLabel}
            </Link>
        </div>
    );
};

export default AssetCard;
