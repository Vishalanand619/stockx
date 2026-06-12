import { useEffect, useState } from "react";
import { socket } from "../../services/socket";

const TickerTape = () => {
  const [tickerData, setTickerData] = useState([
    { symbol: "AAPL", price: 150.0, change: "+1.2%" },
    { symbol: "TSLA", price: 200.0, change: "-0.5%" },
    { symbol: "AMZN", price: 100.0, change: "+0.8%" },
    { symbol: "GOOGL", price: 120.0, change: "+0.3%" },
    { symbol: "MSFT", price: 300.0, change: "-0.1%" },
    { symbol: "META", price: 250.0, change: "+2.1%" },
  ]);

  useEffect(() => {
    socket.on("price_update", (updatedStocks) => {
      setTickerData(updatedStocks);
    });

    return () => {
      socket.off("price_update");
    };
  }, []);

  return (
    <div className="w-full bg-gray-950 border-b border-gray-800 overflow-hidden py-2 whitespace-nowrap flex z-50">
      <div className="flex animate-ticker whitespace-nowrap min-w-full">
        {tickerData.map((stock, i) => (
          <div key={i} className="inline-flex items-center mx-8 space-x-2 font-mono">
            <span className="font-bold text-white">{stock.symbol}</span>
            <span className="text-gray-300">${stock.price.toFixed(2)}</span>
            <span className={stock.change.includes("+") ? "text-green-400" : "text-red-400"}>
              {stock.change}
            </span>
          </div>
        ))}
        {/* Duplicate for infinite seamless scroll */}
        {tickerData.map((stock, i) => (
          <div key={`dup-${i}`} className="inline-flex items-center mx-8 space-x-2 font-mono">
            <span className="font-bold text-white">{stock.symbol}</span>
            <span className="text-gray-300">${stock.price.toFixed(2)}</span>
            <span className={stock.change.includes("+") ? "text-green-400" : "text-red-400"}>
              {stock.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
