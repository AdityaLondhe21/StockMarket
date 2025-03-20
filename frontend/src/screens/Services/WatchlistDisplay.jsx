import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './WatchlistDisplay.css';

function WatchlistDisplay() {
  const custID = useSelector((state) => state.custID);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStockDetails, setSelectedStockDetails] = useState(null);
  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [buyError, setBuyError] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!custID) {
        setLoading(false);
        setError("Customer ID not found. Please login.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8585/watchlist/${custID}`);
        setWatchlist(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch watchlist. Please try again later.");
        setLoading(false);
      }
    };
    fetchWatchlist();
  });

  const handleRemoveFromWatchlist = async (watchlistItemId) => {
    console.log(`Removing ${watchlistItemId} `);
    try {
      await axios.delete(`http://localhost:8585/watchlist/${watchlistItemId}`);
      setWatchlist(watchlist.filter(item => item.id !== watchlistItemId));
      alert("Stock removed from watchlist successfully.");
    } catch (err) {
      alert("Failed to remove stock from watchlist. Please try again.");
    }
  };

  const handleBuyStock = async (stockId) => {
    try {
      const response = await axios.get(`http://localhost:8989/stocks/${stockId}`);
      setSelectedStockDetails(response.data);
      setBuyModalVisible(true);
      setBuyError('');
      setBuyQuantity(1);
    } catch (err) {
      alert("Failed to fetch stock details. Please try again.");
      console.error("Error fetching stock details:", err);
    }
  };

  const closeBuyModal = () => {
    setBuyModalVisible(false);
    setSelectedStockDetails(null);
    setBuyError('');
  };

  const handleQuantityChange = (e) => {
    setBuyQuantity(parseInt(e.target.value, 10) || 1);
    setBuyError('');
  };

  const confirmBuyStock = () => {
    if (!selectedStockDetails) return;
    if (buyQuantity > selectedStockDetails.quantity) {
      setBuyError("Requested quantity exceeds available stock.");
      return;
    }
    alert(`Buy ${buyQuantity} shares of ${selectedStockDetails.name} (Stock ID: ${selectedStockDetails.stock_id}) - Functionality not fully implemented.`);
    closeBuyModal();
  };

  return (
    <div className="watchlist-container service-card">
      <h3>Your Watchlist</h3>
      <ul>
        {watchlist.map((item) => (
          <li key={item.id}>
            <div>
              Stock ID: {item.stockId},  Watchlist ID: {item.stockId}
            </div>
            <div className="watchlist-actions">
              <button
                onClick={() => handleBuyStock(item.stockId)}
                className="buy-button"
              >
                Buy
              </button>
              <button
                onClick={() => handleRemoveFromWatchlist(item.stockId)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {buyModalVisible && selectedStockDetails && (
        <div className="buy-modal-overlay">
          <div className="buy-modal">
            <h3>Buy Stock</h3>
            <p>Stock Name: {selectedStockDetails.name}</p>
            <p>Stock ID: {selectedStockDetails.stock_id}</p>
            <p>Current Price: ${selectedStockDetails.current_price}</p>
            <p>Available Quantity: {selectedStockDetails.quantity}</p>

            <div className="buy-quantity-input">
              <label htmlFor="quantity">Quantity to Buy:</label>
              <input
                type="number"
                id="quantity"
                value={buyQuantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </div>
            {buyError && <p className="error-message">{buyError}</p>}

            <div className="modal-actions">
              <button onClick={confirmBuyStock} className="confirm-buy-button">Buy</button>
              <button onClick={closeBuyModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchlistDisplay;