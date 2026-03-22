import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-20 top-20 left-10"></div>
        <div className="absolute w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-10 bottom-20 right-10"></div>
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Trade Smarter with{" "}
          <span className="text-green-400">StockX</span>
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Buy and sell stocks in real-time with our powerful and intuitive trading platform.
          Track your portfolio, manage watchlists, and stay ahead of the market.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-xl font-semibold text-lg transition"
          >
            Start Trading 🚀
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-gray-600 px-8 py-3 rounded-xl hover:border-green-400 hover:text-green-400 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20 text-center">
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-3xl font-bold text-green-400">10K+</h2>
          <p className="text-gray-400 mt-2">Active Users</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-3xl font-bold text-green-400">₹1Cr+</h2>
          <p className="text-gray-400 mt-2">Portfolio Managed</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-3xl font-bold text-green-400">24/7</h2>
          <p className="text-gray-400 mt-2">Market Monitoring</p>
        </div>

      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Portfolio Tracking
          </h3>
          <p className="text-gray-400">
            Monitor your investments and track performance easily with real-time updates.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Watchlist Management
          </h3>
          <p className="text-gray-400">
            Save and organize your favorite stocks for quick access anytime.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Market Insights
          </h3>
          <p className="text-gray-400">
            Stay informed with trends and make better investment decisions.
          </p>
        </div>

      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24 text-center">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start your trading journey?
          </h2>
          <p className="text-gray-400 mb-6">
            Join StockX and manage your investments like a pro.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-xl font-semibold transition"
          >
            Create Free Account
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;