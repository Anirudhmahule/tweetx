// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "./components/utils/useAuth"; // Assuming you have an AuthProvider with a useAuth hook

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
