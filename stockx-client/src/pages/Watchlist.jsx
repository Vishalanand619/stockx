import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import {
  getWatchlist,
  removeWatchlist,
} from "../services/watchlistService";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // 🔹 fetch data from backend
  const loadWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setWatchlist(data);
    } catch (err) {
      console.log("Fetch error", err);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  // 🔹 remove stock
  const handleRemove = async (symbol) => {
    try {
      await removeWatchlist(symbol);
      loadWatchlist(); // refresh list
    } catch (err) {
      console.log("Remove error", err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-yellow-400">
            My Watchlist
          </h1>

          {watchlist.length === 0 ? (
            <p className="text-gray-400">No stocks added</p>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              {watchlist.map((stock) => (
                <div
                  key={stock._id}
                  className="flex justify-between p-4 border-b border-gray-800"
                >
                  <span>{stock.symbol}</span>

                  <button
                    onClick={() => handleRemove(stock.symbol)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;