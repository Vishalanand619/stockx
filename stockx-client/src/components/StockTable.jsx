import BuyModal from "./BuyModal";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { buyStock } from "../services/tradeService";
import { addWatchlist } from "../services/watchlistService";
import { socket } from "../services/socket";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";

const StockTable = ({
  portfolio,
  setPortfolio,
  watchlist,
  setWatchlist,
}) => {
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  
 
  const prevPricesRef = useRef({});

  useEffect(() => {
    
    socket.on("initial_prices", (data) => {
      setStocks(data);
      const priceMap = {};
      data.forEach(s => priceMap[s.symbol] = s.price);
      prevPricesRef.current = priceMap;
    });

    
    socket.on("price_update", (updatedStocks) => {
      setStocks(prev => {
        return updatedStocks.map(newStock => {
          const oldStock = prev.find(s => s.symbol === newStock.symbol);
          let direction = "";
          if (oldStock) {
            if (newStock.price > oldStock.price) direction = "up";
            else if (newStock.price < oldStock.price) direction = "down";
          }
          return { ...newStock, direction };
        });
      });
      
      const priceMap = {};
      updatedStocks.forEach(s => priceMap[s.symbol] = s.price);
      prevPricesRef.current = priceMap;
    });

    return () => {
      socket.off("initial_prices");
      socket.off("price_update");
    };
  }, []);

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = async (stock, qty) => {
    try {
      await buyStock(stock.symbol, qty, stock.price);
      setPortfolio((prev) => {
        const existing = prev.find((item) => item.symbol === stock.symbol);
        if (existing) {
          return prev.map((item) =>
            item.symbol === stock.symbol
              ? { ...item, quantity: item.quantity + Number(qty) }
              : item
          );
        }
        return [...prev, { ...stock, quantity: Number(qty), buyPrice: stock.price }];
      });
      toast.success(`${stock.symbol} bought successfully!`);
      setSelectedStock(null);
    } catch (error) {
      toast.error("Buy failed");
      console.error(error);
    }
  };

  const toggleWatchlist = async (stock) => {
    try {
      const isWatchlisted = watchlist.some(w => w.symbol === stock.symbol);
      if (isWatchlisted) {
        toast.error(`${stock.symbol} is already in watchlist`);
        return;
      }
      
      const newWatchlistItem = await addWatchlist(stock.symbol);
      setWatchlist(prev => [...prev, newWatchlistItem]);
      toast.success(`${stock.symbol} added to watchlist`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to watchlist");
    }
  };

  return (
    <Card className="flex-1 w-full max-w-5xl mx-auto my-6">
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all placeholder:text-gray-500"
          />
          <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Market
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 font-medium">Symbol</th>
                <th className="p-4 font-medium text-right">Price</th>
                <th className="p-4 font-medium text-right">Change</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock) => (
                <tr 
                  key={stock.symbol} 
                  className={`border-t border-white/5 transition-colors hover:bg-white/5 ${
                    stock.direction === "up" ? "animate-flash-green" : stock.direction === "down" ? "animate-flash-red" : ""
                  }`}
                >
                  <td
                    onClick={() => navigate(`/stock/${stock.symbol}`)}
                    className="p-4 font-bold text-white cursor-pointer hover:text-green-400 transition-colors"
                  >
                    {stock.symbol}
                  </td>
                  <td className="p-4 text-right font-mono text-gray-200">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className={`p-4 text-right font-medium ${
                    stock.change.includes("+") ? "text-green-400" : stock.change === "0.00%" ? "text-gray-400" : "text-red-400"
                  }`}>
                    {stock.change}
                  </td>
                  <td className="p-4 flex items-center justify-center gap-3">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedStock(stock)}
                    >
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="!px-2"
                      onClick={() => toggleWatchlist(stock)}
                      title="Add to Watchlist"
                    >
                      ★
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredStocks.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    No stocks matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedStock && (
          <BuyModal
            stock={selectedStock}
            onClose={() => setSelectedStock(null)}
            onBuy={handleBuy}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StockTable;