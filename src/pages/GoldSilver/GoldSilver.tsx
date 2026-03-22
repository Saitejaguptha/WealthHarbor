import React, { useState, useMemo, useEffect } from 'react';
import { FiTrendingUp, FiClock, FiInfo, FiLayers } from 'react-icons/fi';
import type { MetalPricePoint, MetalData } from '../../types/metals';
import PageHeader from '../../components/common/PageHeader';
import PageShell from '../../components/layout/PageShell';
import { useAppPreferences } from '../../store/slices/preferencesHooks';
import { MARKET_HOURS, REGULATORY_NOTE } from './goldSilverData';
import { fetchMetalData, calculateAdjustedPrice, formatCurrency } from './goldSilverService';

const GoldSilver: React.FC = () => {
    const [unit, setUnit] = useState<'gram' | 'ounce'>('gram');
    const { currency } = useAppPreferences();
    const [goldData, setGoldData] = useState<MetalData | null>(null);
    const [silverData, setSilverData] = useState<MetalData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMetalData()
            .then(([gold, silver]) => { setGoldData(gold); setSilverData(silver); })
            .finally(() => setIsLoading(false));
    }, []);

    const getPriceFormatted = (price: number) => {
        const adjustedPrice = calculateAdjustedPrice(price, unit, currency);
        return formatCurrency(adjustedPrice, currency);
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
                            <p className="text-lg md:text-2xl font-black text-indigo-950 leading-none">{getPriceFormatted(hoveredPoint.price)}</p>
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
                                {getPriceFormatted(displayPoint.price)}
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
                            <span className="text-xs md:text-lg font-black text-indigo-950 truncate">{getPriceFormatted(displayPoint.price)}</span>
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
        <PageShell className="animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-5 md:space-y-12">
            <PageHeader
                title="Gold & Silver"
                description="Live historical tracking and rates"
            >
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-end w-full">
                    <div className="bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-white flex gap-1 shadow-lg shadow-indigo-100/50 w-full sm:w-auto overflow-x-auto sm:overflow-visible justify-center sm:justify-end">
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => setUnit('gram')}
                                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap ${unit === 'gram' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-indigo-400 hover:bg-white/50 hover:text-indigo-600'}`}
                            >
                                Gram
                            </button>
                            <button
                                type="button"
                                onClick={() => setUnit('ounce')}
                                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap ${unit === 'ounce' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-indigo-400 hover:bg-white/50 hover:text-indigo-600'}`}
                            >
                                Ounce
                            </button>
                        </div>
                    </div>
                </div>
            </PageHeader>

            <div className="space-y-6 md:space-y-12">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                ) : (
                    <>
                        {goldData && <MetalSegment data={goldData} color="#F59E0B" iconColor="bg-amber-500" />}
                        {silverData && <MetalSegment data={silverData} color="#94A3B8" iconColor="bg-slate-500" />}
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-12">
                <div className="p-6 md:p-10 bg-indigo-950 rounded-[2rem] md:rounded-[3rem] text-white shadow-2xl shadow-indigo-200">
                    <h3 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2">
                        <FiInfo className="text-indigo-400" /> Regulatory Note
                    </h3>
                    <p className="text-indigo-200/60 leading-relaxed font-medium text-xs md:text-sm">
                        {REGULATORY_NOTE}
                    </p>
                </div>
                <div className="p-6 md:p-10 bg-white border border-indigo-50 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-indigo-100/30">
                    <h3 className="text-xl md:text-2xl font-black text-indigo-950 mb-4 flex items-center gap-2">
                        <FiClock className="text-indigo-400" /> Market Hours
                    </h3>
                    <div className="space-y-4">
                        {MARKET_HOURS.map((hour, idx) => (
                            <div key={idx} className={`flex justify-between items-center text-xs md:text-sm ${idx === 0 ? 'border-b border-indigo-50 pb-2' : ''}`}>
                                <span className="font-bold text-indigo-900/40 uppercase tracking-widest">{hour.label}</span>
                                <span className="font-black text-indigo-950">{hour.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default GoldSilver;

