// ChangePassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ChangePassword() {
  const [custID, setCustID] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8181/change-password', null, {
        params: {
          id: custID,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      });

      setMessage(response.data); // Backend returns success/error message
    } catch (error) {
      setMessage('An error occurred while changing password. Please try again later.');
      console.error('Change password error:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="content-section" id="change-password">
        <h2>Change Password</h2>
        <p>Enter your Customer ID, old password, and new password to change your password.</p>
        {message && <p className="message">{message}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Customer ID</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Customer ID"
              required
              pattern="[0-9]+" // Assuming Customer ID is numeric based on backend example
              value={custID}
              onChange={(e) => setCustID(e.target.value)}
              title="Customer ID must be numeric"
            />
          </div>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter Old Password"
              required
              minLength="6"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              title="Old password must be at least 6 characters long"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter New Password"
              required
              minLength="6"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              title="New password must be at least 6 characters long"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              minLength="6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              title="Passwords must match"
            />
          </div>
          <button type="submit" className="login-button">Change Password</button>
          <div className="login-back-link">
            <Link to="/netbanking">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;