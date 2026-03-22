const Watchlist = require("../models/Watchlist");

exports.addToWatchlist = async (req, res) => {
  const { symbol } = req.body;

  try {
    const exists = await Watchlist.findOne({
      user: req.user,
      symbol,
    });

    if (exists)
      return res.status(400).json({
        message: "Already in watchlist",
      });

    const item = await Watchlist.create({
      user: req.user,
      symbol,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Watchlist error" });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const items = await Watchlist.find({
      user: req.user,
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Watchlist fetch error" });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  const { symbol } = req.params;

  try {
    await Watchlist.deleteOne({
      user: req.user,
      symbol,
    });

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: "Remove error" });
  }
};