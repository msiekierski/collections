import ReactDOM from "react-dom/client";
import { Routes, Route, useParams, Navigate } from "react-router-dom";

import React from "react";
import HomePage from "../common/pages/HomePage";
import RegisterPage from "../common/pages/RegisterPage";
import {
  ADMIN_ROUTE,
  COLLECTION_MANAGER_ROUTE,
  COLLECTION_ROUTE,
  HOME_ROUTE,
  ITEMS_MANAGER_ROUTE,
  ITEM_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  TAG_SEARCH_ROUTE,
} from "../common/constants/appRoutes";
import LoginPage from "../common/pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import useAuth from "../common/hooks/useAuth";
import { ADMIN, GUEST, REGULAR } from "../common/constants/authStates";
import CollectionsManager from "../common/pages/UserCollectionsPage";
import UserCollectionsPage from "../common/pages/UserCollectionsPage";
import CollectionItemsManagement from "../common/pages/CollectionItemsManagement";
import useIsEditor from "../common/hooks/useIsEditor";
import CollectionPage from "../common/pages/CollectionPage";
import ItemPage from "../common/pages/ItemPage";
import AdminPage from "../common/pages/AdminPage";
import TagSearchPage from "../common/pages/TagSearchPage";

const ContentSwitch = () => {
  const auth = useAuth();
  const params = useParams();
  let isEditor = useIsEditor(params.email);
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
          <PrivateRoute
            redirectPath={HOME_ROUTE}
            isAllowed={auth !== GUEST}
          >
            <CollectionItemsManagement />
          </PrivateRoute>
        }
      />
      <Route path={COLLECTION_ROUTE} element={<CollectionPage />} />
      <Route path={ITEM_ROUTE} element={<ItemPage />} />
      <Route
        path={ADMIN_ROUTE}
        element={
          <PrivateRoute redirectPath={HOME_ROUTE} isAllowed={auth === ADMIN}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route path={TAG_SEARCH_ROUTE} element={<TagSearchPage />} />
      <Route path={"*"} element={<Navigate replace to={HOME_ROUTE} />} />
    </Routes>
  );
};

export default ContentSwitch;
