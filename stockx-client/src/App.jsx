import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import ProtectedRoute from "./components/ProtectedRoute";
import StockDetail from "./pages/StockDetail";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/stock/:symbol" element={<StockDetail />} />
         <Route path="/watchlist" element={<Watchlist />} /> 
          <Route path="/portfolio" element={<Portfolio />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
