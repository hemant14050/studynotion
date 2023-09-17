import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  if(token && user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
