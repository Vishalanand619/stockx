import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TickerTape from "../components/ui/TickerTape";
import MarketSnapshot from "../components/ui/MarketSnapshot";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <Navbar />
      <TickerTape />


      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-96 h-96 bg-green-600 rounded-full blur-[150px] opacity-20 top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-10 bottom-20 right-10"></div>
      </div>


      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Market Data Now Available
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Trade Smarter with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            StockX Pro
          </span>
        </h1>

        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate platform for modern investors. Real-time market data, professional advanced charts, and seamless portfolio execution.
        </p>

        <div className="flex justify-center gap-6 mb-20">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            Launch Terminal 🚀
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            Create Free Account
          </button>
        </div>
        
        <MarketSnapshot />
      </div>


      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Tools for Every Trader</h2>
          <p className="text-gray-400 text-lg">Everything you need to analyze, execute, and track your investments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 rounded-2xl hover:border-green-500/50 transition duration-300">
            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Advanced Charting</h3>
            <p className="text-gray-400 leading-relaxed">
              Analyze price action with professional-grade candlestick charts, volume histograms, and technical indicators like SMA.
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 rounded-2xl hover:border-green-500/50 transition duration-300">
            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Real-time Execution</h3>
            <p className="text-gray-400 leading-relaxed">
              Experience zero-latency market data via WebSockets. Watch prices flash green and red as the market moves live.
            </p>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 rounded-2xl hover:border-green-500/50 transition duration-300">
            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Portfolio Tracking</h3>
            <p className="text-gray-400 leading-relaxed">
              Manage your holdings, track your PnL, maintain custom watchlists, and review your complete order history in one place.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;