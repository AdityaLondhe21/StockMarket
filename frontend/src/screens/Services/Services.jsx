import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Services() {
  // const custID = useSelector((state) => state.custID);

  return (
    <div class="main-content">
      <div class="content-section">
          <h2>Banking Services</h2>
          <p>Select a service below to proceed.</p>

          <div className="services-grid">
            <Link to="/services/transfer" className="service-card">
              <div className="icon">💳</div>
              <h3>Funds Transfer</h3>
              <p>Send money to other accounts securely.</p>
            </Link>

            <Link to="/services/balance" className="service-card">
              <div className="icon">💰</div>
              <h3>Bank Balance Inquiry</h3>
              <p>Check your current account balance.</p>
            </Link>

            <Link to="/services/mini-statement" className="service-card">
              <div className="icon">📄</div>
              <h3>Mini Statement</h3>
              <p>View recent transactions from your account.</p>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Services;
