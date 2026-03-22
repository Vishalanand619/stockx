import { NavLink } from "react-router-dom";
import { FaChartPie, FaWallet, FaStar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 min-h-screen p-6">
      <h2 className="text-xl font-bold text-green-400 mb-8">
        Dashboard
      </h2>

      <div className="flex flex-col gap-6 text-gray-300">
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 text-green-400 font-semibold"
              : "flex items-center gap-3 hover:text-green-400"
          }
        >
          <FaChartPie /> Market
        </NavLink>

        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 text-green-400 font-semibold"
              : "flex items-center gap-3 hover:text-green-400"
          }
        >
          <FaWallet /> Portfolio
        </NavLink>

        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 text-green-400 font-semibold"
              : "flex items-center gap-3 hover:text-green-400"
          }
        >
          <FaStar /> Watchlist
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;