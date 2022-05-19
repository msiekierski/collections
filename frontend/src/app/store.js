import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import collectionItemsReducer from "../features/collectionItemsManagement/collectionItemsSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({ userReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const store = configureStore({
  reducer: {
    root: persistedReducer,
    collectionItems: collectionItemsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
