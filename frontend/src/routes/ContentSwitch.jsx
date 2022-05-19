import ReactDOM from "react-dom/client";
import { Routes, Route, useParams } from "react-router-dom";

import React from "react";
import HomePage from "../common/pages/HomePage";
import RegisterPage from "../common/pages/RegisterPage";
import {
  COLLECTION_MANAGER_ROUTE,
  HOME_ROUTE,
  ITEMS_MANAGER_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../common/constants/appRoutes";
import LoginPage from "../common/pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import useAuth from "../common/hooks/useAuth";
import { GUEST, REGULAR } from "../common/constants/authStates";
import CollectionsManager from "../common/pages/UserCollectionsPage";
import UserCollectionsPage from "../common/pages/UserCollectionsPage";
import CollectionItemsManagement from "../common/pages/CollectionItemsManagement";
import useIsEditor from "../common/hooks/useIsEditor";

const ContentSwitch = () => {
  const auth = useAuth();
  const params = useParams();
  const isEditor = useIsEditor(params.email);
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<HomePage />} />
      <Route
        path={REGISTER_ROUTE}
        element={
          <PrivateRoute redirectPath={HOME_ROUTE} isAllowed={auth === GUEST}>
            <RegisterPage />
          </PrivateRoute>
        }
      />
      <Route
        path={LOGIN_ROUTE}
        element={
          <PrivateRoute redirectPath={HOME_ROUTE} isAllowed={auth === GUEST}>
            <LoginPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${COLLECTION_MANAGER_ROUTE}`}
        element={<UserCollectionsPage />}
      />
      <Route
        path={ITEMS_MANAGER_ROUTE}
        element={
          <PrivateRoute redirectPath={HOME_ROUTE} isAllowed={auth !== GUEST}>
            <CollectionItemsManagement />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default ContentSwitch;
