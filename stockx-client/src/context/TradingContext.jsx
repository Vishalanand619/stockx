import { createContext, useState } from "react";

export const TradingContext = createContext();

export const TradingProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  return (
    <TradingContext.Provider
      value={{
        portfolio,
        setPortfolio,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};