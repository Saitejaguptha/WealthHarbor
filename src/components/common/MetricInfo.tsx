import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiStar, FiX, FiInfo } from 'react-icons/fi';
import { METRIC_GLOSSARY } from '../../utils/metricDefinitions';

interface MetricInfoProps {
    metricKey: string;
}

const MetricInfo: React.FC<MetricInfoProps> = ({ metricKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const definition = METRIC_GLOSSARY[metricKey];

    if (!definition) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(31,38,135,0.37)] animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 p-2 text-indigo-900/40 hover:text-indigo-900 transition-colors"
                >
                    <FiX className="text-xl" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200 shrink-0">
                        <FiInfo className="text-xl" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight leading-tight">{definition.name}</h3>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-2">Description</p>
                        <p className="text-indigo-900/70 font-medium leading-relaxed text-sm md:text-base">
                            {definition.description}
                        </p>
                    </div>

                    {definition.formula && (
                        <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-50">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Technical Formula</p>
                            <code className="text-[11px] md:text-xs font-bold text-indigo-950 font-mono block break-words">
                                {definition.formula}
                            </code>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsOpen(false)}
                    className="w-full mt-8 py-3 md:py-4 bg-indigo-950 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-indigo-900/10"
                >
                    Got it
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="absolute top-4 right-4 text-amber-400 hover:text-amber-500 hover:scale-110 transition-all p-1 z-10"
                title={`What is ${metricKey}?`}
            >
                <FiStar className="text-xl fill-amber-400/20" />
            </button>

            {isOpen && createPortal(modalContent, document.body)}
        </>
    );
};

export default MetricInfo;
