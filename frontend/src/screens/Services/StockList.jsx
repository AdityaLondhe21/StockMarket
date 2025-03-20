import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function StockList() {
  const custID = useSelector((state) => state.custID);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlistStocks, setWatchlistStocks] = useState([]);

  useEffect(() => {
    const fetchStocksAndWatchlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const stocksResponse = await axios.get('http://localhost:8989/stocks/all');
        setStocks(stocksResponse.data);

        if (custID) {
          const watchlistResponse = await axios.get(`http://localhost:8585/watchlist/${custID}`);
          setWatchlistStocks(watchlistResponse.data.map(item => item.stockId));
        } else {
          setWatchlistStocks([]);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchStocksAndWatchlist();
  }, [custID]);

  const handleAddToWatchlist = async (stockId) => {
    if (!custID) {
      alert("Please log in to add stocks to your watchlist.");
      return;
    }

    if (watchlistStocks.includes(stockId)) {
      alert("Stock is already in your watchlist.");
      return;
    }

    try {
      await axios.post('http://localhost:8585/watchlist/', null, {
        params: {
          userId: custID,
          stockId: stockId,
        },
      });
      setWatchlistStocks([...watchlistStocks, stockId]);
      alert(`Stock ID ${stockId} added to watchlist!`);
    } catch (err) {
      alert("Failed to add stock to watchlist. Please try again.");
    }
  };

  if (!stocks || stocks.length === 0) {
    return <p>No stocks available.</p>;
  }

  return (
    <div className="stock-list-container service-card">
      <h3>Available Stocks</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.stock_id}>
                <td>{stock.stock_id}</td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.min_price}</td>
                <td>{stock.max_price}</td>
                <td>
                  <button
                    onClick={() => handleAddToWatchlist(stock.stock_id)}
                    disabled={watchlistStocks.includes(stock.stock_id)}
                  >
                    {watchlistStocks.includes(stock.stock_id) ? "In Watchlist" : "Add to Watchlist"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockList;