import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSucess, setAdminStatus } from '../../reduxContainer/AuthAction';
import { Link, useNavigate } from 'react-router-dom';

function Netbanking({ setAdminLogin }) { 
  const [custID, setCustID] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (custID === 'admin' && password === 'admin') {
      alert('Admin Login successful!');
      dispatch(setAdminStatus(true));
      navigate('/admin-dashboard');
      return;
    } else {
      dispatch(setAdminStatus(false));
    }

    try {
      const response = await axios.post('http://localhost:8181/user/login', null, {
        params: {
          id: custID,
          password: password,
        },
      });

      if (response.data) {
        alert('Login successful!');
        dispatch(loginSucess(custID));
        navigate('/services/');
      } else {
        alert('Invalid Customer ID or Password');
      }
    } catch (error) {
      alert('Login failed! Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div className="main-content">
      <div className="content-section" id="netbanking">
        <h2>Stocks User Login</h2>
        <p>Securely access your accounts with our Stocks platform.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Customer ID</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Customer ID"
              required
              pattern="[a-zA-Z0-9]+"
              value={custID}
              onChange={(e) => setCustID(e.target.value)}
              title="Customer ID must be alphanumeric"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              minLength="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Password must be at least 6 characters long"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/netbanking/signup">Sign Up</Link></p>
          </div>
          <div className="forgot-password-link">
            <Link to="/netbanking/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Netbanking;