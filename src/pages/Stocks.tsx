import React, { useState, useMemo } from 'react';
import { FiTrendingUp, FiSearch } from 'react-icons/fi';
import { getStocks, refreshStocks } from '../utils/stockData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';

const Stocks: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allStocks, setAllStocks] = useState(() => getStocks());

    const filteredStocks = useMemo(() => {
        return allStocks.filter(stock =>
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allStocks]);

    const handleRefresh = () => {
        setAllStocks(refreshStocks());
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="Stocks"
                description="Monitor and analyze top Indian stocks"
                onRefresh={handleRefresh}
                refreshLabel="Refresh Stocks"
            >
                <div className="relative group max-w-2xl">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                    <input
                        type="text"
                        placeholder="Search by name or symbol (e.g. RELIANCE)..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStocks.length > 0 ? (
                    filteredStocks.map((stock) => (
                        <AssetCard
                            key={stock.id}
                            symbol={stock.symbol}
                            name={stock.name}
                            price={stock.price}
                            change={stock.changePercent}
                            changePercent={true}
                            isPositive={stock.change >= 0}
                            tags={[stock.marketCap, stock.sector]}
                            detailsRoute={`/stocks/${stock.symbol.toLowerCase()}`}
                            Icon={FiTrendingUp}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No matching stocks</h3>
                        <p className="text-indigo-900/30">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stocks;
