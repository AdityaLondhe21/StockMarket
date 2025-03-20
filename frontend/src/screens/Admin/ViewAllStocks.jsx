import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewAllStocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8989/stocks/all');
        setStocks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching stocks:", err);
      }
    };

    fetchStocks();
  }, []);

  if (loading) {
    return <p>Loading stocks...</p>;
  }

  if (error) {
    return <p>Error loading stocks: {error.message}</p>;
  }

  return (
    <div className="content-section" id="view-stocks">
      <h2>View All Stocks</h2>
      {stocks.length > 0 ? (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.stock_id}>
                <td>{stock.stock_id}</td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.min_price}</td>
                <td>{stock.max_price}</td>
                <td>{stock.current_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stocks available.</p>
      )}
    </div>
  );
}

export default ViewAllStocks;