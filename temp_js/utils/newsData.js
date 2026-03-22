"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsById = exports.getNews = exports.mockNews = void 0;
exports.mockNews = [
    {
        id: "news-rbi-1",
        title: "RBI Holds Repo Rate at 6.5%, Maintains 'Withdrawal of Accommodation' Stance",
        summary: "The Monetary Policy Committee voted to keep interest rates unchanged to ensure inflation aligns with the target.",
        content: [
            "The Reserve Bank of India (RBI) Governor Shaktikanta Das announced today that the Monetary Policy Committee (MPC) has decided to keep the repo rate unchanged at 6.5%.",
            "The decision was driven by the need to balance economic growth with price stability. The Governor noted that while CPI inflation is on a downward trajectory, the board remains vigilant regarding food price shocks.",
            "Analysts at major Indian brokerages had largely expected this outcome, citing the global trend of 'higher-for-longer' interest rates and the RBI's focus on reaching the 4% inflation target.",
            "Bank stocks showed a mixed reaction, with HDFC Bank and ICICI Bank ending the session slightly lower, while public sector lenders like SBI managed to stay in the green."
        ],
        date: "2026-03-15T11:30:00Z",
        source: "Economic Times India",
        category: "Economy",
        impact: 'High'
    },
    {
        id: "news-sebi-t0-2",
        title: "SEBI Introduces T+0 Settlement for Select Stocks in Indian Markets",
        summary: "The market regulator is pushing for same-day settlement to enhance liquidity and efficiency.",
        content: [
            "The Securities and Exchange Board of India (SEBI) has officially kicked off the pilot project for T+0 settlement cycles for a limited universe of 25 stocks.",
            "This move follows the successful transition to T+1 settlement last year, making India one of the few large markets moving toward instantaneous settlements.",
            "Regulators believe this will unlock collateral and significantly reduce credit risk in the equity ecosystem. However, small brokers have raised concerns about the technological costs of such a rapid transition.",
            "The initial pilot includes blue-chip stocks like Reliance, TCS, and ITC. Market participants will monitor the volumes and efficiency of this move closely over the next month."
        ],
        date: "2026-03-14T09:00:00Z",
        source: "Mint",
        category: "Markets",
        impact: 'High'
    },
    {
        id: "news-tech-ai-3",
        title: "India's Tech Giants Invest Heavily in Sovereign AI Infrastructure",
        summary: "TCS and Infosys lead the charge in establishing localized LLMs and data sovereign compute clusters.",
        content: [
            "Leading Indian IT services firms are pivoting their strategies toward building 'Sovereign AI' solutions for the domestic and Middle Eastern markets.",
            "TCS recently announced a multi-crore investment into a new center of excellence focused on developing Large Language Models (LLMs) trained on Indic languages.",
            "This shift comes as the Indian government continues to emphasize data localization and the development of indigenous tech stacks.",
            "Industry experts believe this could open up massive new revenue streams in the public sector and regulated industries like Healthcare and Defense."
        ],
        date: "2026-03-13T10:15:00Z",
        source: "The Tech Pulse",
        category: "Tech",
        impact: 'Medium'
    },
    {
        id: "news-budget-expect-4",
        title: "Markets Rally on Pre-Budget Optimism and Capital Expenditure Hopes",
        summary: "Nifty 50 touches new lifetime highs as investors anticipate continued focus on infrastructure.",
        content: [
            "The Indian equity indices reached new milestones today, with the Nifty 50 crossing the critical 22,500 mark during intra-day trading.",
            "The rally is largely fueled by expectations that the upcoming Union Budget will maintain its aggressive stance on capital expenditure, particularly in the Railway and Defense sectors.",
            "Domestic institutional investors (DIIs) have been strong buyers, offsetting the sporadic outflows from foreign portfolio investors (FPIs).",
            "Construction and Metal stocks were the top gainers, with companies like L&T and Tata Steel leading the charge."
        ],
        date: "2026-03-12T15:45:00Z",
        source: "Business Standard",
        category: "Markets",
        impact: 'Medium'
    },
    {
        id: "news-gold-5",
        title: "Gold Prices Surge to Record Highs Amid Global Economic Uncertainty",
        summary: "Spot gold hit a new all-time high as investors seek safety in the precious metal during volatile market conditions.",
        content: [
            "Gold prices have broken through major resistance levels today, reaching a record high of over ₹75,000 per 10 grams in the domestic market.",
            "The surge is attributed to a combination of geopolitical tensions in the Middle East and expectations that major central banks might pivot toward rate cuts earlier than anticipated.",
            "Domestic jewelry demand has seen a temporary dip due to the high prices, but investment demand via Sovereign Gold Bonds and Gold ETFs continues to stay robust.",
            "Financial advisors suggest that while the long-term outlook for gold remains positive, investors should be cautious of short-term pullbacks and consider staggered investments."
        ],
        date: "2026-03-11T08:30:00Z",
        source: "Bloomberg Quint",
        category: "Crypto", // Mock category mapping for diversity
        impact: 'High'
    },
    {
        id: "news-oil-6",
        title: "Crude Oil Stabilizes as Global Demand Outlook Projects Growth",
        summary: "Oil prices held steady today as OPEC+ maintains its production cut strategy while global demand remains resilient.",
        content: [
            "Brent crude oil futures settled at $85 per barrel today, as the market balances supply constraints with recovering industrial demand from major economies like China and India.",
            "OPEC+ leaders have reiterated their commitment to maintaining production ceilings to prevent a supply glut, even as non-OPEC production from the US continues to hit record levels.",
            "For the Indian economy, these levels are manageable, but further upside could weigh on the current account deficit and fuel inflation.",
            "Energy sector stocks in the Indian market, particularly upstream companies like ONGC, have seen positive momentum as realizations remain high."
        ],
        date: "2026-03-10T14:20:00Z",
        source: "Reuters Business",
        category: "Geopolitics",
        impact: 'Medium'
    }
];
const getNews = () => {
    return exports.mockNews;
};
exports.getNews = getNews;
const getNewsById = (id) => {
    return exports.mockNews.find(article => article.id === id);
};
exports.getNewsById = getNewsById;
