import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loggedIn: false, username: '' });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost/propertymanagement/api/auth_check.php', { withCredentials: true });
        // console.log("Session check response:", response.data); // Ensure this logs correct data
        setAuth(response.data);
      } catch (error) {
        console.error('Failed to check session', error);
      }
    };
  
    checkSession();
  }, []);
  

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
