// src/contexts/AuthContext.jsx
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user exists in localStorage
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email, password) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        email: email,
        password: password
      })
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token",data.data.accessToken)
      setUser(email);

    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook for easy use in components
export function useAuth() {
  return useContext(AuthContext);
}
