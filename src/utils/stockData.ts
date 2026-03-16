import type {
    Stock, MarketCap, QuarterlyResult, BalanceSheetYear, ProfitLossYear,
    CashFlowYear, ShareholdingPattern, RevenueMixItem, PeerCompany,
    CorporateAction, Supplier, InvestmentView
} from '../types/stock';
import { generatePriceHistory } from './historyUtils';

export const SECTORS = [
    'Banking', 'IT Services', 'FMCG', 'Energy', 'Automobile',
    'Healthcare', 'Telecom', 'Construction', 'Metal & Mining',
    'Chemicals', 'Consumer Durables', 'Financial Services', 'Agriculture'
];

export const MARKET_CAPS: MarketCap[] = ['High Cap', 'Mid Cap', 'Small Cap', 'Micro Cap'];

const ALL_SYMBOLS = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'BHARTIARTL', 'SBIN', 'ITC', 'ASIANPAINT', 'TITAN', 'LTIM', 'MARUTI', 'SUNPHARMA', 'TATASTEEL', 'NTPC'];
const ALL_NAMES   = ['Reliance Industries', 'Tata Consultancy Services', 'HDFC Bank', 'Infosys Ltd', 'ICICI Bank', 'Bharti Airtel', 'State Bank of India', 'ITC Ltd', 'Asian Paints', 'Titan Company', 'LTI Mindtree', 'Maruti Suzuki', 'Sun Pharmaceutical', 'Tata Steel', 'NTPC Ltd'];

const rand  = (min: number, max: number) => parseFloat((min + Math.random() * (max - min)).toFixed(2));
const randI = (min: number, max: number) => Math.floor(min + Math.random() * (max - min));
const shuffled = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

// ── Quarterly Results ────────────────────────────────────────────────
const generateQuarterlyResults = (baseSales: number): QuarterlyResult[] =>
    ['Q1 FY22','Q2 FY22','Q3 FY22','Q4 FY22','Q1 FY23','Q2 FY23','Q3 FY23','Q4 FY23','Q1 FY24','Q2 FY24','Q3 FY24','Q4 FY24']
    .map(quarter => {
        const sales         = Math.round(baseSales * (0.85 + Math.random() * 0.4));
        const expenses      = Math.round(sales * (0.65 + Math.random() * 0.15));
        const operatingProfit = sales - expenses;
        const opm           = parseFloat(((operatingProfit / sales) * 100).toFixed(1));
        const otherIncome   = Math.round(sales * rand(0.01, 0.05));
        const profitBeforeTax = operatingProfit + otherIncome;
        const taxPercent    = parseFloat(rand(22, 30).toFixed(1));
        const netProfit     = Math.round(profitBeforeTax * (1 - taxPercent / 100));
        const eps           = parseFloat((netProfit / randI(100, 1000)).toFixed(2));
        return { quarter, sales, expenses, operatingProfit, opm, otherIncome, profitBeforeTax, taxPercent, netProfit, eps };
    });

// ── Balance Sheet ────────────────────────────────────────────────────
const generateBalanceSheet = (baseEquity: number): BalanceSheetYear[] =>
    ['FY22','FY23','FY24'].map(year => {
        const equityCapital   = Math.round(baseEquity * rand(0.9, 1.1));
        const reserves        = Math.round(equityCapital * rand(5, 15));
        const borrowings      = Math.round(equityCapital * rand(0.5, 3));
        const otherLiabilities= Math.round(equityCapital * rand(0.3, 1));
        const totalLiabilities= equityCapital + reserves + borrowings + otherLiabilities;
        const fixedAssets     = Math.round(totalLiabilities * rand(0.3, 0.5));
        const cwip            = Math.round(totalLiabilities * rand(0.05, 0.1));
        const investments     = Math.round(totalLiabilities * rand(0.1, 0.3));
        const otherAssets     = Math.round(totalLiabilities - fixedAssets - cwip - investments);
        return { year, equityCapital, reserves, borrowings, otherLiabilities, totalLiabilities, fixedAssets, cwip, investments, otherAssets, totalAssets: Math.round(totalLiabilities) };
    });

