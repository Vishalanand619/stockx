const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlistController");

router.post("/", auth, addToWatchlist);
router.get("/", auth, getWatchlist);
router.delete("/:symbol", auth, removeFromWatchlist);

module.exports = router;