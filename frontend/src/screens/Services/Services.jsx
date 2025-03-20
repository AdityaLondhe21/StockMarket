import React from 'react';
import WatchlistDisplay from './WatchlistDisplay';
import StockList from './Stocklist';

function Services() {
  return (
    <div className="main-content">
      <div className="content-section">
          <h2>Stock Market Services</h2>
          <p>Explore available stock market data and manage your watchlist.</p>
          <div className="services-grid">
            <WatchlistDisplay />
            <StockList />
          </div>
        </div>
      </div>
  );
}

export default Services;