import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const MONTH_KEY = 'wealthharbor_period_month';
const YEAR_KEY = 'wealthharbor_period_year';
const CURRENCY_KEY = 'wealthharbor_currency';

type Currency = 'INR' | 'USD';

interface AppPreferencesValue {
    selectedMonth: number;
    selectedYear: number;
    setSelectedMonth: (m: number) => void;
    setSelectedYear: (y: number) => void;
    currency: Currency;
    setCurrency: (c: Currency) => void;
}

const AppPreferencesContext = createContext<AppPreferencesValue | null>(null);

function readMonth(): number {
    const raw = localStorage.getItem(MONTH_KEY);
    if (raw === null) return new Date().getMonth();
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 && n <= 11 ? n : new Date().getMonth();
}

function readYear(): number {
    const raw = localStorage.getItem(YEAR_KEY);
    if (raw === null) return new Date().getFullYear();
    const n = Number(raw);
    return Number.isFinite(n) ? n : new Date().getFullYear();
}

function readCurrency(): Currency {
    const raw = localStorage.getItem(CURRENCY_KEY) as Currency | null;
    return raw === 'USD' ? 'USD' : 'INR';
}

export const AppPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedMonth, setMonthState] = useState(readMonth);
    const [selectedYear, setYearState] = useState(readYear);
    const [currency, setCurrencyState] = useState<Currency>(readCurrency);

    const setSelectedMonth = useCallback((m: number) => {
        setMonthState(m);
        localStorage.setItem(MONTH_KEY, String(m));
    }, []);

    const setSelectedYear = useCallback((y: number) => {
        setYearState(y);
        localStorage.setItem(YEAR_KEY, String(y));
    }, []);

    const setCurrency = useCallback((c: Currency) => {
        setCurrencyState(c);
        localStorage.setItem(CURRENCY_KEY, c);
    }, []);

    const value = useMemo(
        () => ({
            selectedMonth,
            selectedYear,
            setSelectedMonth,
            setSelectedYear,
            currency,
            setCurrency,
        }),
        [selectedMonth, selectedYear, setSelectedMonth, setSelectedYear, currency, setCurrency]
    );

    return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
};

export function useAppPreferences(): AppPreferencesValue {
    const ctx = useContext(AppPreferencesContext);
    if (!ctx) {
        throw new Error('useAppPreferences must be used within AppPreferencesProvider');
    }
    return ctx;
}
