const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  symbol: String,
});

module.exports = mongoose.model("Watchlist", watchlistSchema);