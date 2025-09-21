// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../utils/authApi"; // we'll create this file next

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(true);             // user object { id, name, email }
  const [loading, setLoading] = useState(true);       // while we check token at startup

  useEffect(() => {
    // on startup: try token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const profile = await authApi.getProfile(token);
        setUser(profile);
      } catch (err) {
        console.warn("Invalid token or /me failed:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.loginUser(email, password); // expects { token, user }
    localStorage.setItem("token", res.token);
    setUser(res.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authApi.registerUser(name, email, password);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
