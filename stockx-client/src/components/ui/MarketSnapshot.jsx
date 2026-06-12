import { useEffect, useState } from "react";
import { socket } from "../../services/socket";
import { Card, CardContent } from "./Card";

const MarketSnapshot = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    socket.on("initial_prices", setStocks);
    socket.on("price_update", setStocks);

    return () => {
      socket.off("initial_prices");
      socket.off("price_update");
    };
  }, []);

  if (stocks.length === 0) return null;

  const sorted = [...stocks].sort((a, b) => {
    const aChange = parseFloat(a.change.replace('%', ''));
    const bChange = parseFloat(b.change.replace('%', ''));
    return bChange - aChange;
  });

  const topGainers = sorted.slice(0, 3);
  const topLosers = sorted.slice().reverse().slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto z-10 relative">
      <Card className="bg-gray-900/50 backdrop-blur-xl border-green-500/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span> Top Gainers
          </h3>
          <div className="space-y-4">
            {topGainers.map(stock => (
              <div key={stock.symbol} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="font-bold">{stock.symbol}</span>
                <span className="font-mono text-gray-300">${stock.price.toFixed(2)}</span>
                <span className="text-green-400 font-bold">{stock.change}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 backdrop-blur-xl border-red-500/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">📉</span> Top Losers
          </h3>
          <div className="space-y-4">
            {topLosers.map(stock => (
              <div key={stock.symbol} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="font-bold">{stock.symbol}</span>
                <span className="font-mono text-gray-300">${stock.price.toFixed(2)}</span>
                <span className="text-red-400 font-bold">{stock.change}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketSnapshot;
