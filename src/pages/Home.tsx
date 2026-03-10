import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../features/navigation/components/Sidebar';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-indigo-50 text-gray-900 font-sans">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex flex-1 flex-col overflow-y-auto bg-white/50 backdrop-blur-sm hide-scrollbar w-full">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
