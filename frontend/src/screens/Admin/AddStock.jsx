import React, { useState } from 'react';
import axios from 'axios';

function AddStock() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8989/stocks/add', {
        name: name,
        quantity: parseInt(quantity), 
        min_price: parseFloat(minPrice), 
        max_price: parseFloat(maxPrice)  
      });

      setMessage(response.data);
      if (response.data.startsWith("Stock successfully saved")) { 
        setName('');
        setQuantity('');
        setMinPrice('');
        setMaxPrice(''); 
      }
    } catch (error) {
      setMessage('Error adding stock. Please try again.');
      console.error("Error adding stock:", error);
    }
  };

  return (
    <div className="content-section" id="add-stock">
      <h2>Add New Stock</h2>
      {message && <p className="message">{message}</p>}
      <form className="stock-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="action-button">Add Stock</button>
      </form>
    </div>
  );
}

export default AddStock;