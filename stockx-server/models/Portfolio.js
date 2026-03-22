const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  symbol: String,
  quantity: Number,
  avgPrice: Number,
});

module.exports = mongoose.model("Portfolio", portfolioSchema);