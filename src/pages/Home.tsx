import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../features/navigation/components/Sidebar';
import ChatBot from '../components/ChatBot';
import BottomNav from '../components/layout/BottomNav';
import { AppPreferencesProvider } from '../context/AppPreferencesContext';

const Home: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AppPreferencesProvider>
            <div className="flex h-screen flex-col overflow-hidden bg-indigo-50 text-gray-900 font-sans pt-[60px]">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden relative">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden min-h-0 min-w-0 bg-white relative z-0 backdrop-blur-sm w-full max-w-full pb-[80px] font-sans text-gray-900 antialiased">
                        <Outlet />
                    </main>
                </div>
                <ChatBot />
                <BottomNav />
            </div>
        </AppPreferencesProvider>
    );
};

export default Home;
