import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Profile from './pages/Profile';
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
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="/stocks" replace />} />
          <Route path="stocks">
            <Route index element={<Stocks />} />
            <Route path=":symbol" element={<StockDetails />} />
          </Route>
          <Route path="mutual-funds">
            <Route index element={<MutualFunds />} />
            <Route path=":id" element={<MutualFundDetails />} />
          </Route>
          <Route path="etfs">
            <Route index element={<ETFs />} />
            <Route path=":id" element={<ETFDetails />} />
          </Route>
          <Route path="gold-silver" element={<GoldSilver />} />
          <Route path="commodities" element={<Commodities />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<PagePlaceholder title="Settings" />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
