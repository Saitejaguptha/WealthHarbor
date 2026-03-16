import React from 'react';
import { FiInfo, FiLayers, FiShield, FiTarget } from 'react-icons/fi';

const About: React.FC = () => {
    return (
        <div className="p-4 md:p-8 w-full animate-in fade-in duration-700">
            <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50">
                <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl md:text-4xl shadow-xl shadow-indigo-200">
                        <FiInfo />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-indigo-950 tracking-tight">WealthHarbor</h1>
                        <p className="text-indigo-900/40 text-sm md:text-lg font-bold uppercase tracking-widest mt-1">Version 1.0.0 • Professional Portfolio Manager</p>
                    </div>
                </div>

                <div className="prose prose-indigo max-w-none">
                    <h2 className="text-2xl font-black text-indigo-950 mb-4 flex items-center gap-3">
                        <FiTarget className="text-indigo-600" /> Our Mission
                    </h2>
                    <p className="text-indigo-900/60 leading-relaxed text-lg font-medium mb-8">
                        WealthHarbor is designed to empower individual investors with professional-grade tools and insights. 
                        We believe that everyone should have access to clear, actionable financial data to make informed decisions about their future.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-50">
                            <FiLayers className="text-indigo-600 text-2xl mb-4" />
                            <h3 className="text-xl font-black text-indigo-950 mb-2">Multi-Asset Tracking</h3>
                            <p className="text-indigo-900/60 text-sm leading-relaxed">
                                Track Stocks, Mutual Funds, ETFs, and Commodities all in one unified dashboard with real-time analytics.
                            </p>
                        </div>
                        <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-50">
                            <FiShield className="text-indigo-600 text-2xl mb-4" />
                            <h3 className="text-xl font-black text-indigo-950 mb-2">Secure & Private</h3>
                            <p className="text-indigo-900/60 text-sm leading-relaxed">
                                Your financial data is your business. We prioritize security and privacy in every feature we build.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-indigo-950 mb-4">About This Project</h2>
                    <p className="text-indigo-900/60 leading-relaxed font-medium">
                        WealthHarbor provides a comprehensive overview of the Indian financial markets, including NSE and BSE indices, 
                        top-performing stocks, and detailed institutional activity (FII & DII). 
                        Our platform features advanced charting, personalized watchlists, and smart notifications to keep you ahead of the market.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