// ── Profit & Loss ─────────────────────────────────────────────────────
const generateProfitLoss = (baseSales: number): ProfitLossYear[] =>
    ['FY22','FY23','FY24'].map(year => {
        const sales           = Math.round(baseSales * rand(0.8, 1.3));
        const expenses        = Math.round(sales * rand(0.65, 0.80));
        const operatingProfit = sales - expenses;
        const opm             = parseFloat(((operatingProfit / sales) * 100).toFixed(1));
        const otherIncome     = Math.round(sales * rand(0.01, 0.05));
        const depreciation    = Math.round(sales * rand(0.02, 0.06));
        const interest        = Math.round(sales * rand(0.01, 0.04));
        const profitBeforeTax = operatingProfit + otherIncome - depreciation - interest;
        const tax             = Math.round(profitBeforeTax * rand(0.22, 0.30));
        const netProfit       = profitBeforeTax - tax;
        const eps             = parseFloat((netProfit / randI(100, 1000)).toFixed(2));
        const dividendPayout  = parseFloat(rand(10, 40).toFixed(1));
        return { year, sales, expenses, operatingProfit, opm, otherIncome, depreciation, interest, profitBeforeTax, tax, netProfit, eps, dividendPayout };
    });

// ── Cash Flow ──────────────────────────────────────────────────────────
const generateCashFlow = (baseSales: number): CashFlowYear[] =>
    ['FY22','FY23','FY24'].map(year => {
        const operatingActivity  = Math.round(baseSales * rand(0.1, 0.25));
        const investingActivity  = -Math.round(baseSales * rand(0.05, 0.15));
        const financingActivity  = -Math.round(baseSales * rand(0.01, 0.1));
        return { year, operatingActivity, investingActivity, financingActivity, netCashFlow: operatingActivity + investingActivity + financingActivity };
    });

// ── Shareholding ──────────────────────────────────────────────────────
const generateShareholding = (): ShareholdingPattern[] =>
    ['Dec 2023','Mar 2024','Jun 2024','Sep 2024'].map(quarter => {
        const promoters   = parseFloat(rand(40, 75).toFixed(2));
        const fii         = parseFloat(rand(5, 25).toFixed(2));
        const dii         = parseFloat(rand(3, 15).toFixed(2));
        const government  = parseFloat(rand(0, 3).toFixed(2));
        const others      = parseFloat(rand(0.5, 3).toFixed(2));
        const publicH     = parseFloat((100 - promoters - fii - dii - government - others).toFixed(2));
        return { quarter, promoters, fii, dii, government, public: publicH, others, noOfShareholders: randI(100000, 2000000) };
    });

// ── Revenue Mix ───────────────────────────────────────────────────────
const REVENUE_SEGMENTS = [
    ['Retail', 'Wholesale', 'Exports', 'Licensing'],
    ['Domestic', 'International', 'Government', 'Enterprise'],
    ['Products', 'Services', 'Subscriptions', 'Consulting'],
    ['Oil & Gas', 'Petrochemicals', 'Retail', 'Digital'],
    ['Loans', 'Investments', 'Insurance', 'Fees'],
];
const LOCATION_SEGS  = [['India', 'USA', 'Europe', 'APAC', 'Middle East'], ['North', 'South', 'East', 'West', 'Central']];
const DONUT_COLORS = ['#6366F1','#8B5CF6','#EC4899','#F59E0B','#10B981','#06B6D4','#F43F5E','#14B8A6'];

const makeBreakup = (labels: string[]): RevenueMixItem[] => {
    let remaining = 100;
    return labels.map((label, i) => {
        const value = i === labels.length - 1 ? remaining : Math.round(rand(5, remaining - (labels.length - i - 1) * 5));
        remaining -= value;
        return { label, value: Math.max(value, 3), color: DONUT_COLORS[i % DONUT_COLORS.length] };
    });
};

