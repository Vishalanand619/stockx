import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getPortfolio } from "../services/tradeService";
import { useEffect, useState } from "react";

const Portfolio = () => {

  const [portfolio, setPortfolio] = useState([]);

  // ✅ Fetch portfolio from backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        setPortfolio(data);
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-green-400">
            My Portfolio
          </h1>

          {portfolio.length === 0 ? (
            <p className="text-gray-400">No holdings yet</p>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              {portfolio.map((stock) => {

                const currentValue = stock.avgPrice * stock.quantity;
                const invested = stock.avgPrice * stock.quantity;
                const pnl = currentValue - invested;

                return (
                  <div
                    key={stock.symbol}
                    className="flex justify-between p-4 border-b border-gray-800"
                  >
                    <span>{stock.symbol}</span>

                    <span>Qty: {stock.quantity}</span>

                    <span>${currentValue.toFixed(2)}</span>

                    <span
                      className={
                        pnl >= 0 ? "text-green-400" : "text-red-400"
                      }
                    >
                      {pnl >= 0 ? "+" : ""}
                      {pnl.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;