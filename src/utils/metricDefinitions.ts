
export interface MetricDefinition {
    name: string;
    description: string;
    formula?: string;
}

export const METRIC_GLOSSARY: Record<string, MetricDefinition> = {
    // Stocks
    'P/E Ratio': {
        name: 'Price-to-Earnings Ratio',
        description: 'The ratio of a company\'s share price to its earnings per share. It helps determine if a stock is overvalued or undervalued.',
        formula: 'P/E Ratio = Market Value per Share / Earnings per Share (EPS)'
    },
    'Market Cap': {
        name: 'Market Capitalization',
        description: 'The total value of all a company\'s shares of stock.',
        formula: 'Market Cap = Current Share Price x Total Number of Outstanding Shares'
    },
    'Div. Yield': {
        name: 'Dividend Yield',
        description: 'The ratio of a company\'s annual dividend compared to its share price.',
        formula: 'Dividend Yield = (Annual Dividend per Share / Current Share Price) x 100'
    },
    'ROCE': {
        name: 'Return on Capital Employed',
        description: 'A financial ratio that measures a company\'s profitability and the efficiency with which its capital is used.',
        formula: 'ROCE = Earnings Before Interest and Tax (EBIT) / Capital Employed'
    },
    'Debt to Equity': {
        name: 'Debt-to-Equity Ratio',
        description: 'A measure of the degree to which a company is financing its operations through debt versus wholly-owned funds.',
        formula: 'Debt-to-Equity = Total Liabilities / Total Shareholders\' Equity'
    },
    'Net Profit': {
        name: 'Net Profit',
        description: 'The actual profit after working expenses not included in the calculation of gross profit have been paid.',
        formula: 'Net Profit = Total Revenue - Total Expenses'
    },

    // Mutual Funds
    'NAV': {
        name: 'Net Asset Value',
        description: 'The value per share/unit of a mutual fund or ETF. It is the price at which investors buy or sell units of the fund.',
        formula: 'NAV = (Total Assets - Total Liabilities) / Number of Outstanding Units'
    },
    'Alpha': {
        name: 'Alpha',
        description: 'The excess return of an investment relative to the return of a benchmark index.',
        formula: 'Alpha = Actual Return - [Risk-Free Rate + Beta x (Market Return - Risk-Free Rate)]'
    },
    'Beta': {
        name: 'Beta',
        description: 'A measure of a fund\'s volatility relative to the overall market (benchmark). A beta of 1 means it moves with the market.',
        formula: 'Beta = Covariance(Fund Return, Market Return) / Variance(Market Return)'
    },
    'Expense Ratio': {
        name: 'Expense Ratio',
        description: 'The annual fee that all funds or ETFs charge their unit holders.',
        formula: 'Expense Ratio = (Total Fund Operating Expenses / Total Fund Assets) x 100'
    },
    'Exit Load': {
        name: 'Exit Load',
        description: 'A fee charged by AMCs at the time of redemption of mutual fund units.',
        formula: 'Usually calculated as a percentage of the NAV at the time of exit.'
    },

    // ETFs
    'Tracking Error': {
        name: 'Tracking Error',
        description: 'The difference between the performance of an ETF and its underlying benchmark index.',
        formula: 'Tracking Error = Standard Deviation of (ETF Return - Benchmark Return)'
    }
};
