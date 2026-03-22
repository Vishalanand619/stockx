import BuyModal from "./BuyModal";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getStockQuote } from "../services/stockService";
import { useNavigate } from "react-router-dom";
import { buyStock } from "../services/tradeService";
import { addWatchlist } from "../services/watchlistService";

const StockTable = ({
  portfolio,
  setPortfolio,
  watchlist,
  setWatchlist,
}) => {
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([
    { symbol: "AAPL", price: 189.32, change: "+1.2%" },
    { symbol: "GOOGL", price: 2734.50, change: "-0.8%" },
    { symbol: "TSLA", price: 244.12, change: "+2.5%" },
    { symbol: "AMZN", price: 132.45, change: "+0.6%" }
  ]);

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ UPDATED BUY FUNCTION (API CALL)
  const handleBuy = async (stock, qty) => {
    try {
      await buyStock(stock.symbol, qty, stock.price);

      setPortfolio((prev) => {
        const existing = prev.find((item) => item.symbol === stock.symbol);

        if (existing) {
          return prev.map((item) =>
            item.symbol === stock.symbol
              ? {
                ...item,
                quantity: item.quantity + Number(qty),
              }
              : item
          );
        }

        return [
          ...prev,
          { ...stock, quantity: Number(qty), buyPrice: stock.price },
        ];
      });

      toast.success(`${stock.symbol} bought`);
      setSelectedStock(null);

    } catch (error) {
      toast.error("Buy failed");
      console.error(error);
    }
  };

  const toggleWatchlist = async (stock) => {
  await addWatchlist(stock.symbol);

  toast.success(`${stock.symbol} added to watchlist`);
};

  const handleRefreshPrices = async () => {
    setLoading(true);

    const updated = await Promise.all(
      stocks.map(async (stock) => {
        const data = await getStockQuote(stock.symbol);

        if (!data) return stock;

        return {
          ...stock,
          price: data.c || stock.price,
          change: data.dp ? `${data.dp.toFixed(2)}%` : stock.change,
        };
      })
    );

    setStocks(updated);
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshPrices();
    }, 15000);

    return () => clearInterval(interval);
  }, [stocks]);

  return (
    <div className="flex-1 p-6">
      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-green-400"
      />

      <button
        onClick={handleRefreshPrices}
        className="mb-4 bg-blue-500 hover:bg-blue-400 text-black px-4 py-2 rounded-lg font-semibold"
      >
        Refresh Prices 🔄
      </button>

      {loading && (
        <p className="text-blue-400 mb-4">Refreshing live prices...</p>
      )}

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-4">Symbol</th>
              <th className="p-4">Price</th>
              <th className="p-4">Change</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol} className="border-t border-gray-800">
                <td
                  onClick={() => navigate(`/stock/${stock.symbol}`)}
                  className="p-4 font-semibold text-blue-400 cursor-pointer"
                >
                  {stock.symbol}
                </td>

                <td className="p-4">${stock.price}</td>

                <td
                  className={`p-4 ${stock.change.includes("+")
                      ? "text-green-400"
                      : "text-red-400"
                    }`}
                >
                  {stock.change}
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => setSelectedStock(stock)}
                    className="bg-green-500 hover:bg-green-400 text-black px-4 py-1 rounded-lg font-semibold"
                  >
                    Buy
                  </button>

                  <button
                    onClick={() => toggleWatchlist(stock)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold"
                  >
                    ★
                  </button>
                </td>
              </tr>
            ))}

            {filteredStocks.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  No stocks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BuyModal
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
        onBuy={handleBuy}
      />
    </div>
  );
};

export default StockTable;