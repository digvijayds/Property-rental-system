// Login.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/propertymanagement/api/login.php', {
        username,
        password,
      }, { withCredentials: true });

      console.log('Login response:', response.data);
      if (response.data.success) {
        // Update auth context
        setAuth({
          loggedIn: true,
          username: response.data.username,
        });
        navigate('/propertylist');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <br/><br/><br/><br/><br/><br/>
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="border px-4 py-2 rounded w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="border px-4 py-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
