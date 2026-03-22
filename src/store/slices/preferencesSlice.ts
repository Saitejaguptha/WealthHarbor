import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const MONTH_KEY = 'wealthharbor_period_month';
const YEAR_KEY = 'wealthharbor_period_year';
const CURRENCY_KEY = 'wealthharbor_currency';

type Currency = 'INR' | 'USD';

interface PreferencesState {
  selectedMonth: number;
  selectedYear: number;
  currency: Currency;
}

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

const initialState: PreferencesState = {
  selectedMonth: readMonth(),
  selectedYear: readYear(),
  currency: readCurrency(),
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setMonthAction: (state, action: PayloadAction<number>) => {
      state.selectedMonth = action.payload;
      localStorage.setItem(MONTH_KEY, String(action.payload));
    },
    setYearAction: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
      localStorage.setItem(YEAR_KEY, String(action.payload));
    },
    setCurrencyAction: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
      localStorage.setItem(CURRENCY_KEY, action.payload);
    },
  },
});

export const { setMonthAction, setYearAction, setCurrencyAction } = preferencesSlice.actions;
export default preferencesSlice.reducer;
