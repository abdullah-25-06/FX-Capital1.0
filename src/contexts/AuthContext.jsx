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
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.accessToken)
      localStorage.setItem("username", data.data.username)
      setUser(email);

    } catch (err) {
      console.log(err)
      if (err.response && err.response.status === 401) {
        // token invalid or expired
        localStorage.clear();
        // redirect to login
        window.location.href = "/?login=true";
        return;
      }

    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    setUser(null);
  };

  const signup = async (name, email, password) => {
    try {
      console.log(name, email, password)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/create-user`,
        {
          email: email,
          password: password,
          userName: name
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.accessToken)
      setUser(email);


      return response.data;
    } catch (err) {
      console.error('Error:', err.response?.data?.error || err.message);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");

        window.location.href = "/?login=true";
        return;
      }
    }

  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook for easy use in components
export function useAuth() {
  return useContext(AuthContext);
}
