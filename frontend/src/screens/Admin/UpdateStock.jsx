import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateStock() {
  const [stockId, setStockId] = useState('');
  const [stock, setStock] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const fetchStock = async () => {
    if (!stockId) return; 
    try {
      const response = await axios.get(`http://localhost:8989/stocks/${stockId}`);
      if (response.data) {
        setStock(response.data);
        setName(response.data.name || '');
        setQuantity(response.data.quantity || '');
        setMinPrice(response.data.min_price || '');
        setMaxPrice(response.data.max_price || '');
        setError(null);
      } else {
        setError("Stock not found.");
        setStock(null);
      }
    } catch (err) {
      setError("Error fetching stock.");
      setStock(null);
      console.error("Error fetching stock:", err);
    }
  };

  useEffect(() => {
    if (stockId) {
      fetchStock();
    } else {
      setStock(null);
    }
  }, [stockId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    if (!stockId || !stock) {
      setError("Please enter a Stock ID and fetch stock details first.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8989/stocks/update/${stockId}`, {
        name: name,
        quantity: parseInt(quantity),
        min_price: parseFloat(minPrice),
        max_price: parseFloat(maxPrice)
      });
      setMessage("Stock updated successfully!");
      setError(null);
      fetchStock(); 
    } catch (err) {
      setMessage('');
      setError("Error updating stock.");
      console.error("Error updating stock:", err);
    }
  };

  return (
    <div className="content-section" id="update-stock">
      <h2>Update Stock</h2>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label htmlFor="stockId">Stock ID to Update</label>
        <input type="text" id="stockId" value={stockId} onChange={(e) => setStockId(e.target.value)} />
      </div>
      <button onClick={fetchStock} className="action-button">Fetch Stock Details</button>

      {stock && (
        <form className="stock-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" step="0.01" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price</label>
            <input type="number" step="0.01" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} required />
          </div>
          <button type="submit" className="action-button">Update Stock</button>
        </form>
      )}
    </div>
  );
}

export default UpdateStock;