// ── Corporate Actions ─────────────────────────────────────────────────
const generateCorporateActions = (): CorporateAction[] => [
    { date: 'Jan 2025', type: 'Dividend', details: `Interim dividend declared`, amount: `₹${randI(2,20)}/share` },
    { date: 'Oct 2024', type: 'Dividend', details: `Final dividend for FY24`, amount: `₹${randI(2,20)}/share` },
    { date: 'Jul 2024', type: 'Bonus',    details: `Bonus shares issued in ratio 1:2`, amount: '1:2' },
    { date: 'Mar 2023', type: 'Split',    details: `Stock split`, amount: `${randI(2,10)}:1` },
    { date: 'Jan 2023', type: 'Dividend', details: `Interim dividend`, amount: `₹${randI(1,10)}/share` },
    { date: 'Aug 2022', type: 'Buyback',  details: `Buyback at premium to market price`, amount: `₹${randI(50,200)} Cr` },
];

// ── Suppliers ─────────────────────────────────────────────────────────
const SUPPLIER_POOL = [
    { name: 'Tata Steel Ltd',        category: 'Raw Material',  relationship: 'Long-term partner', country: 'India' },
    { name: 'BASF SE',               category: 'Chemicals',     relationship: 'Strategic supplier', country: 'Germany' },
    { name: 'Honeywell International', category: 'Technology',  relationship: 'Preferred vendor', country: 'USA' },
    { name: 'Siemens AG',            category: 'Engineering',   relationship: 'Long-term partner', country: 'Germany' },
    { name: 'Samsung Display',       category: 'Components',    relationship: 'Exclusive supply agreement', country: 'South Korea' },
    { name: 'Reliance Industries',   category: 'Petrochemicals',relationship: 'Annual contract', country: 'India' },
    { name: 'L&T Construction',      category: 'Infrastructure',relationship: 'Project-based', country: 'India' },
    { name: 'ABB Group',             category: 'Power Equipment',relationship: 'Strategic supplier', country: 'Switzerland' },
    { name: 'Infosys BPO',           category: 'IT Services',   relationship: 'Managed services agreement', country: 'India' },
    { name: 'Adani Ports',           category: 'Logistics',     relationship: 'Long-term agreement', country: 'India' },
];

const generateSuppliers = (): Supplier[] => shuffled(SUPPLIER_POOL).slice(0, randI(4, 7));

// ── Peers ─────────────────────────────────────────────────────────────
const generatePeers = (currentSymbol: string, currentPrice: number, sector: string): PeerCompany[] => {
    const sectorPeers: Record<string, { name: string; symbol: string }[]> = {
        'IT Services': [
            { name: 'TCS', symbol: 'TCS' }, { name: 'Infosys', symbol: 'INFY' },
            { name: 'HCL Tech', symbol: 'HCLTECH' }, { name: 'Wipro', symbol: 'WIPRO' }, { name: 'LTI Mindtree', symbol: 'LTIM' }
        ],
        'Banking': [
            { name: 'HDFC Bank', symbol: 'HDFCBANK' }, { name: 'ICICI Bank', symbol: 'ICICIBANK' },
            { name: 'SBI', symbol: 'SBIN' }, { name: 'Kotak Bank', symbol: 'KOTAKBANK' }, { name: 'Axis Bank', symbol: 'AXISBANK' }
        ],
        'default': [
            { name: 'Reliance', symbol: 'RELIANCE' }, { name: 'HDFC Bank', symbol: 'HDFCBANK' },
            { name: 'Infosys', symbol: 'INFY' }, { name: 'ITC Ltd', symbol: 'ITC' }, { name: 'Titan Co.', symbol: 'TITAN' }
        ]
    };
    const pool = sectorPeers[sector] || sectorPeers['default'];
    return pool.map(p => ({
        ...p,
        price: parseFloat((currentPrice * rand(0.5, 2)).toFixed(2)),
        peRatio: parseFloat(rand(10, 60).toFixed(1)),
        marketCap: `${randI(5000, 1500000)} Cr`,
        roce: parseFloat(rand(8, 40).toFixed(1)),
        roe: parseFloat(rand(8, 35).toFixed(1)),
        dividendYield: parseFloat(rand(0, 4).toFixed(2)),
        isCurrentStock: p.symbol === currentSymbol,
    }));
};

