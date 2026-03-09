import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../features/navigation/components/Sidebar';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-indigo-50 text-gray-900 font-sans">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex flex-1 flex-col overflow-y-auto bg-white/50 backdrop-blur-sm hide-scrollbar">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
