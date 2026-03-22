import { NavLink, Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaChartLine className="text-green-400 text-2xl" />
          <span className="text-white font-bold text-xl">StockX</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-semibold" : "hover:text-green-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-semibold" : "hover:text-green-400"
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-green-400 font-semibold" : "hover:text-green-400"
            }
          >
            Signup
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-semibold" : "hover:text-green-400"
            }
          >
            Dashboard
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;