// ── Investment View ───────────────────────────────────────────────────
const BULLISH_RATIONALE = [
    'Strong earnings momentum and revenue diversification make this a premier pick.',
    'Consistent ROCE improvement signals efficient capital deployment.',
    'Market leadership with wide competitive moat provides pricing power.',
    'Expanding margins driven by operational efficiency.',
    'Industry tailwinds and favorable policy environment support growth.',
];
const BEARISH_RATIONALE = [
    'Elevated valuations leave limited margin of safety at current levels.',
    'Near-term headwinds from rising input costs expected to compress margins.',
    'Global macro uncertainty may dampen near-term demand outlook.',
];
const KEY_DRIVERS_POOL = ['Revenue growth acceleration','Margin expansion','Debt reduction','New product launches','Market share gains','Export growth','Capacity expansion','Cost efficiencies'];
const KEY_RISKS_POOL   = ['Regulatory changes','Competition','FX volatility','Raw material prices','Execution risk','Demand slowdown','Credit risk','Interest rate sensitivity'];

const generateView = (term: 'Short Term' | 'Long Term', price: number): InvestmentView => {
    const outlooks: Array<'Bullish' | 'Bearish' | 'Neutral'> = ['Bullish', 'Bullish', 'Bullish', 'Neutral', 'Bearish'];
    const outlook = outlooks[randI(0, 5)];
    const multiplier = term === 'Long Term' ? rand(1.3, 2.1) : rand(0.95, 1.25);
    return {
        term,
        outlook,
        targetPrice: parseFloat((price * multiplier).toFixed(2)),
        rationale: outlook === 'Bullish' ? shuffled(BULLISH_RATIONALE)[0] : shuffled(BEARISH_RATIONALE)[0],
        keyDrivers: shuffled(KEY_DRIVERS_POOL).slice(0, 3),
        keyRisks: shuffled(KEY_RISKS_POOL).slice(0, 3),
        timeframe: term === 'Short Term' ? '3–6 Months' : '2–3 Years',
    };
};

// ── Pros/Cons ──────────────────────────────────────────────────────────
const PROS_POOL = [
    'Strong revenue growth YoY','Debt-free or low-debt company','Consistent dividend payer',
    'Market leader in its segment','Strong promoter holding','High return on equity (ROE)',
    'Expanding market share','Robust cash flows from operations','Strong brand moat',
    'Diversified revenue streams','Healthy operating margins','Efficient capital allocation',
    'Growing export revenues','Strong balance sheet','Board with proven track record'
];
const CONS_POOL = [
    'High valuation relative to peers','Exposed to commodity price volatility',
    'Regulatory risk in core sector','Concentrated customer base','High working capital requirements',
    'Declining promoter holding','Rising debtor days','Competitive pressure from peers',
    'Margin compression in recent quarters','Dependence on imported raw materials',
    'Currency risk for export-oriented business','High capital expenditure plans',
    'Uncertain global demand outlook','Low dividend yield compared to peers',
    'Pending litigation/regulatory issues'
];

