export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string[];
  date: string;
  source: string;
  category: 'Geopolitics' | 'Economy' | 'Markets' | 'Tech' | 'Crypto';
  impact?: 'High' | 'Medium' | 'Low';
}

export const mockNews: NewsArticle[] = [
  {
    id: "news-iran-usa-1",
    title: "Escalating Tensions Between Iran and the USA Impact Global Oil Prices",
    summary: "Recent geopolitical events in the Middle East have caused a surge in crude oil futures.",
    content: [
      "In the wake of recent developments, tensions between Iran and the United States have reached a new high, immediately sending ripples through global energy markets.",
      "Brent crude oil futures spiked by 4% early Monday morning as traders reacted to the potential for supply chain disruptions in the Strait of Hormuz, a critical chokepoint for global oil shipments.",
      "Market analysts are warning that prolonged uncertainty could lead to sustained higher energy costs, filtering down to consumer prices and complicating central banks' efforts to tame inflation.",
      "Diplomatic efforts are reportedly underway, but the situation remains highly fluid. Energy sector stocks (XLE) advanced notably on the news."
    ],
    date: "2026-03-15T08:30:00Z",
    source: "Global Finance Chronicle",
    category: "Geopolitics",
    impact: 'High'
  },
  {
    id: "news-fed-meeting-2",
    title: "Federal Reserve Holds Rates Steady, Hints at Potential Cuts",
    summary: "The Fed concluded its latest policy meeting without changing the baseline interest rate but signaled optimism.",
    content: [
      "The Federal Reserve concluded its highly anticipated two-day policy meeting today, announcing its decision to hold its benchmark interest rate steady in the current target range.",
      "During the press conference, the Fed Chair noted that while inflation has significantly cooled from its peak, the central bank is waiting for \"more convincing evidence\" that price growth is sustainably returning to the 2% target.",
      "Despite the hold, the updated \"dot plot\" of economic projections indicated a consensus among committee members for at least one, and possibly two, rate cuts before the end of the year, assuming economic data continues its current trajectory.",
      "Equity markets largely took the news in stride, with the S&P 500 ending the session slightly higher as investors priced in the slightly dovish tone."
    ],
    date: "2026-03-14T14:00:00Z",
    source: "Market Watchtower",
    category: "Economy",
    impact: 'High'
  },
  {
    id: "news-gold-record-3",
    title: "Gold Hits Record High Amidst Global Uncertainty",
    summary: "Refuge demand drives precious metals to unprecedented valuations.",
    content: [
      "Gold prices broke through previous resistance levels today to establish a new all-time high, driven by a combination of retail buying, central bank accumulation, and institutional hedging.",
      "The surge in the precious metal's value is largely attributed to its traditional role as a safe-haven asset during times of geopolitical strife and economic uncertainty.",
      "Silver and platinum also saw sympathetic rallies, though gold remains the clear standout performer in the commodities sector this quarter.",
      "Analysts suggest that if current macroeconomic conditions persist, gold could see further upside before establishing a new consolidation range."
    ],
    date: "2026-03-13T09:15:00Z",
    source: "Commodity Insights",
    category: "Markets",
    impact: 'Medium'
  },
  {
    id: "news-tech-ai-4",
    title: "Major Tech Firms Ramp Up AI Infrastructure Deals",
    summary: "Semiconductor demands reach fever pitch as cloud providers expand data centers.",
    content: [
      "The race for dominance in Artificial Intelligence is fueling a massive capital expenditure cycle among the world's largest technology companies.",
      "Recent SEC filings reveal multibillion-dollar commitments to expand data center footprints and procure the latest generation of heavy-compute GPUs.",
      "This infrastructure build-out is providing a massive tailwind for semiconductor manufacturers, power management companies, and specialized cooling providers.",
      "However, some industry watchers are beginning to question the timeline for realizing a return on these massive investments."
    ],
    date: "2026-03-12T11:45:00Z",
    source: "Silicon Valley Daily",
    category: "Tech",
    impact: 'Medium'
  }
];

export const getNews = (): NewsArticle[] => {
  return mockNews;
};

export const getNewsById = (id: string): NewsArticle | undefined => {
  return mockNews.find(article => article.id === id);
};
