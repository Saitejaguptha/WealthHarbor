import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './features/auth/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Stocks from './pages/Stocks';
import StockDetails from './pages/StockDetails';
import MutualFunds from './pages/MutualFunds';
import MutualFundDetails from './pages/MutualFundDetails';
import ETFs from './pages/ETFs';
import ETFDetails from './pages/ETFDetails';
import GoldSilver from './pages/GoldSilver';
import Commodities from './pages/Commodities';
import CommodityDetails from './pages/CommodityDetails';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';
import NewsDetails from './pages/NewsDetails';
import MarketAnalysis from './pages/MarketAnalysis';
import Indices from './pages/Indices';
import IndexDetails from './pages/IndexDetails';
import StocksInNews from './pages/StocksInNews';
import Notifications from './pages/Notifications';
import ForgotPassword from './pages/ForgotPassword';
import FIIDII from './pages/FIIDII';
import ScrollToTop from './components/common/ScrollToTop';

// Placeholder Pages
const PagePlaceholder = ({ title }: { title: string }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-indigo-900/40 p-10">
    <div className="text-6xl mb-6 opacity-20">📊</div>
    <h2 className="text-2xl font-bold uppercase tracking-widest mb-2">{title}</h2>
    <p className="text-sm border-t border-indigo-100 pt-4">This module is currently under development.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}>
            <Route index element={<Navigate to="/stocks" replace />} />
            <Route path="stocks">
              <Route index element={<Stocks />} />
              <Route path=":symbol" element={<StockDetails />} />
            </Route>
            <Route path="market-analysis" element={<MarketAnalysis />} />
            <Route path="indices" element={<Indices />} />
            <Route path="index-details/:name" element={<IndexDetails />} />
            <Route path="mutual-funds">
              <Route index element={<MutualFunds />} />
              <Route path=":id" element={<MutualFundDetails />} />
            </Route>
            <Route path="etfs">
              <Route index element={<ETFs />} />
              <Route path=":id" element={<ETFDetails />} />
            </Route>
            <Route path="gold-silver" element={<GoldSilver />} />
            <Route path="commodities">
              <Route index element={<Commodities />} />
              <Route path=":id" element={<CommodityDetails />} />
            </Route>
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="stocks-in-news" element={<StocksInNews />} />
            <Route path="news/:id" element={<NewsDetails />} />
            <Route path="fii-dii" element={<FIIDII />} />
            <Route path="settings" element={<PagePlaceholder title="Settings" />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
