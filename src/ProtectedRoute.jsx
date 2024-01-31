// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // Check if the user is authenticated, you can implement your logic here
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the provided element
  return element;
};

export default ProtectedRoute;
