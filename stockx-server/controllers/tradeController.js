const Order = require("../models/Order");
const Portfolio = require("../models/Portfolio");

exports.buyStock = async (req, res) => {
  const { symbol, quantity, price } = req.body;

  try {
    const order = await Order.create({
      user: req.user,
      symbol,
      quantity,
      price,
      type: "BUY",
    });

    let holding = await Portfolio.findOne({
      user: req.user,
      symbol,
    });

    if (holding) {
      const totalQty = holding.quantity + quantity;

      const newAvg =
        (holding.avgPrice * holding.quantity +
          price * quantity) /
        totalQty;

      holding.quantity = totalQty;
      holding.avgPrice = newAvg;

      await holding.save();
    } else {
      await Portfolio.create({
        user: req.user,
        symbol,
        quantity,
        avgPrice: price,
      });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Buy error" });
  }
};exports.getPortfolio = async (req, res) => {
  try {
    const holdings = await Portfolio.find({
      user: req.user,
    });

    res.json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Portfolio error" });
  }
};

exports.sellStock = async (req, res) => {
  const { symbol, quantity, price } = req.body;

  try {
    const holding = await Portfolio.findOne({
      user: req.user,
      symbol,
    });

    if (!holding || holding.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Not enough shares" });
    }

    holding.quantity -= quantity;

    if (holding.quantity === 0) {
      await holding.deleteOne();
    } else {
      await holding.save();
    }

    const order = await Order.create({
      user: req.user,
      symbol,
      quantity,
      price,
      type: "SELL",
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Sell error" });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Order fetch error" });
  }
};