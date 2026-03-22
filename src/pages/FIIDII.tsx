import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiCalendar } from 'react-icons/fi';
import PageHeader from '../components/common/PageHeader';
import InstitutionalActivityChart from '../components/common/InstitutionalActivityChart';
import { formatNumberEnIn } from '../utils/numberFormat';

interface FIIData {
    date: string;
    fiiNet: number;
    diiNet: number;
    totalNet: number;
    rawDate: Date;
}

const FIIDII: React.FC = () => {
    const generateData = (): FIIData[] => {
        const data: FIIData[] = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
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
        <div className="p-4 md:p-8 w-full animate-in fade-in duration-700">
            <PageHeader
                title="FII & DII Activity"
                description="Track institutional investment flows in the Indian market"
                onRefresh={() => window.location.reload()}
                refreshLabel="Update Activity"
            />

            <div className="space-y-8 mb-10">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 stagger-children">
                        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-100/20">
                            <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Latest FII Net</p>
                            <div className={`flex items-center gap-2 text-2xl font-black ${data[0].fiiNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {data[0].fiiNet >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                ₹{formatNumberEnIn(Math.abs(data[0].fiiNet))} <span className="text-xs font-bold text-indigo-900/40 mt-1">Cr</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-xl shadow-indigo-100/20">
                            <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-widest mb-1">Latest DII Net</p>
                            <div className={`flex items-center gap-2 text-2xl font-black ${data[0].diiNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {data[0].diiNet >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                                ₹{formatNumberEnIn(Math.abs(data[0].diiNet))} <span className="text-xs font-bold text-indigo-900/40 mt-1">Cr</span>
                            </div>
                        </div>
                        <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-200">
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Flow Balance</p>
                            <div className="text-2xl font-black text-white">
                                ₹{formatNumberEnIn(data[0].fiiNet + data[0].diiNet)} <span className="text-xs font-bold text-white/60 mt-1">Cr</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-indigo-950 uppercase tracking-tight">Institutional Trends</h2>
                            <p className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest mt-1">Net Flow Analysis - 30 Day Period</p>
                        </div>
                        <div className="h-[300px] md:h-[500px]">
                            <InstitutionalActivityChart 
                                data={data.map((d: FIIData) => ({
                                    date: d.date,
                                    fiiNet: d.fiiNet,
                                    diiNet: d.diiNet
                                }))}
                                title=""
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden">
                    <div className="p-8 border-b border-indigo-50">
                        <h2 className="text-xl font-black text-indigo-950 uppercase tracking-tight">Daily Record</h2>
                    </div>
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-indigo-50/50 text-indigo-900/40 text-[10px] font-black uppercase tracking-widest sticky top-0 backdrop-blur-md">
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">FII (Cr)</th>
                                    <th className="px-6 py-4 text-right">DII (Cr)</th>
                                    <th className="px-6 py-4 text-right hidden md:table-cell">Total Net (Cr)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-indigo-50/50">
                                {data.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiCalendar className="text-indigo-300 group-hover:text-indigo-600 transition-colors" />
                                                <span className="font-bold text-indigo-950 text-sm">{row.date}</span>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-black text-sm ${row.fiiNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {row.fiiNet > 0 ? '+' : ''}{formatNumberEnIn(row.fiiNet)}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-black text-sm ${row.diiNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {row.diiNet > 0 ? '+' : ''}{formatNumberEnIn(row.diiNet)}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-black text-sm hidden md:table-cell ${row.totalNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {row.totalNet > 0 ? '+' : ''}{formatNumberEnIn(row.totalNet)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FIIDII;
