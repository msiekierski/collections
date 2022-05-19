import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { HOME_ROUTE } from "../common/constants/appRoutes";

const PrivateRoute = ({ isAllowed, redirectPath, children }) => {
  const params = useParams();

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default PrivateRoute;
