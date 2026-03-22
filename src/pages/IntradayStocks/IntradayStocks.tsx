import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiShare2, FiBookmark } from 'react-icons/fi';
import intradayHero from '../../assets/images/intraday-hero.png';

const IntradayStocks: React.FC = () => {
    // This is the "Stock in News Read Full Article" page for Best Intraday Stocks
    return (
        <div className="p-4 md:p-8 w-full animate-in fade-in duration-700">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-6 hover:gap-3 transition-all"
            >
                <FiArrowLeft /> Back to Market Overview
            </Link>

            <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden">
                <div className="h-64 overflow-hidden">
                    <img 
                        src={intradayHero} 
                        alt="Intraday Trading" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
                
                <div className="p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                            Intraday Picks
                        </span>
                        <div className="flex items-center gap-2 text-indigo-900/40 text-[10px] font-black uppercase tracking-widest">
                            <FiClock /> 2 Hours Ago
                        </div>
                        <div className="flex-1" />
                        <div className="flex gap-2">
                            <button className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                <FiShare2 />
                            </button>
                            <button className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                <FiBookmark />
                            </button>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-indigo-950 tracking-tight leading-tight mb-8">
                        Top 5 Intraday Stock Picks for Today's Volatile Session
                    </h1>

                    <div className="prose prose-indigo max-w-none">
                        <p className="text-xl font-bold text-indigo-900/60 mb-8 leading-relaxed italic border-l-4 border-indigo-600 pl-6">
                            "Market volatility presents unique opportunities for intraday traders. Today's focus remains on high-beta stocks following strong earnings reports."
                        </p>

                        <div className="space-y-10 font-medium">
                            <section>
                                <h2 className="text-2xl font-black text-indigo-950 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">1</span>
                                    Reliance Industries (RELIANCE)
                                </h2>
                                <p className="text-indigo-900/60 leading-relaxed">
                                    Reliance is showing strong momentum near its 52-week high. With significant accumulation seen in the pre-open session, it's a top candidate for a breakout trade above ₹2,950. Target: ₹3,020, Stop Loss: ₹2,925.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-indigo-950 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">2</span>
                                    TATA Motors (TATAMOTORS)
                                </h2>
                                <p className="text-indigo-900/60 leading-relaxed">
                                    Expected to react positively to recent PV sales data. The stock has formed a "Cup and Handle" pattern on the hourly chart. Look for entries on dips near ₹940. Target: ₹975, Stop Loss: ₹928.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-indigo-950 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-sm">3</span>
                                    HDFC Bank (HDFCBANK)
                                </h2>
                                <p className="text-indigo-900/60 leading-relaxed">
                                    The banking sector giant is stabilizing after a week-long correction. A move above ₹1,460 could trigger short-covering. High volume at support levels suggests a reversal. Target: ₹1,505, Stop Loss: ₹1,445.
                                </p>
                            </section>
                        </div>

                        <div className="mt-12 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 italic">
                            <h4 className="text-amber-900 font-black mb-2 uppercase tracking-widest text-xs not-italic">Risk Disclosure</h4>
                            <p className="text-amber-900/60 text-sm leading-relaxed font-medium">
                                Intraday trading involves high risk. Ensure you use proper stop losses and never trade with more capital than you can afford to lose. WealthHarbor does not provide financial advice; these are for educational purposes only.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntradayStocks;

