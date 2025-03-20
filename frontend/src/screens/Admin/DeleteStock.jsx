import React, { useState } from 'react';
import axios from 'axios';

function DeleteStock() {
  const [stockId, setStockId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setMessage('');
    setError('');
    if (!stockId) {
      setError("Please enter a Stock ID to delete.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8989/stocks/delete/${stockId}`);
      setMessage(response.data); 
      if (response.data.startsWith("Deleted Successfully")) { 
        setStockId(''); 
      }
    } catch (err) {
      setError("Error deleting stock.");
      console.error("Error deleting stock:", err);
    }
  };

  return (
    <div className="content-section" id="delete-stock">
      <h2>Delete Stock</h2>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label htmlFor="stockId">Stock ID to Delete</label>
        <input type="text" id="stockId" value={stockId} onChange={(e) => setStockId(e.target.value)} />
      </div>
      <button onClick={handleDelete} className="action-button">Delete Stock</button>
    </div>
  );
}

export default DeleteStock;