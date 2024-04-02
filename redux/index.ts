// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import { emptySplitApi } from "./emptyApi";
import authReducer from "./authSlice"; // Import as default export

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

const endpoints = emptySplitApi.endpoints;
