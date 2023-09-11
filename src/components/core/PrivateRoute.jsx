import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const {isLoggedIn} = useSelector((state) => state.auth);

  if(isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
