import React, { useState, useMemo } from 'react';
import { FiTrendingUp, FiClock, FiInfo, FiLayers } from 'react-icons/fi';
import { getGoldData, getSilverData } from '../utils/metalData';
import type { MetalPricePoint, MetalData } from '../types/metals';

const GoldSilver: React.FC = () => {
    const [unit, setUnit] = useState<'gram' | 'ounce'>('gram');
    const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
    const goldData = useMemo(() => getGoldData(), []);
    const silverData = useMemo(() => getSilverData(), []);

    const OUNCE_CONVERSION = 31.1035;
    const USD_CONVERSION = 0.012;

    const formatPrice = (price: number) => {
        let adjustedPrice = unit === 'ounce' ? price * OUNCE_CONVERSION : price;

        if (currency === 'USD') {
            adjustedPrice = adjustedPrice * USD_CONVERSION;
        }

        return adjustedPrice.toLocaleString('en-IN', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: currency === 'USD' ? 2 : 0
        });
    };

    const InteractiveChart = ({
        history,
        color
    }: {
        history: MetalPricePoint[],
        color: string
    }) => {
        const prices = history.map(h => h.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const range = max - min;
        const VIEW_WIDTH = 800;
        const VIEW_HEIGHT = 200;
        const PADDING = 20;

        const [hoveredPoint, setHoveredPoint] = useState<MetalPricePoint | null>(null);
        const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

        const points = useMemo(() => {
            return history.map((h, i) => {
                const x = (i / (history.length - 1)) * (VIEW_WIDTH - 2 * PADDING) + PADDING;
                const y = VIEW_HEIGHT - PADDING - ((h.price - min) / (range || 1)) * (VIEW_HEIGHT - 2 * PADDING);
                return `${x},${y}`;
            }).join(' ');
        }, [history, min, range]);

        const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
            const svg = e.currentTarget;
            const rect = svg.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * VIEW_WIDTH;

            const index = Math.round(((x - PADDING) / (VIEW_WIDTH - 2 * PADDING)) * (history.length - 1));
            if (index >= 0 && index < history.length) {
                setHoveredPoint(history[index]);
                const pointX = (index / (history.length - 1)) * (VIEW_WIDTH - 2 * PADDING) + PADDING;
                setMousePos({ x: pointX, y: 0 });
            }
        };

        return (
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex justify-between items-end px-2">
                    <div className="text-[9px] font-black uppercase tracking-widest text-indigo-900/20">30D PERFORMANCE HISTORICAL CHANNEL</div>
                    {hoveredPoint && (
                        <div className="text-right">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">{hoveredPoint.date}</p>
                            <p className="text-lg md:text-2xl font-black text-indigo-950 leading-none">{formatPrice(hoveredPoint.price)}</p>
                        </div>
                    )}
                </div>

                <div className="relative w-full h-[180px] md:h-[250px] bg-indigo-50/20 rounded-[2rem] p-4 border border-indigo-50 overflow-hidden group/chart">
                    <svg
                        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                        className="w-full h-full cursor-crosshair"
                        preserveAspectRatio="none"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoveredPoint(null)}
                        onTouchMove={(e) => {
                            const touch = e.touches[0];
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((touch.clientX - rect.left) / rect.width) * VIEW_WIDTH;
                            const index = Math.round(((x - PADDING) / (VIEW_WIDTH - 2 * PADDING)) * (history.length - 1));
                            if (index >= 0 && index < history.length) {
                                setHoveredPoint(history[index]);
                                const pointX = (index / (history.length - 1)) * (VIEW_WIDTH - 2 * PADDING) + PADDING;
                                setMousePos({ x: pointX, y: 0 });
                            }
                        }}
                        onTouchEnd={() => setHoveredPoint(null)}
                    >
                        <defs>
                            <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={color} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d={`M ${PADDING},${VIEW_HEIGHT} L ${points} L ${VIEW_WIDTH - PADDING},${VIEW_HEIGHT} Z`}
                            fill={`url(#grad-${color.replace('#', '')})`}
                        />
                        <polyline
                            points={points}
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {hoveredPoint && (
                            <>
                                <line
                                    x1={mousePos.x}
                                    y1={0}
                                    x2={mousePos.x}
                                    y2={VIEW_HEIGHT}
                                    stroke={color}
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                />
                                <circle
                                    cx={mousePos.x}
                                    cy={VIEW_HEIGHT - PADDING - ((hoveredPoint.price - min) / (range || 1)) * (VIEW_HEIGHT - 2 * PADDING)}
                                    r="6"
                                    fill={color}
                                    stroke="white"
                                    strokeWidth="3"
                                />
                            </>
                        )}
                    </svg>
                </div>
            </div>
        );
    };

    const MetalSegment = ({
        data,
        color,
        iconColor
    }: {
        data: MetalData,
        color: string,
        iconColor: string
    }) => {
        const displayPoint = data.history[data.history.length - 1];

        return (
            <div className="bg-white/80 backdrop-blur-2xl border border-white p-4 md:p-10 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl shadow-indigo-100/50 hover:shadow-indigo-200/50 transition-all duration-700 group overflow-hidden">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 md:gap-8 mb-4 md:mb-10 pb-4 md:pb-8 border-b border-indigo-50">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className={`p-2 md:p-4 ${iconColor} rounded-lg md:rounded-[1.5rem] text-white shadow-2xl group-hover:scale-110 transition-transform shrink-0`}>
                                <FiLayers className="text-lg md:text-3xl" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg md:text-4xl font-black text-indigo-950 tracking-tighter truncate">{data.name} Analysis</h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start w-full lg:w-auto gap-2">
                        <div>
                            <p className="text-indigo-900/40 text-[7px] md:text-[10px] font-black uppercase tracking-widest mb-0.5">
                                Market Price ({unit})
                            </p>
                            <span className="text-xl md:text-5xl font-black text-indigo-950 tabular-nums">
                                {formatPrice(displayPoint.price)}
                            </span>
                        </div>
                        <span className="px-1.5 py-0.5 md:px-3 md:py-1 bg-emerald-50 text-emerald-600 text-[9px] md:text-xs font-black rounded-md md:rounded-xl flex items-center gap-1 shrink-0">
                            <FiTrendingUp className="text-[10px]" /> 1.2%
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between px-3 py-3 md:px-6 bg-indigo-50/30 rounded-lg md:rounded-2xl mb-1 text-indigo-900/60 font-medium border border-white/50 gap-2 md:gap-4 overflow-hidden">
                    <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8 min-w-0">
                        <div className="min-w-0">
                            <span className="text-[7px] md:text-[9px] font-black uppercase block tracking-widest opacity-40">Live Rate</span>
                            <span className="text-xs md:text-lg font-black text-indigo-950 truncate">{formatPrice(displayPoint.price)}</span>
                        </div>
                        <div className="h-6 md:h-8 w-px bg-indigo-100 hidden md:block shrink-0" />
                        <div className="hidden sm:block min-w-0">
                            <span className="text-[7px] md:text-[9px] font-black uppercase block tracking-widest opacity-40">Tax (est.)</span>
                            <span className="text-xs md:text-lg font-black text-indigo-950 truncate">3% GST</span>
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-indigo-50 pt-2 md:pt-0 shrink-0">
                        <span className="text-[7px] md:text-[10px] font-black text-indigo-600 uppercase tracking-widest">Market Open</span>
                        <span className="hidden md:inline text-[7px] md:text-[9px] font-bold opacity-40 ml-2 md:ml-0">Updated: 1m</span>
                    </div>
                </div>

                <InteractiveChart
                    history={data.history}
                    color={color}
                />
            </div>
        );
    };

    return (
        <div className="p-3 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-5 md:space-y-12">
            <div className="bg-white/40 backdrop-blur-xl border border-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] shadow-xl shadow-indigo-100/30 flex flex-col xl:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="text-center xl:text-left">
                    <h1 className="text-3xl md:text-6xl font-black text-indigo-950 mb-1 tracking-tighter">Gold & Silver</h1>
                    <p className="text-indigo-900/60 font-medium text-[11px] md:text-base px-2 xl:px-0">Live historical tracking and rates</p>
                </div>

                <div className="bg-indigo-50 p-1 rounded-xl md:rounded-[1.5rem] flex items-center gap-0.5 md:gap-1 w-full xl:w-auto overflow-x-auto hide-scrollbar sm:overflow-visible">
                    {/* Currency Switcher */}
                    <button
                        onClick={() => setCurrency('INR')}
                        className={`flex-1 px-2 md:px-6 py-2 md:py-3 rounded-[0.75rem] md:rounded-[1.1rem] text-[9px] md:text-sm font-black transition-all uppercase tracking-widest whitespace-nowrap ${currency === 'INR' ? 'bg-white text-indigo-600 shadow-md' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                    >
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency('USD')}
                        className={`flex-1 px-2 md:px-6 py-2 md:py-3 rounded-[0.75rem] md:rounded-[1.1rem] text-[9px] md:text-sm font-black transition-all uppercase tracking-widest whitespace-nowrap ${currency === 'USD' ? 'bg-white text-indigo-600 shadow-md' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                    >
                        USD
                    </button>

                    {/* Divider */}
                    <div className="h-4 md:h-6 w-px bg-indigo-200 mx-1" />

                    {/* Unit Switcher */}
                    <button
                        onClick={() => setUnit('gram')}
                        className={`flex-1 px-2 md:px-6 py-2 md:py-3 rounded-[0.75rem] md:rounded-[1.1rem] text-[9px] md:text-sm font-black transition-all uppercase tracking-widest whitespace-nowrap ${unit === 'gram' ? 'bg-white text-indigo-600 shadow-md' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                    >
                        Gram
                    </button>
                    <button
                        onClick={() => setUnit('ounce')}
                        className={`flex-1 px-2 md:px-6 py-2 md:py-3 rounded-[0.75rem] md:rounded-[1.1rem] text-[9px] md:text-sm font-black transition-all uppercase tracking-widest whitespace-nowrap ${unit === 'ounce' ? 'bg-white text-indigo-600 shadow-md' : 'text-indigo-900/40 hover:text-indigo-900'}`}
                    >
                        Ounce
                    </button>
                </div>
            </div>

            <div className="space-y-6 md:space-y-12">
                <MetalSegment data={goldData} color="#F59E0B" iconColor="bg-amber-500" />
                <MetalSegment data={silverData} color="#94A3B8" iconColor="bg-slate-500" />
            </div>

            {/* Information Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-12">
                <div className="p-6 md:p-10 bg-indigo-950 rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl shadow-indigo-200">
                    <h3 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
                        <FiInfo className="text-indigo-400" /> Regulatory Note
                    </h3>
                    <p className="text-indigo-200/60 leading-relaxed font-medium text-xs md:text-sm">
                        Gold rates displayed are for 24K pure gold. Ounce refers to Troy Ounce ({OUNCE_CONVERSION}g). Rates vary based on local taxes and dealer spreads. These quotes are for information only and not for trading purposes.
                    </p>
                </div>
                <div className="p-6 md:p-10 bg-white border border-indigo-50 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-indigo-100/30">
                    <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-4 flex items-center gap-2">
                        <FiClock className="text-indigo-400" /> Market Hours
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs md:text-sm border-b border-indigo-50 pb-2">
                            <span className="font-bold text-indigo-900/40 uppercase tracking-widest">Global Spot</span>
                            <span className="font-black text-indigo-950">24/5 (Mon-Fri)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs md:text-sm">
                            <span className="font-bold text-indigo-900/40 uppercase tracking-widest">MCX (India)</span>
                            <span className="font-black text-indigo-950">9:00 AM - 11:30 PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoldSilver;
