import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NetbankingSignup() {
  const [custID, setCustID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8181/user/register', { 
        user_id: parseInt(custID), 
        user_name: name,
        password: password,
        date_of_birth: dateOfBirth 
      });

      console.log(response);
      if (response.data === "User registered successfully") {
        alert('Registration Successful!');
        setCustID('');
        setPassword('');
        setName('');
        setDateOfBirth('');
        navigate('/netbanking/login'); 
      } else {
        alert(response.data); 
      }

    } catch (error) {
      console.error("Registration error:", error);
      alert('Registration failed. Please try again.');
    }
  }

  return (
    <div className="main-content">
      <div className="content-section" id="signup">
        <h2>Create Your Stocks Account</h2>
        <p>Experience the convenience of managing your finances online.</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="name-signup" className="signup-label">Customer Name</label>
            <input
              type="text"
              id="name-signup"
              name="name-signup"
              className="signup-input"
              placeholder="Enter Your Name"
              required
              pattern="[a-zA-Z\\s]+"
              value={name}
              onChange={(e) => setName(e.target.value)}
              title="Customer Name should contain only alphabets and spaces"
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="customerid-signup" className="signup-label">Customer ID</label>
            <input
              type="text"
              id="customerid-signup"
              name="customerid-signup"
              className="signup-input"
              placeholder="Enter Your Customer ID"
              required
              pattern="[0-9]+" 
              value={custID}
              onChange={(e) => setCustID(e.target.value)}
              title="Customer ID must be numeric"
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="dob-signup" className="signup-label">Date of Birth</label>
            <input
              type="date" 
              id="dob-signup"
              name="dob-signup"
              className="signup-input"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              title="Please enter your Date of Birth"
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="pass-signup" className="signup-label">Password</label>
            <input
              type="password"
              id="pass-signup"
              name="pass-signup"
              className="signup-input"
              placeholder="Enter New Password"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Password must be at least 6 characters long"
            />
          </div>
          <button type="submit" className="signup-button">Create Account</button>
          <div className="login-back-link">
            <p>Already a member? <Link to='/netbanking/login'>Back to Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NetbankingSignup