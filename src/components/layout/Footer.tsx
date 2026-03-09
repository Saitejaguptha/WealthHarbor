import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [quote, setQuote] = useState({ content: 'Loading wisdom...', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                // Switching to dummyjson.com as api.quotable.io is currently experiencing SSL issues
                const response = await fetch('https://dummyjson.com/quotes/random');
                if (!response.ok) throw new Error('API unstable');
                const data = await response.json();
                setQuote({ content: data.quote, author: data.author });
            } catch (err) {
                // Fallback to a static pearl of wisdom if API is down
                setQuote({
                    content: "Wealth is the ability to fully experience life.",
                    author: "Henry David Thoreau"
                });
            }
        };
        fetchQuote();
    }, []);

    return (
        <footer className="h-[50px] bg-white border-t border-indigo-100 flex items-center justify-center px-6 shrink-0 shadow-sm z-50">
            <div className="text-xs md:text-sm font-medium text-indigo-400 italic text-center">
                "{quote.content}" {quote.author && <span className="not-italic font-bold opacity-60 ml-1">— {quote.author}</span>}
            </div>
        </footer>
    );
};

export default Footer;
