import { FiTrendingUp } from 'react-icons/fi';

interface PerformanceRow {
    period: string;
    fund: number;
    benchmark: number;
    category: number;
}

interface Props {
    id: string;
    name: string;
    benchmarkName: string;
    performance: PerformanceRow[];
}

const FundPerformanceSection: React.FC<Props> = ({ benchmarkName, performance }) => {
    return (
        <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-black text-indigo-950 mb-6 tracking-tight flex items-center gap-3">
                <span className="text-indigo-400 text-2xl"><FiTrendingUp /></span>
                Performance vs Benchmark
                <div className="h-1 flex-1 bg-indigo-50 rounded-full" />
            </h2>

            <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                <div className="px-6 py-4 bg-indigo-50/40 border-b border-indigo-50 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Trailing Returns (%)</span>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-600" />
                            <span className="text-[9px] font-black text-indigo-900/60 uppercase tracking-widest">Fund</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-violet-400" />
                            <span className="text-[9px] font-black text-indigo-900/60 uppercase tracking-widest">Benchmark</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-[9px] font-black text-indigo-900/60 uppercase tracking-widest">Category</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100 scrollbar-track-transparent">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead>
                            <tr className="border-b border-indigo-50">
                                <th className="text-left px-6 py-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Period</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-indigo-600 uppercase tracking-widest">Fund</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-violet-500 uppercase tracking-widest">{benchmarkName}</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-emerald-500 uppercase tracking-widest">Category Avg</th>
                                <th className="text-right px-6 py-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performance.map((row, i) => (
                                <tr key={i} className="border-b border-indigo-50/50 hover:bg-indigo-50/20 transition-colors">
                                    <td className="px-6 py-4 text-xs font-black text-indigo-950 uppercase tracking-widest">{row.period}</td>
                                    <td className={`px-6 py-4 text-sm font-black text-right ${row.fund >= row.benchmark ? 'text-emerald-600' : 'text-indigo-950'}`}>
                                        {row.fund > 0 ? '+' : ''}{row.fund}%
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-indigo-900/60 text-right">{row.benchmark}%</td>
                                    <td className="px-6 py-4 text-sm font-bold text-indigo-900/60 text-right">{row.category}%</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[10px] font-black px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">TOP {Math.floor(Math.random() * 10) + 1}%</span>
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

export default FundPerformanceSection;
