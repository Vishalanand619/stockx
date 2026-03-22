import API from "./api";

export const addWatchlist = async (symbol) => {
  const res = await API.post("/watchlist", { symbol });
  return res.data;
};

export const getWatchlist = async () => {
  const res = await API.get("/watchlist");
  return res.data;
};

export const removeWatchlist = async (symbol) => {
  const res = await API.delete(`/watchlist/${symbol}`);
  return res.data;
};