// ── Main Generator ─────────────────────────────────────────────────────
export const generateRandomStocks = (count: number): Stock[] =>
    Array.from({ length: count }).map((_, i) => {
        const change    = parseFloat(((Math.random() * 20) - 10).toFixed(2));
        const price     = parseFloat((200 + Math.random() * 5000).toFixed(2));
        const baseSales = 5000 + Math.random() * 200000;
        const symbol    = ALL_SYMBOLS[i % ALL_SYMBOLS.length];
        const sector    = SECTORS[i % SECTORS.length];
        const revSegs   = shuffled(REVENUE_SEGMENTS)[0];
        const locSegs   = shuffled(LOCATION_SEGS)[0];
        const fairValue = parseFloat((price * rand(0.85, 1.35)).toFixed(2));

        return {
            id: `stock-${i}`,
            symbol,
            name: ALL_NAMES[i % ALL_NAMES.length],
            price,
            change,
            changePercent: parseFloat((change / (price / 100)).toFixed(2)),
            marketCap:     MARKET_CAPS[i % 3],
            sector,

            peRatio:       parseFloat(rand(10, 60).toFixed(2)),
            marketCapValue:(1000 + Math.random() * 1500000).toFixed(0) + ' Cr',
            dividendYield: parseFloat(rand(0, 3).toFixed(2)),
            netProfit:     Math.round(500 + Math.random() * 10000) + ' Cr',
            roce:          parseFloat(rand(5, 35).toFixed(1)),
            debtToEquity:  parseFloat(rand(0, 1.5).toFixed(2)),
            fiftyTwoWeekHigh: parseFloat((price * rand(1.01, 1.4)).toFixed(2)),
            fiftyTwoWeekLow:  parseFloat((price * rand(0.6, 0.999)).toFixed(2)),
            history:       generatePriceHistory(price),

            bookValue:  parseFloat((price / rand(1.5, 8)).toFixed(2)),
            dayHigh:    parseFloat((price * rand(1.001, 1.04)).toFixed(2)),
            dayLow:     parseFloat((price * rand(0.96, 0.999)).toFixed(2)),
            roe:        parseFloat(rand(8, 40).toFixed(1)),
            faceValue:  [1, 2, 5, 10][randI(0, 4)],

            pros: shuffled(PROS_POOL).slice(0, randI(3, 6)),
            cons: shuffled(CONS_POOL).slice(0, randI(3, 5)),

            quarterlyResults: generateQuarterlyResults(baseSales / 4),
            balanceSheet:     generateBalanceSheet(baseSales / 10),
            profitLoss:       generateProfitLoss(baseSales),
            cashFlow:         generateCashFlow(baseSales),
            shareholding:     generateShareholding(),

            revenueMix:      makeBreakup(shuffled(revSegs)),
            locationBreakup: makeBreakup(shuffled(locSegs)),
            productBreakup:  makeBreakup(shuffled(shuffled(REVENUE_SEGMENTS)[1])),

            peers: generatePeers(symbol, price, sector),

            corporateActions: generateCorporateActions(),
            suppliers:        generateSuppliers(),

            annualReportUrl:           'https://example.com/annual-report',
            investorPresentationUrl:   'https://example.com/investor-presentation',
            earningsReleaseUrl:        'https://example.com/earnings-release',
            conferenceCallUrl:         'https://example.com/conference-call',
            conferenceCallSummary:     `Management highlighted continued focus on operational efficiency and margin improvement. The company reported strong growth in its core segments. Key areas of investment include digital transformation, capacity expansion, and international markets. Management remains confident of delivering double-digit revenue growth for FY25. On capex, management guided ₹${randI(1000, 10000)} Cr for the next fiscal year. Analyst questions focused on margin trajectory and competitive landscape.`,

            shortTermView: generateView('Short Term', price),
            longTermView:  generateView('Long Term', price),

            fundamentalsScore: randI(45, 95),
            valuationScore:    randI(30, 90),
            fairValue,
        };
    });

let cachedStocks: Stock[] | null = null;

export const refreshStocks = () => { cachedStocks = generateRandomStocks(15); return cachedStocks; };
export const getStocks     = () => { if (!cachedStocks) cachedStocks = generateRandomStocks(15); return cachedStocks; };
export const getStockBySymbol = (symbol: string) => getStocks().find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
