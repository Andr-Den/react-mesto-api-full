import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
      props.loggedIn ? <Component {...props} /> : <Navigate replace to="./sign-in" />
      // <Component {...props} /> 
  );
};

export default ProtectedRoute;