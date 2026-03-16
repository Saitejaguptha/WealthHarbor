import React, { useState, useMemo } from 'react';
import { FiSearch, FiActivity } from 'react-icons/fi';
import { getMutualFunds, refreshMutualFunds } from '../utils/mutualFundData';
import AssetCard from '../components/common/AssetCard';
import PageHeader from '../components/common/PageHeader';

const MutualFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const funds = getMutualFunds();

    const filteredFunds = useMemo(() => {
        return funds.filter(fund => {
            const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                fund.fundHouse.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [funds, searchTerm]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <PageHeader
                title="Mutual Funds"
                description="Explore top-rated mutual funds curated for your goals"
                onRefresh={refreshMutualFunds}
                refreshLabel="Refresh NAV"
            >
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-hover:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search funds or AMC..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white/70 backdrop-blur-md border border-white rounded-2xl shadow-lg shadow-indigo-100/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium transition-all"
                        />
                    </div>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
        </div>
    );
};

export default MutualFunds;
