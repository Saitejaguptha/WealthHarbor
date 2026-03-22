import React from 'react';
import { formatNumberEnIn } from '../../utils/numberFormat';

export interface TableRowDef<T> {
    key: keyof T;
    label: string;
    prefix?: string;
    suffix?: string;
    highlight?: boolean;
    format?: (val: any) => string;
    cellClassName?: (val: any) => string;
}

interface FinancialTableProps<T> {
    data: T[];
    columns: { label: string; key: keyof T }[];
    rows: TableRowDef<T>[];
    metricColumnLabel?: string;
    metricColumnWidth?: string;
    columnWidth?: string;
    className?: string;
    headerClassName?: string;
}

const FinancialTable = <T extends Record<string, any>>({
    data,
    columns,
    rows,
    metricColumnLabel = 'Metric',
    metricColumnWidth = 'md:min-w-[160px]',
    columnWidth = 'md:min-w-[110px]',
    className = "",
    headerClassName = "bg-indigo-50/40",
}: FinancialTableProps<T>) => {
    const fmtNum = (val: any) => {
        if (typeof val !== 'number') return String(val);
        return formatNumberEnIn(val);
    };

    return (
        <div className={`w-full min-w-0 max-w-full overflow-x-hidden md:overflow-x-auto md:scrollbar-thin pb-2 ${className}`}>
            <table className="w-full border-collapse max-md:table-fixed md:min-w-max text-sm">
                <thead>
                    <tr className={`border-b border-indigo-50 ${headerClassName}`}>
                        <th className={`text-left max-md:px-2 max-md:py-2.5 max-md:w-[34%] px-5 py-3 text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-tight md:tracking-widest ${metricColumnWidth}`}>
                            {metricColumnLabel}
                        </th>
                        {columns.map((col, ci) => (
                            <th key={ci} className={`text-right max-md:px-1.5 max-md:py-2.5 max-md:w-[22%] px-4 py-3 text-[8px] md:text-[10px] font-black text-indigo-600 uppercase leading-tight md:tracking-widest md:whitespace-nowrap ${columnWidth} whitespace-normal`}>
                                {String(col.label)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} className={`border-b border-indigo-50/50 ${row.highlight ? 'bg-indigo-50/40' : 'hover:bg-indigo-50/20'} transition-colors`}>
                            <td className={`max-md:px-2 max-md:py-2 max-md:text-[10px] max-md:align-top max-md:leading-snug px-5 py-3 text-xs font-bold ${row.highlight ? 'text-indigo-700' : 'text-indigo-900/70'} md:whitespace-nowrap`}>
                                {row.label}
                            </td>
                            {data.map((d, di) => {
                                const val = d[row.key];
                                const displayVal = row.format ? row.format(val) : `${row.prefix || ''}${fmtNum(val)}${row.suffix || ''}`;
                                return (
                                    <td key={di} className={`text-right max-md:px-1.5 max-md:py-2 max-md:text-[10px] max-md:leading-tight max-md:break-all max-md:tabular-nums px-4 py-3 font-bold md:text-sm ${row.highlight ? 'text-indigo-700' : (row.cellClassName ? row.cellClassName(val) : 'text-indigo-950')} md:whitespace-nowrap`}>
                                        {displayVal}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinancialTable;
