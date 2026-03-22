import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiStar, FiX, FiInfo } from 'react-icons/fi';
import { METRIC_GLOSSARY } from '../../data/metricDefinitions';

interface MetricInfoProps {
    metricKey: string;
    /** corner: absolute top-right (default). inline-beside: compact button for same row as a value (flex with items-center). */
    position?: 'corner' | 'inline-beside';
}

const MetricInfo: React.FC<MetricInfoProps> = ({ metricKey, position = 'corner' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const definition = METRIC_GLOSSARY[metricKey];

    if (!definition) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
            <div
                className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-w-sm md:max-w-md bg-white border border-indigo-100 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl shadow-indigo-950/20 animate-in zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-indigo-900/40 hover:text-indigo-900 transition-colors"
                >
                    <FiX className="text-lg md:text-xl" />
                </button>

                <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                    <div className="p-2.5 md:p-3 bg-indigo-600 rounded-xl md:rounded-2xl text-white shadow-lg shadow-indigo-200 shrink-0">
                        <FiInfo className="text-lg md:text-xl" />
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-indigo-950 tracking-tight leading-tight">{definition.name}</h3>
                </div>

                <div className="space-y-4 md:space-y-6">
                    <div>
                        <p className="text-[9px] md:text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-1.5 md:mb-2">Description</p>
                        <p className="text-indigo-900/70 font-medium leading-relaxed text-xs md:text-base">
                            {definition.description}
                        </p>
                    </div>

                    {definition.formula && (
                        <div className="p-4 md:p-5 bg-indigo-50/50 rounded-xl md:rounded-2xl border border-indigo-50">
                            <p className="text-[9px] md:text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1.5 md:mb-2 text-center md:text-left">Technical Formula</p>
                            <code className="text-[10px] md:text-xs font-bold text-indigo-950 font-mono block break-words text-center md:text-left">
                                {definition.formula}
                            </code>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsOpen(false)}
                    className="w-full mt-6 md:mt-8 py-3 md:py-4 bg-indigo-950 text-white font-black rounded-xl md:rounded-2xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-indigo-900/10 text-sm md:text-base"
                >
                    Got it
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className={
                    position === 'inline-beside'
                        ? 'shrink-0 p-1.5 bg-amber-50 rounded-lg text-amber-500 hover:bg-amber-100 hover:scale-105 transition-all shadow-sm border border-amber-100/50 flex items-center justify-center'
                        : 'absolute top-2 right-2 p-2 bg-amber-50 rounded-xl text-amber-500 hover:bg-amber-100 hover:scale-110 transition-all z-20 shadow-sm border border-amber-100/50 flex items-center justify-center'
                }
                title={`What is ${metricKey}?`}
            >
                <FiStar className={position === 'inline-beside' ? 'text-xs fill-amber-500' : 'text-sm md:text-base fill-amber-500'} />
            </button>

            {isOpen && createPortal(modalContent, document.body)}
        </>
    );
};

export default MetricInfo;
