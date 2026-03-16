import React from 'react';
import { FiShield, FiAlertTriangle, FiActivity, FiZap, FiTrendingUp } from 'react-icons/fi';
import MetricInfo from '../common/MetricInfo';

interface Props {
    standardDeviation: number;
    sharpeRatio: number;
    sortinoRatio: number;
    alpha: number;
    beta: number;
}

const RiskCard = ({ icon, label, value, sub, color, metricKey }: { icon: React.ReactNode, label: string, value: string | number, sub: string, color: string, metricKey: string }) => (
    <div className="bg-white rounded-[2rem] border border-indigo-50 shadow-lg shadow-indigo-50 p-6 relative overflow-hidden group">
        <MetricInfo metricKey={metricKey} />
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white mb-4 shadow-lg transition-transform group-hover:scale-110`}>
            {icon}
        </div>
        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-indigo-950">{value}</p>
        <p className="text-[11px] font-medium text-indigo-900/40 mt-1 leading-tight">{sub}</p>
    </div>
);

const FundRiskSection: React.FC<Props> = ({ standardDeviation, sharpeRatio, sortinoRatio, alpha, beta }) => {
    return (
        <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-black text-indigo-950 mb-6 tracking-tight flex items-center gap-3">
                <span className="text-indigo-400 text-2xl"><FiShield /></span>
                Risk & Volatility Analysis
                <div className="h-1 flex-1 bg-indigo-50 rounded-full" />
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <RiskCard 
                    icon={<FiActivity />} 
                    label="Std. Deviation" 
                    value={standardDeviation} 
                    sub="Measure of volatility" 
                    color="bg-indigo-600" 
                    metricKey="Standard Deviation"
                />
                <RiskCard 
                    icon={<FiZap />} 
                    label="Sharpe Ratio" 
                    value={sharpeRatio} 
                    sub="Risk-adjusted return" 
                    color="bg-violet-500" 
                    metricKey="Sharpe Ratio"
                />
                <RiskCard 
                    icon={<FiTrendingUp />} 
                    label="Alpha" 
                    value={alpha > 0 ? `+${alpha}` : alpha} 
                    sub="Excess vs Benchmark" 
                    color="bg-emerald-500" 
                    metricKey="Alpha"
                />
                <RiskCard 
                    icon={<FiShield />} 
                    label="Beta" 
                    value={beta} 
                    sub="Market sensitivity" 
                    color="bg-cyan-500" 
                    metricKey="Beta"
                />
                <RiskCard 
                    icon={<FiAlertTriangle />} 
                    label="Sortino" 
                    value={sortinoRatio} 
                    sub="Downside risk protection" 
                    color="bg-amber-500" 
                    metricKey="Sortino Ratio"
                />
            </div>
        </div>
    );
};

export default FundRiskSection;
