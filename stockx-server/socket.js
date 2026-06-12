const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });


  const stocks = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT", "META", "NVDA"];
  
  const basePrices = {
    AAPL: 189.32,
    GOOGL: 134.50, 
    TSLA: 244.12,
    AMZN: 132.45,
    MSFT: 345.10,
    META: 310.20,
    NVDA: 450.30
  };

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    
    const currentPrices = stocks.map(symbol => ({
        symbol,
        price: basePrices[symbol],
        change: "0.00%",
        timestamp: Date.now()
    }));
    socket.emit("initial_prices", currentPrices);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });


  setInterval(() => {
    const priceUpdates = stocks.map(symbol => {
     
      const fluctuation = 1 + (Math.random() - 0.5) * 0.01;
      const newPrice = parseFloat((basePrices[symbol] * fluctuation).toFixed(2));
      
      
      const changePercent = (((newPrice - basePrices[symbol]) / basePrices[symbol]) * 100).toFixed(2);
      const sign = changePercent >= 0 ? "+" : "";
      
      return {
        symbol,
        price: newPrice,
        change: `${sign}${changePercent}%`,
        timestamp: Date.now()
      };
    });

    
    stocks.forEach((symbol, index) => {
        basePrices[symbol] = priceUpdates[index].price;
    });

    io.emit("price_update", priceUpdates);
  }, 3000); 

  return io;
};

module.exports = setupSocket;
