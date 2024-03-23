// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { lightTheme, darkTheme } from "../themes";

const initialState = lightTheme;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state === lightTheme ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: any) => state.theme;

export default themeSlice.reducer;
