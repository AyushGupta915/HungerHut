import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './login.css';

const Login = ({ setShowLogin, onLogin }) => {
  const [data, setData] = useState({ email: '', password: '' });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://hungerhut-backend-bpi5.onrender.com/api/users/admin/login', data);
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        onLogin(); // Notify Navbar
        setShowLogin(false); // Close popup
      }
    } catch (err) {
      console.error('Login failed', err);
      toast.error('Login failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setShowLogin(false)}>&times;</button>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Admin Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
