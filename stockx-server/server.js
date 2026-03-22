const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.get("/", (req, res) => {
  res.send("StockX API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log("ENV CHECK:", process.env.MONGO_URI);