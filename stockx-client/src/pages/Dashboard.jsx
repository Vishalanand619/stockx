import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StockTable from "../components/StockTable";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(() => {
    return JSON.parse(localStorage.getItem("stockx_portfolio")) || [];
  });

  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("stockx_watchlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("stockx_portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem("stockx_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div className="bg-black text-white">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all">
              <h3 className="text-gray-400 text-sm">Portfolio Value</h3>
              <p className="text-2xl font-bold text-white mt-2">
                ₹{portfolio.length * 1000}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all">
              <h3 className="text-gray-400 text-sm">Watchlist Stocks</h3>
              <p className="text-2xl font-bold text-white mt-2">
                {watchlist.length}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all">
              <h3 className="text-gray-400 text-sm">Holdings</h3>
              <p className="text-2xl font-bold text-white mt-2">
                {portfolio.length}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all">
              <h3 className="text-gray-400 text-sm">Status</h3>
              <p className="text-2xl font-bold text-green-400 mt-2">
                Active
              </p>
            </div>

          </div>

          {/* Table */}
          <StockTable
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            watchlist={watchlist}
            setWatchlist={setWatchlist}
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;