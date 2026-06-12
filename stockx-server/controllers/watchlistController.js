let mockWatchlist = [
  { _id: "1", symbol: "AAPL" },
  { _id: "2", symbol: "GOOGL" }
];

exports.addToWatchlist = async (req, res) => {
  const { symbol } = req.body;
  const exists = mockWatchlist.find(w => w.symbol === symbol);
  if (exists) {
    return res.status(400).json({ message: "Already in watchlist" });
  }
  
  const newItem = { _id: Math.random().toString(36).substr(2, 9), symbol };
  mockWatchlist.push(newItem);
  res.json(newItem);
};

exports.getWatchlist = async (req, res) => {
  res.json(mockWatchlist);
};

exports.removeFromWatchlist = async (req, res) => {
  const { symbol } = req.params;
  mockWatchlist = mockWatchlist.filter(w => w.symbol !== symbol);
  res.json({ message: "Removed" });
};