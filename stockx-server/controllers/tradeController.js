let mockPortfolio = [
  { _id: "1", symbol: "AAPL", quantity: 10, avgPrice: 150 },
  { _id: "2", symbol: "TSLA", quantity: 5, avgPrice: 200 }
];

let mockOrders = [];

exports.buyStock = async (req, res) => {
  const { symbol, quantity, price } = req.body;
  const qty = Number(quantity);
  
  const existing = mockPortfolio.find(p => p.symbol === symbol);
  if (existing) {
    const totalQty = existing.quantity + qty;
    existing.avgPrice = ((existing.avgPrice * existing.quantity) + (price * qty)) / totalQty;
    existing.quantity = totalQty;
  } else {
    mockPortfolio.push({
      _id: Math.random().toString(36).substr(2, 9),
      symbol,
      quantity: qty,
      avgPrice: price
    });
  }
  
  const newOrder = { _id: Math.random().toString(36).substr(2, 9), symbol, quantity: qty, price, type: "BUY", createdAt: new Date() };
  mockOrders.push(newOrder);
  
  res.json(newOrder);
};

exports.getPortfolio = async (req, res) => {
  res.json(mockPortfolio);
};

exports.sellStock = async (req, res) => {
  const { symbol, quantity, price } = req.body;
  const qty = Number(quantity);
  
  const existing = mockPortfolio.find(p => p.symbol === symbol);
  if (existing && existing.quantity >= qty) {
    existing.quantity -= qty;
    if (existing.quantity === 0) {
      mockPortfolio = mockPortfolio.filter(p => p.symbol !== symbol);
    }
  }
  
  const newOrder = { _id: Math.random().toString(36).substr(2, 9), symbol, quantity: qty, price, type: "SELL", createdAt: new Date() };
  mockOrders.push(newOrder);
  
  res.json(newOrder);
};

exports.getOrders = async (req, res) => {
  res.json(mockOrders.sort((a, b) => b.createdAt - a.createdAt));
};