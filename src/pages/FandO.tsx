import React, { useState } from 'react';
import { FiActivity, FiTrendingUp, FiTrendingDown, FiClock } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import MonthYearSelector from '../components/common/MonthYearSelector';

const FandO: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Sample data for 10 days call and put options
    const sampleOptions = [
        { strike: 22000, callPrice: 450.50, callChange: 12.5, putPrice: 12.20, putChange: -5.4, date: '16 Mar 2026' },
        { strike: 22100, callPrice: 380.20, callChange: 10.2, putPrice: 25.40, putChange: -8.1, date: '16 Mar 2026' },
        { strike: 22200, callPrice: 310.60, callChange: 8.4, putPrice: 48.60, putChange: -12.3, date: '16 Mar 2026' },
        { strike: 22300, callPrice: 245.10, callChange: 5.2, putPrice: 78.40, putChange: -15.6, date: '16 Mar 2026' },
        { strike: 22400, callPrice: 190.40, callChange: 2.1, putPrice: 115.30, putChange: -18.2, date: '16 Mar 2026' },
        { strike: 22500, callPrice: 140.20, callChange: -1.5, putPrice: 165.70, putChange: 2.1, date: '16 Mar 2026' },
        { strike: 22600, callPrice: 95.80, callChange: -4.2, putPrice: 228.40, putChange: 5.4, date: '16 Mar 2026' },
        { strike: 22700, callPrice: 62.40, callChange: -8.6, putPrice: 295.10, putChange: 8.7, date: '16 Mar 2026' },
        { strike: 22800, callPrice: 38.20, callChange: -12.4, putPrice: 375.60, putChange: 11.2, date: '16 Mar 2026' },
        { strike: 22900, callPrice: 22.10, callChange: -15.8, putPrice: 460.20, putChange: 14.5, date: '16 Mar 2026' },
    ];

    return (
        <div className="p-4 md:p-8 w-full animate-in fade-in duration-700">
            <PageHeader
                title="F&O Options Chain"
                description="Live derivatives data and sample 10-day option chains"
            >
                <div className="flex justify-end w-full">
                    <MonthYearSelector
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        onMonthChange={setSelectedMonth}
                        onYearChange={setSelectedYear}
                    />
                </div>
            </PageHeader>

            <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-indigo-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-xl text-white">
                            <FiActivity />
                        </div>
                        <h2 className="text-xl font-black text-indigo-950 uppercase tracking-tight">NIFTY Option Chain</h2>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-indigo-900/40">
                        <div className="flex items-center gap-1">
                            <FiClock /> Last Updated: 10:05 AM
                        </div>
                        <div className="px-3 py-1 bg-indigo-50 rounded-lg text-indigo-600">
                            Exp: 26 MAR 2026
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-indigo-50/50 text-indigo-900/40 text-[9px] font-black uppercase tracking-widest border-b border-indigo-50">
                                <th colSpan={2} className="px-6 py-4 border-r border-indigo-50 bg-emerald-50/30 text-emerald-600">CALLS</th>
                                <th className="px-6 py-4">STRIKE</th>
                                <th colSpan={2} className="px-6 py-4 border-l border-indigo-50 bg-rose-50/30 text-rose-600">PUTS</th>
                            </tr>
                            <tr className="bg-white text-indigo-900/40 text-[8px] font-black uppercase tracking-widest border-b border-indigo-50">
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3 border-r border-indigo-50">CHG%</th>
                                <th className="px-6 py-3 bg-indigo-50/30 text-indigo-900">Price</th>
                                <th className="px-6 py-3 border-l border-indigo-50">Price</th>
                                <th className="px-6 py-3">CHG%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-50/50 font-bold">
                            {sampleOptions.map((opt, idx) => (
                                <tr key={idx} className="hover:bg-indigo-50/20 transition-colors">
                                    <td className="px-6 py-4 text-indigo-950">₹{opt.callPrice.toFixed(2)}</td>
                                    <td className={`px-6 py-4 border-r border-indigo-50 ${opt.callChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <div className="flex items-center justify-center gap-1">
                                            {opt.callChange >= 0 ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />}
                                            {Math.abs(opt.callChange)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 bg-indigo-50/30 text-indigo-950 text-lg font-black">
                                        {opt.strike}
                                    </td>
                                    <td className="px-6 py-4 border-l border-indigo-50 text-indigo-950">₹{opt.putPrice.toFixed(2)}</td>
                                    <td className={`px-6 py-4 ${opt.putChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        <div className="flex items-center justify-center gap-1">
                                            {opt.putChange >= 0 ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />}
                                            {Math.abs(opt.putChange)}%
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-emerald-900/40 text-[9px] font-black uppercase tracking-widest mb-1">Max Pain (Calls)</p>
                        <h3 className="text-2xl font-black text-emerald-950">22,500</h3>
                    </div>
                    <FiTrendingUp className="text-3xl text-emerald-600 opacity-20" />
                </div>
                <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 flex items-center justify-between">
                    <div>
                        <p className="text-rose-900/40 text-[9px] font-black uppercase tracking-widest mb-1">Max Pain (Puts)</p>
                        <h3 className="text-2xl font-black text-rose-950">22,200</h3>
                    </div>
                    <FiTrendingDown className="text-3xl text-rose-600 opacity-20" />
                </div>
            </div>
        </div>
    );
};

export default FandO;
