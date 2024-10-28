import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../redux/slices/authSlice";
import { apiSlice } from "../redux/slices/apiSlice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const isPersistent = JSON.parse(localStorage.getItem("persist"));

const persistedReducer = isPersistent ? persistReducer(persistConfig, rootReducer) : rootReducer;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // pour éviter les erreurs de sérialisation avec redux-persist
    }).concat(apiSlice.middleware),
});

export const persistor = isPersistent ? persistStore(store) : null;
export default store;
