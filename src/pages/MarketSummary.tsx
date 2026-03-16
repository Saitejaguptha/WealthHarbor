import React, { useState } from 'react';
import { FiPlay, FiMic, FiTrendingUp, FiCheckCircle, FiVolume2, FiX } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';

const MarketSummary: React.FC = () => {
    const [showAudio, setShowAudio] = useState(false);
    const [showVideo, setShowVideo] = useState(false);

    const highlights = [
        "Nifty 50 reclaimed the 22,000 mark led by IT and Banking sectors.",
        "Foreign Institutional Investors (FIIs) turned net buyers after 3 sessions.",
        "Reliance Industries hit a fresh 52-week high after positive sales data.",
        "Gold prices remain stable near record highs amid global uncertainty.",
        "Midcap indices outperformed the benchmarks with 1.5% gains."
    ];

    return (
        <>
        <div className="h-full flex flex-col p-3 md:p-6 w-full overflow-hidden bg-indigo-50/20">
            <div className="shrink-0">
                <PageHeader
                    title="Market Overview"
                    description="Snapshot of today's major market movements."
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0 custom-scrollbar">
                {/* Highlights Section */}
                <div className="lg:col-span-2 flex flex-col min-h-[300px] lg:min-h-0 h-full">
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-2xl shadow-indigo-100/30 flex flex-col min-h-0 h-full overflow-hidden">
                        <div className="flex items-center gap-3 mb-4 md:mb-6 shrink-0">
                            <div className="p-2 md:p-3 bg-indigo-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-indigo-200">
                                <FiTrendingUp className="text-lg md:text-xl" />
                            </div>
                            <h2 className="text-lg md:text-2xl font-black text-indigo-950 tracking-tight">Market Highlights</h2>
                        </div>

                        <div className="space-y-2 md:space-y-2.5 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-indigo-50/30 hover:bg-indigo-50/80 transition-all group border border-transparent hover:border-indigo-100/50">
                                    <FiCheckCircle className="mt-1 text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
                                    <p className="text-indigo-900/70 font-semibold text-xs md:text-base leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Media Overviews Section */}
                <div className="flex flex-col gap-3 md:gap-4 min-h-0 h-full">
                    {/* Video Overview Button */}
                    <button
                        onClick={() => setShowVideo(true)}
                        className="flex-1 min-h-[120px] md:min-h-[140px] group relative overflow-hidden bg-indigo-950 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 text-left transition-all hover:scale-[1.01] active:scale-95 shadow-2xl shadow-indigo-900/10 flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <FiPlay className="text-6xl md:text-7xl text-white" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center text-white mb-2 md:mb-3 backdrop-blur-md border border-white/20 shrink-0">
                                <FiPlay fill="white" size={14} className="md:size-16" />
                            </div>
                            <h3 className="text-base md:text-xl font-bold text-white mb-0.5 md:mb-1 uppercase tracking-tight">Video Overview</h3>
                            <p className="text-white/60 text-[10px] md:text-sm font-medium leading-snug">Expert breakdown of today's trade.</p>
                        </div>
                    </button>

                    {/* Audio Overview Button */}
                    <button
                        onClick={() => setShowAudio(true)}
                        className="flex-1 min-h-[120px] md:min-h-[140px] group relative overflow-hidden bg-white/80 border border-white backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 text-left transition-all hover:scale-[1.01] active:scale-95 shadow-2xl shadow-indigo-100/30 flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-3 md:p-4 opacity-5 group-hover:scale-110 transition-transform">
                            <FiMic className="text-6xl md:text-7xl text-indigo-600" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white mb-2 md:mb-3 shadow-lg shadow-indigo-200 shrink-0">
                                <FiMic size={14} className="md:size-16" />
                            </div>
                            <h3 className="text-base md:text-xl font-bold text-indigo-950 mb-0.5 md:mb-1 uppercase tracking-tight">Audio Brief</h3>
                            <p className="text-indigo-900/40 text-[10px] md:text-sm font-medium leading-snug">Top market stories for your commute.</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        {/* Video Modal - Truly Fixed & Immersive */}
            {showVideo && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-12 bg-indigo-950/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-black rounded-[2.5rem] p-1 md:p-2 shadow-3xl w-full h-full max-w-7xl max-h-[85vh] border border-white/10 overflow-hidden relative group animate-in zoom-in-95 duration-300">
                        <div className="w-full h-full rounded-[2.2rem] flex items-center justify-center overflow-hidden relative bg-indigo-950">
                            <img
                                src="https://images.unsplash.com/photo-1611974717483-9b250aa06ad4?auto=format&fit=crop&q=80&w=1200"
                                alt="Video Thumbnail"
                                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                            />
                            <button className="relative w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-white/20 active:scale-95 shadow-2xl">
                                <FiPlay fill="white" size={30} className="md:size-40 ml-1" />
                            </button>
                            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex items-center gap-4 md:gap-6">
                                <div className="h-1 md:h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
                                    <div className="h-full w-1/3 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                                </div>
                                <span className="text-white/80 text-[10px] md:text-sm font-black tabular-nums tracking-widest">00:42 / 02:15</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 md:top-6 right-4 md:right-6 p-2 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl transition-all text-white active:scale-90 z-20"
                        >
                            <FiX size={20} className="md:size-24" />
                        </button>
                    </div>
                </div>
            )}

            {/* Audio Modal - Tightened to fit without scrolling */}
            {showAudio && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-indigo-950/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 shadow-[0_32px_128px_rgba(0,0,0,0.4)] w-full max-w-xl border border-white animate-in zoom-in-95 duration-300 relative max-h-[95vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 text-xl md:text-2xl">
                                <FiVolume2 />
                            </div>
                            <button
                                onClick={() => setShowAudio(false)}
                                className="p-2 md:p-3 hover:bg-indigo-50 rounded-xl md:rounded-2xl transition-colors text-indigo-400 active:scale-90"
                            >
                                <FiX size={24} className="md:size-28" />
                            </button>
                        </div>
                        <div className="text-center mb-6 md:mb-8">
                            <h3 className="text-2xl md:text-3xl font-black text-indigo-950 mb-1 md:mb-2 tracking-tight">Today's Market Pulse</h3>
                            <p className="text-indigo-600 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Financial Intel Report</p>
                        </div>
                        <div className="flex justify-center items-end gap-1 md:gap-1.5 h-12 md:h-16 mb-8 md:mb-10 px-4">
                            {[1, 2, 5, 3, 8, 4, 10, 6, 9, 4, 3, 7, 2, 5, 1, 4, 6].map((h, i) => (
                                <div 
                                    key={i} 
                                    className="w-1 md:w-1.5 bg-indigo-600 rounded-full animate-pulse" 
                                    style={{ height: `${h * 10}%`, animationDelay: `${i * 0.05}s` }} 
                                />
                            ))}
                        </div>
                        <div className="flex justify-center items-center">
                            <button className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-[0_25px_60px_rgba(79,70,229,0.3)] transition-all active:scale-95 group">
                                <FiPlay fill="white" size={28} className="md:size-32 ml-1 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MarketSummary;
