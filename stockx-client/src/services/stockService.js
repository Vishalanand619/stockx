import axios from "axios";

const API_KEY = "d6e4qc1r01qh94m2pk20d6e4qc1r01qh94m2pk2g";
const BASE_URL = "https://finnhub.io/api/v1";

export const getStockQuote = async (symbol) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Stock fetch error", error);
    return null;
  }
};
export const getStockHistory = async (symbol) => {
  try {
    const now = Math.floor(Date.now() / 1000);
    const oneWeekAgo = now - 7 * 24 * 60 * 60;

    const res = await axios.get(
      `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=D&from=${oneWeekAgo}&to=${now}&token=${API_KEY}`
    );

    if (res.data.s !== "ok") return [];

    return res.data.c.map((price, index) => ({
      day: index,
      price,
    }));
  } catch (error) {
    console.error("History fetch error", error);
    return [];
  }
};