import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(user));
          resolve({ success: true });
        } else {
          reject({ success: false, message: "Invalid email or password" });
        }
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.some((u) => u.email === email)) {
          reject({
            success: false,
            message: "User already exists with this email",
          });
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In real app, this would be hashed
          joinedDate: new Date().toISOString(),
        };

        // Save user
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));

        setUser(newUser);
        setIsAuthenticated(true);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
