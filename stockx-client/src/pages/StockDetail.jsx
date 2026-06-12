import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getStockHistory } from "../services/stockService";
import { socket } from "../services/socket";
import { CandlestickChart } from "../components/ui/CandlestickChart";
import { Card, CardContent } from "../components/ui/Card";

const StockDetail = () => {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [priceChange, setPriceChange] = useState("0.00%");
    const [direction, setDirection] = useState("");

    const [timeframe, setTimeframe] = useState(30);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            
            const mockData = [];
            let lastClose = 150;
            
            const now = new Date();
            now.setUTCHours(0,0,0,0);
            const endTimestamp = Math.floor(now.getTime() / 1000);
            const startTimestamp = endTimestamp - (timeframe * 24 * 60 * 60);
            
            for (let i = 0; i <= timeframe; i++) {
                const timestamp = startTimestamp + (i * 24 * 60 * 60);
                const d = new Date(timestamp * 1000);
                const timeStr = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
                

                const volatility = timeframe > 90 ? 2 : 5;
                const open = lastClose + (Math.random() - 0.5) * volatility;
                const high = open + Math.random() * volatility;
                const low = open - Math.random() * volatility;
                const close = low + Math.random() * (high - low);
                
                mockData.push({
                    time: timeStr,
                    open: parseFloat(open.toFixed(2)),
                    high: parseFloat(high.toFixed(2)),
                    low: parseFloat(low.toFixed(2)),
                    close: parseFloat(close.toFixed(2)),
                    volume: Math.floor(Math.random() * 1000000) + 100000
                });
                lastClose = close;
            }
            
            setChartData(mockData);
            setLoading(false);
        };

        fetchHistory();
    }, [symbol, timeframe]);

    useEffect(() => {
        
        const handlePriceUpdate = (updatedStocks) => {
            const stock = updatedStocks.find(s => s.symbol === symbol);
            if (stock) {
                setCurrentPrice(prev => {
                    if (prev) {
                        if (stock.price > prev) setDirection("up");
                        else if (stock.price < prev) setDirection("down");
                    }
                    return stock.price;
                });
                setPriceChange(stock.change);
            }
        };

        socket.on("price_update", handlePriceUpdate);
        
        
        socket.on("initial_prices", handlePriceUpdate);

        return () => {
            socket.off("price_update", handlePriceUpdate);
            socket.off("initial_prices", handlePriceUpdate);
        };
    }, [symbol]);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />

                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                                {symbol}
                            </h1>
                            <div className="text-sm text-gray-400">Stock Details & Analysis</div>
                        </div>
                        {currentPrice && (
                            <div className={`text-right ${direction === "up" ? "text-green-400 animate-flash-green" : direction === "down" ? "text-red-400 animate-flash-red" : "text-white"}`}>
                                <div className="text-3xl font-mono font-bold">${currentPrice.toFixed(2)}</div>
                                <div className="text-sm font-medium">{priceChange}</div>
                            </div>
                        )}
                    </div>

                    <Card>
                        <CardContent className="pt-6 relative">
                           
                           
                            <div className="flex gap-2 mb-4">
                                {[
                                    { label: '1W', days: 7 },
                                    { label: '1M', days: 30 },
                                    { label: '3M', days: 90 },
                                    { label: '1Y', days: 365 }
                                ].map(tf => (
                                    <button
                                        key={tf.label}
                                        onClick={() => setTimeframe(tf.days)}
                                        className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
                                            timeframe === tf.days 
                                                ? "bg-green-500 text-black" 
                                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                    >
                                        {tf.label}
                                    </button>
                                ))}
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center h-[450px]">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                                </div>
                            ) : (
                                <CandlestickChart data={chartData} currentPrice={currentPrice} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;