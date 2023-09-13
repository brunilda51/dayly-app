import {configureStore} from "@reduxjs/toolkit";
import loggedInUserReducer from "./loggedInUser";

export const store = configureStore({
  reducer: {
    user: loggedInUserReducer
  }
})