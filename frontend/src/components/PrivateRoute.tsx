// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  // Implement your authentication logic here
  return true; // Change this to the actual check
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
