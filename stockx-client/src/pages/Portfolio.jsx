import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getPortfolio, sellStock } from "../services/tradeService";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  
  const fetchPortfolio = async () => {
    try {
      const data = await getPortfolio();
      setPortfolio(data);
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleSell = async (stock) => {
    const qtyToSell = window.prompt(
      `How many shares of ${stock.symbol} would you like to sell? (Max: ${stock.quantity})`
    );
    if (!qtyToSell || isNaN(qtyToSell) || qtyToSell <= 0) return;

    if (Number(qtyToSell) > stock.quantity) {
      alert("You cannot sell more shares than you own!");
      return;
    }

    try {
      await sellStock(stock.symbol, qtyToSell, stock.avgPrice);
      alert(`Successfully sold ${qtyToSell} shares of ${stock.symbol}`);
      fetchPortfolio();
    } catch (error) {
      console.error("Sell failed", error);
      alert("Failed to sell stock");
    }
  };


  const totalValue = portfolio.reduce(
    (sum, s) => sum + s.avgPrice * s.quantity,
    0
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: 0 }}>
                My Portfolio
              </h1>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>
                {portfolio.length} holdings &nbsp;·&nbsp;
                <span style={{ color: "#22c55e", fontWeight: 600 }}>
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>{" "}
                total value
              </p>
            </div>
          </div>


          {portfolio.length === 0 ? (
            <div style={{
              background: "linear-gradient(135deg, #111827, #0f172a)",
              border: "1px solid #1f2937", borderRadius: 16, padding: "48px 24px",
              textAlign: "center", marginBottom: 24
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>No holdings yet. Buy stocks from the Dashboard to build your portfolio.</p>
            </div>
          ) : (
            <div style={{
              background: "linear-gradient(135deg, #111827, #0f172a)",
              border: "1px solid #1f2937", borderRadius: 16, overflow: "hidden", marginBottom: 28
            }}>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 100px",
                padding: "12px 20px",
                borderBottom: "1px solid #1f2937",
                background: "rgba(99,102,241,0.05)"
              }}>
                {["Symbol", "Qty", "Avg Price", "Total Value", "Action"].map((h) => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
                ))}
              </div>

              {portfolio.map((stock, idx) => {
                const currentValue = stock.avgPrice * stock.quantity;

                return (
                  <div
                    key={stock.symbol}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 100px",
                      padding: "14px 20px",
                      borderBottom: idx < portfolio.length - 1 ? "1px solid #1f2937" : "none",
                      alignItems: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{stock.symbol}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: "#e5e7eb" }}>{stock.quantity}</div>
                    <div style={{ color: "#9ca3af" }}>${stock.avgPrice?.toFixed(2)}</div>
                    <div style={{ fontWeight: 700, color: "#22c55e" }}>${currentValue.toFixed(2)}</div>
                    <div>
                      <Button variant="danger" size="sm" onClick={() => handleSell(stock)}>
                        Sell
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;