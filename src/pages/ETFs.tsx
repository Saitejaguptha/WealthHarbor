import React, { useState, useMemo } from 'react';
import { FiSearch, FiPieChart, FiActivity, FiHome, FiCheckCircle } from 'react-icons/fi';
import { getETFs, ETF_SECTORS, ETF_MARKET_CAPS, ETF_FUND_HOUSES, refreshETFs } from '../utils/etfData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';

const ETFs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedCap, setSelectedCap] = useState<string>('All');
    const [selectedHouse, setSelectedHouse] = useState<string>('All');

    const [allETFs, setAllETFs] = useState(() => getETFs());

    const filteredETFs = useMemo(() => {
        return allETFs.filter(etf => {
            const matchesSearch = etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                etf.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || etf.sector === selectedSector;
            const matchesCap = selectedCap === 'All' || etf.marketCap === selectedCap;
            const matchesHouse = selectedHouse === 'All' || etf.fundHouse === selectedHouse;
            return matchesSearch && matchesSector && matchesCap && matchesHouse;
        });
    }, [searchTerm, selectedSector, selectedCap, selectedHouse, allETFs]);

    const handleRefresh = () => {
        setAllETFs(refreshETFs());
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="Exchange Traded Funds"
                description="Low-cost, diversified investment vehicles for your portfolio"
                onRefresh={handleRefresh}
                refreshLabel="Refresh ETFs"
            >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 group">
                    <div className="lg:col-span-2 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                        <input
                            type="text"
                            placeholder="Search ETFs by name or symbol..."
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                        >
                            <option value="All">All Sectors</option>
                            {ETF_SECTORS.map(sector => <option key={sector} value={sector}>{sector}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                            value={selectedCap}
                            onChange={(e) => setSelectedCap(e.target.value)}
                        >
                            <option value="All">All Caps</option>
                            {ETF_MARKET_CAPS.map(cap => <option key={cap} value={cap}>{cap}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                            value={selectedHouse}
                            onChange={(e) => setSelectedHouse(e.target.value)}
                        >
                            <option value="All">All Houses</option>
                            {ETF_FUND_HOUSES.map(house => <option key={house} value={house}>{house}</option>)}
                        </select>
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredETFs.length > 0 ? (
                    filteredETFs.map((etf) => (
                        <AssetCard
                            key={etf.id}
                            symbol={etf.symbol}
                            name={etf.name}
                            subtitle={etf.fundHouse}
                            price={etf.price}
                            change={etf.changePercent}
                            changePercent={true}
                            isPositive={etf.change >= 0}
                            tags={[etf.sector, etf.marketCap]}
                            detailsRoute={`/etfs/${etf.id}`}
                            analyzeLabel="Analyze ETF"
                            Icon={FiCheckCircle}
                            metrics={[
                                { label: 'Expense Ratio', value: `${etf.expenseRatio}%` },
                                { label: 'AUM', value: `₹${etf.aum}` }
                            ]}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-indigo-900/40 uppercase tracking-widest">No ETFs found</h3>
                        <p className="text-indigo-900/30">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ETFs;
