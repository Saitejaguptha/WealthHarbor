import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiCalendar, FiArrowRight, FiInfo } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import InstitutionalActivityChart from '../components/common/InstitutionalActivityChart';

interface FIIData {
    date: string;
    fiiNet: number;
    diiNet: number;
    totalNet: number;
    rawDate: Date;
}

const FIIDII: React.FC = () => {
    // Generate some random 30 days details as requested
    const generateData = (): FIIData[] => {
        const data: FIIData[] = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            // Random net values between -3000 and 3000
            const fiiNet = Math.floor(Math.random() * 6000) - 3000;
            const diiNet = Math.floor(Math.random() * 6000) - 3000;
            const totalNet = fiiNet + diiNet;

            data.push({
                date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                fiiNet,
                diiNet,
                totalNet,
                rawDate: date
            });
        }
        return data;
    };

    const [data] = useState<FIIData[]>(generateData());

    return (
        <div className="p-3 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="FII & DII Activity"
                description="Daily net purchase/sell activity of Institutional Investors in the Indian market"
                onRefresh={() => window.location.reload()}
                refreshLabel="Refresh Data"
            />

            {/* Institutional Activity Chart */}
            <div className="mb-10">
                <InstitutionalActivityChart 
                    data={data.map((d: FIIData) => ({
                        date: d.date,
                        fiiNet: d.fiiNet,
                        diiNet: d.diiNet
                    }))}
                    title="Institutional Investment Trend"
                />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100/20">
                    <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-2">FII Sentiment (30d)</p>
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-indigo-950">Net Buyers</h3>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <FiTrendingUp size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100/20">
                    <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-2">DII Sentiment (30d)</p>
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-indigo-950">Accumulating</h3>
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                            <FiArrowRight size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-200 text-white">
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">Market Outlook</p>
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black">Bullish</h3>
                        <FiInfo size={24} className="opacity-60" />
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-indigo-50/50 text-indigo-900/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                <th className="px-4 md:px-8 py-4 md:py-6">Date</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">FII (Cr)</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">DII (Cr)</th>
                                <th className="px-4 md:px-8 py-4 md:py-6">Total (Cr)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-50/50">
                            {data.map((row: FIIData, idx: number) => (
                                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="px-4 md:px-8 py-4 md:py-5">
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <FiCalendar className="text-indigo-300 group-hover:text-indigo-600 transition-colors shrink-0" />
                                            <span className="font-bold text-indigo-950 text-xs md:text-base whitespace-nowrap">{row.date}</span>
                                        </div>
                                    </td>
                                    <td className={`px-4 md:px-8 py-4 md:py-5 font-black text-xs md:text-base ${row.fiiNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <div className="flex items-center gap-2">
                                            {row.fiiNet >= 0 ? <FiTrendingUp className="shrink-0" /> : <FiTrendingDown className="shrink-0" />}
                                            {row.fiiNet > 0 ? '+' : ''}{row.fiiNet.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className={`px-4 md:px-8 py-4 md:py-5 font-black text-xs md:text-base ${row.diiNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <div className="flex items-center gap-2">
                                            {row.diiNet >= 0 ? <FiTrendingUp className="shrink-0" /> : <FiTrendingDown className="shrink-0" />}
                                            {row.diiNet > 0 ? '+' : ''}{row.diiNet.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className={`px-4 md:px-8 py-4 md:py-5 font-black text-xs md:text-base ${row.totalNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <div className="px-3 md:px-4 py-1.5 rounded-xl bg-white border border-indigo-50 shadow-sm inline-block whitespace-nowrap">
                                            {row.totalNet > 0 ? '+' : ''}{row.totalNet.toLocaleString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FIIDII;
