import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StockTable from "../components/StockTable";
import MarketNews from "../components/ui/MarketNews";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("stockx_token");
        if (!token) return;
        

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        const res1 = await fetch(`${API_URL}/api/trade/portfolio`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if(res1.ok) setPortfolio(await res1.json());

        const res2 = await fetch(`${API_URL}/api/watchlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if(res2.ok) setWatchlist(await res2.json());
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    fetchData();
  }, []);


  const totalValue = portfolio.reduce((acc, stock) => {
    
    const price = stock.avgPrice || stock.buyPrice || 0;
    return acc + (price * stock.quantity);
  }, 0);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />


        <div className="flex-1 p-6 space-y-6 overflow-auto">


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all">
              <h3 className="text-gray-400 text-sm">Portfolio Value</h3>
              <p className="text-2xl font-bold text-white mt-2">
                ${totalValue.toFixed(2)}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            
            <div className="lg:col-span-2">
              <StockTable
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            </div>
            
            
            <div className="lg:col-span-1">
              <MarketNews />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;