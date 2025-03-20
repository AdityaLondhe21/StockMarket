// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [custID, setCustID] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');
  const [passwordDisplay, setPasswordDisplay] = useState(''); // To display the password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setPasswordDisplay(''); // Clear previous password display

    try {
      const response = await axios.get('http://localhost:8181/user/forgot-password', {
        params: {
          id: custID,
          dob: dob,
        },
      });

      if (response.data.startsWith('Your password: ')) {
        const password = response.data.substring('Your password: '.length);
        setPasswordDisplay(`Your password is: ${password}.`);
        setMessage('Password retrieved successfully (insecure method).');
      } else {
        setMessage(response.data); 
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="content-section" id="forgot-password">
        <h2>Forgot Password</h2>
        <p>Enter your Customer ID and Date of Birth to retrieve your password.</p>
        {message && <p className="message">{message}</p>}
        {passwordDisplay && <p className="password-display">{passwordDisplay}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Customer ID</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Customer ID"
              required
              pattern="[0-9]+"
              value={custID}
              onChange={(e) => setCustID(e.target.value)}
              title="Customer ID must be numeric"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="text" 
              id="dob"
              name="dob"
              placeholder="Enter Date of Birth (YYYY-MM-DD)" 
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              title="Enter your Date of Birth in YYYY-MM-DD format"
            />
          </div>
          <button type="submit" className="login-button">Retrieve Password</button>
          <div className="login-back-link">
            <Link to="/netbanking/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;