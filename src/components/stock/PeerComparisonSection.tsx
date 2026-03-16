import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import type { PeerCompany } from '../../types/stock';

interface Props {
    peers: PeerCompany[];
    currentSymbol: string;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
    <h2 className="text-xl md:text-2xl font-black text-indigo-950 mb-4 md:mb-6 tracking-tight flex items-center gap-3">
        <span className="text-indigo-400 text-2xl">{icon}</span>
        {title}
        <div className="h-1 flex-1 bg-indigo-50 rounded-full" />
    </h2>
);

const PeerComparisonSection: React.FC<Props> = ({ peers, currentSymbol }) => {
    const cols: { key: keyof PeerCompany; label: string; fmt?: (v: PeerCompany[keyof PeerCompany]) => string }[] = [
        { key: 'name',          label: 'Company' },
        { key: 'price',         label: 'Price (₹)',     fmt: v => `₹${Number(v).toLocaleString('en-IN')}` },
        { key: 'marketCap',     label: 'Mkt Cap' },
        { key: 'peRatio',       label: 'P/E',           fmt: v => String(v) },
        { key: 'roe',           label: 'ROE %',         fmt: v => `${v}%` },
        { key: 'roce',          label: 'ROCE %',        fmt: v => `${v}%` },
        { key: 'dividendYield', label: 'Div. Yield %',  fmt: v => `${v}%` },
    ];

    return (
        <div className="mb-8 md:mb-12">
            <SectionTitle icon={<FiBarChart2 />} title="Peer Comparison" />
            <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-50 overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-100">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-indigo-50 bg-indigo-50/50">
                                {cols.map(c => (
                                    <th key={String(c.key)} className={`text-left px-4 md:px-5 py-3.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest whitespace-nowrap ${c.key === 'name' ? 'min-w-[140px] md:min-w-[160px]' : 'min-w-[80px] md:min-w-[100px]'}`}>{c.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {peers.map((peer, i) => {
                                const isCurrent = peer.symbol === currentSymbol;
                                return (
                                    <tr key={i} className={`border-b border-indigo-50/60 transition-colors ${isCurrent ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50/30'}`}>
                                        {cols.map(c => (
                                            <td key={String(c.key)} className={`px-5 py-3.5 text-sm whitespace-nowrap ${c.key === 'name' ? 'font-black' : 'font-bold'} ${isCurrent ? 'text-white' : 'text-indigo-950'}`}>
                                                {c.fmt ? c.fmt(peer[c.key]) : String(peer[c.key])}
                                                {isCurrent && c.key === 'name' && (
                                                    <span className="ml-2 text-[9px] bg-white/20 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-widest">You</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PeerComparisonSection;
