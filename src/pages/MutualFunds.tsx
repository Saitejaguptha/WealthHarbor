import React, { useState, useMemo } from 'react';
import { FiSearch, FiActivity, FiPieChart, FiBriefcase } from 'react-icons/fi';
import { getMutualFunds, refreshMutualFunds, MF_SECTORS, FUND_HOUSES } from '../utils/mutualFundData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';
import PageShell from '../components/layout/PageShell';

const MutualFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState<string>('All');
    const [selectedHouse, setSelectedHouse] = useState<string>('All');

    const funds = getMutualFunds();

    const filteredFunds = useMemo(() => {
        return funds.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                fund.fundHouse.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || fund.sector === selectedSector;
            const matchesHouse = selectedHouse === 'All' || fund.fundHouse === selectedHouse;
            return matchesSearch && matchesSector && matchesHouse;
        });
    }, [funds, searchTerm, selectedSector, selectedHouse]);

    return (
        <PageShell className="animate-in fade-in duration-700">
            <PageHeader
                title="Mutual Funds"
                description="Explore top-rated mutual funds curated for your goals"
                onRefresh={refreshMutualFunds}
                refreshLabel="Refresh NAV"
            >
                <div className="flex flex-col xl:flex-row gap-4 w-full">
                    {/* Search Bar */}
                    <div className="relative group flex-[2]">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-hover:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search funds or AMC (e.g. Parag Parikh)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-md hover:shadow-lg text-indigo-950 font-medium placeholder:text-indigo-300"
                        />
                    </div>

                    {/* Filters Container */}
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        {/* Category Filter */}
                        <div className="relative flex-1">
                            <FiPieChart className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                {MF_SECTORS.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-indigo-300">▼</span>
                            </div>
                        </div>

                        {/* Fund House Filter */}
                        <div className="relative flex-1">
                            <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                            <select
                                className="w-full pl-12 pr-10 py-4 bg-white border-2 border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-950 font-semibold shadow-md hover:shadow-lg"
                                value={selectedHouse}
                                onChange={(e) => setSelectedHouse(e.target.value)}
                            >
                                <option value="All">All Fund Houses</option>
                                {FUND_HOUSES.map(house => <option key={house} value={house}>{house}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-indigo-300">▼</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children">
                {filteredFunds.length > 0 ? (
                    filteredFunds.map((fund) => (
                        <AssetCard
                            key={fund.id}
                            name={fund.name}
                            subtitle={fund.fundHouse}
                            price={fund.nav}
                            change={fund.return1Y}
                            changePercent={true}
                            isPositive={fund.return1Y >= 0}
                            tags={[fund.sector, `${fund.rating}★`]}
                            detailsRoute={`/mutual-funds/${fund.id}`}
                            Icon={FiActivity}
                            analyzeLabel="Analyze Fund"
                            metrics={[
                                { label: 'Exp. Ratio', value: `${fund.expenseRatio}%` },
                                { label: 'AUM', value: `₹${fund.aum}` }
                            ]}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg py-8 font-medium">No mutual funds found matching your criteria.</p>
                )}
            </div>
        </PageShell>
    );
};

export default MutualFunds;
