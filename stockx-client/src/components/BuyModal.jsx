import { useState } from "react";

const BuyModal = ({ stock, onClose, onBuy }) => {
  const [qty, setQty] = useState(1);

  if (!stock) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          Buy {stock.symbol}
        </h2>

        <p className="text-gray-400 mb-4">
          Price: ${stock.price}
        </p>

        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
        />

        <div className="flex gap-4">
          <button
            onClick={() => onBuy(stock, qty)}
            className="flex-1 bg-green-500 hover:bg-green-400 text-black py-2 rounded-lg font-semibold"
          >
            Confirm Buy
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
