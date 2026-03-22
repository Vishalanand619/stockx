const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  buyStock,
  sellStock,
  getPortfolio,
  getOrders,
} = require("../controllers/tradeController");

router.post("/buy", auth, buyStock);
router.post("/sell", auth, sellStock);
router.get("/portfolio", auth, getPortfolio);
router.get("/orders", auth, getOrders);

module.exports = router;