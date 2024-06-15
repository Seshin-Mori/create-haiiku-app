import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
