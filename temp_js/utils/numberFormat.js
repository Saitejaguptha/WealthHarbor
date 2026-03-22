"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISPLAY_MAX_DECIMALS = void 0;
exports.roundToMaxDecimals = roundToMaxDecimals;
exports.formatNumberEnIn = formatNumberEnIn;
exports.formatIntegerEnIn = formatIntegerEnIn;
exports.formatMetricCell = formatMetricCell;
/** Maximum fraction digits for numeric display across the app */
exports.DISPLAY_MAX_DECIMALS = 3;
function roundToMaxDecimals(value, maxDecimals = exports.DISPLAY_MAX_DECIMALS) {
    if (typeof value !== 'number' || !Number.isFinite(value))
        return value;
    return Number.parseFloat(value.toFixed(maxDecimals));
}
/** Locale-formatted number (en-IN) with at most `maxDecimals` fraction digits */
function formatNumberEnIn(value, maxDecimals = exports.DISPLAY_MAX_DECIMALS) {
    if (value == null || Number.isNaN(value))
        return '-';
    const n = roundToMaxDecimals(value, maxDecimals);
    return n.toLocaleString('en-IN', {
        maximumFractionDigits: maxDecimals,
        minimumFractionDigits: 0,
    });
}
/** Counts / whole numbers (shareholders, volume integers) */
function formatIntegerEnIn(value) {
    if (value == null || Number.isNaN(value))
        return '-';
    return Math.round(value).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}
/**
 * Stock detail metric cell: number, ₹ amount, or "1234 Cr" style strings → en-IN with ≤3 decimals.
 */
function formatMetricCell(value, suffix, maxDecimals = exports.DISPLAY_MAX_DECIMALS) {
    if (typeof value === 'number') {
        return formatNumberEnIn(value, maxDecimals) + suffix;
    }
    const rupee = /^₹([\d,.]+)$/.exec(value.trim());
    if (rupee) {
        const n = parseFloat(rupee[1].replace(/,/g, ''));
        return Number.isFinite(n) ? `₹${formatNumberEnIn(n, maxDecimals)}${suffix}` : value + suffix;
    }
    const cr = /^([\d,.]+)\s*Cr$/i.exec(value.trim());
    if (cr) {
        const n = parseFloat(cr[1].replace(/,/g, ''));
        return Number.isFinite(n) ? `${formatNumberEnIn(n, maxDecimals)} Cr${suffix}` : value + suffix;
    }
    return value + suffix;
}
