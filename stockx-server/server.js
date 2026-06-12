const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const chatRoutes = require("./routes/chatRoutes");

const http = require("http");
const setupSocket = require("./socket");

const app = express();
const server = http.createServer(app);


setupSocket(server);

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("StockX API Running 🚀");
});


app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log("ENV CHECK:", process.env.MONGO_URI);