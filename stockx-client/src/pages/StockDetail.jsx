import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getStockHistory } from "../services/stockService";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const StockDetail = () => {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            const data = await getStockHistory(symbol);
            setChartData(data);
            setLoading(false);
        };

        fetchHistory();
    }, [symbol]);
    console.log("Chart Data:", chartData);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />

                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold text-green-400 mb-6">
                        {symbol} Details
                    </h1>

                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                        {loading ? (
                            <p className="text-blue-400">Loading chart...</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#22c55e"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetail;