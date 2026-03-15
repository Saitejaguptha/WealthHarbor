import React, { useState, useMemo } from 'react';
import { FiSearch, FiActivity, FiHome, FiCheckCircle } from 'react-icons/fi';
import { getMutualFunds, MF_SECTORS, FUND_HOUSES, refreshMutualFunds } from '../utils/mutualFundData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';

const MutualFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState('All');
    const [selectedHouse, setSelectedHouse] = useState('All');
    const [allFunds, setAllFunds] = useState(() => getMutualFunds());

    const filteredFunds = useMemo(() => {
        return allFunds.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fund.fundHouse.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSector === 'All' || fund.sector === selectedSector;
            const matchesHouse = selectedHouse === 'All' || fund.fundHouse === selectedHouse;
            return matchesSearch && matchesSector && matchesHouse;
        });
    }, [searchTerm, selectedSector, selectedHouse, allFunds]);

    const handleRefresh = () => {
        setAllFunds(refreshMutualFunds());
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="Mutual Funds"
                description="Maximize your wealth with professional management"
                onRefresh={handleRefresh}
                refreshLabel="Refresh Funds"
            >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 group">
                    <div className="lg:col-span-2 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-xl transition-colors group-focus-within:text-indigo-600" />
                        <input
                            type="text"
                            placeholder="Search funds or fund houses..."
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md text-indigo-950 font-medium placeholder:text-indigo-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                        >
                            <option value="All">All Sectors</option>
                            {MF_SECTORS.map(sector => <option key={sector} value={sector}>{sector}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 outline-none appearance-none transition-all cursor-pointer text-indigo-900 font-semibold shadow-sm hover:shadow-md"
                            value={selectedHouse}
                            onChange={(e) => setSelectedHouse(e.target.value)}
                        >
                            <option value="All">All Fund Houses</option>
                            {FUND_HOUSES.map(house => <option key={house} value={house}>{house}</option>)}
                        </select>
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFunds.map((fund) => (
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
                        Icon={FiCheckCircle}
                        analyzeLabel="Analyze Now"
                        metrics={[
                            { label: 'NAV', value: `₹${fund.nav}` },
                            { label: 'AUM', value: `₹${fund.aum}` },
                            { label: 'Exp.', value: `${fund.expenseRatio}%` }
                        ]}
                    />
                ))}
            </div>
        </div>
    );
};

export default MutualFunds;
