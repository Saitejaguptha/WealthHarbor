import React from 'react';
import { FiPieChart, FiLayout } from 'react-icons/fi';

interface Holding {
    company: string;
    sector?: string;
    allocation: number;
}

interface SectorAlloc {
    sector: string;
    percentage: number;
}

interface Props {
    topHoldings: Holding[];
    sectorAllocation: SectorAlloc[];
    title?: string;
}

const FundHoldingsSection: React.FC<Props> = ({ topHoldings, sectorAllocation, title = "Portfolio Analysis" }) => {
    return (
        <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-black text-indigo-950 mb-6 tracking-tight flex items-center gap-3">
                <span className="text-indigo-400 text-2xl"><FiPieChart /></span>
                {title}
                <div className="h-1 flex-1 bg-indigo-50 rounded-full" />
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Holdings Table */}
                <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                    <div className="px-6 py-4 bg-indigo-50/40 border-b border-indigo-50">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Top Holdings</span>
                    </div>
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent">
                        <table className="w-full text-sm min-w-[320px] md:min-w-[500px]">
                            <thead>
                                <tr className="border-b border-indigo-50">
                                    <th className="text-left px-4 md:px-6 py-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Company</th>
                                    {topHoldings[0]?.sector && (
                                        <th className="text-left px-4 md:px-6 py-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Sector</th>
                                    )}
                                    <th className="text-right px-4 md:px-6 py-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Alloc (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topHoldings.map((h, i) => (
                                    <tr key={i} className="border-b border-indigo-50/50 hover:bg-indigo-50/20 transition-colors">
                                        <td className="px-6 py-3.5 text-xs font-bold text-indigo-950">{h.company}</td>
                                        {h.sector && (
                                            <td className="px-6 py-3.5 text-[11px] font-medium text-indigo-900/60">{h.sector}</td>
                                        )}
                                        <td className="px-6 py-3.5 text-sm font-black text-indigo-950 text-right">{h.allocation}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sector Allocation Bar Chart */}
                <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <FiLayout className="text-indigo-400" />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Sector Allocation</span>
                        </div>
                        <div className="space-y-5">
                            {sectorAllocation.map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-indigo-950">{s.sector}</span>
                                        <span className="text-xs font-black text-indigo-600">{s.percentage}%</span>
                                    </div>
                                    <div className="h-2 bg-indigo-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                                            style={{ width: `${s.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-indigo-50">
                        <p className="text-[10px] text-indigo-900/40 italic">* Data as of latest available portfolio disclosure.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundHoldingsSection;
