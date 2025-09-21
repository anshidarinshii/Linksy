// frontend/src/components/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // you can return a spinner here
    return null;
  }

  if (!user) {
    // redirect to /auth and include original path so user comes back
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}
