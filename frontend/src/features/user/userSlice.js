import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENGLISH_LANGUAGE } from "../../common/constants/languages";
import { logInUser } from "./userAPI";
import i18next from "i18next";

const initialState = {
  user: null,
  settings: {
    language: ENGLISH_LANGUAGE,
    isDarkMode: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
    },
    logIn: (state, action) => {
      state.user = action.payload;
    },
    toggleThemeMode: (state) => {
      state.settings.isDarkMode = !state.settings.isDarkMode;
    },
    setLanguage: (state, action) => {
      state.settings.language = action.payload;
      i18next.changeLanguage(action.payload);
    },
  },
});

export const { logOut, logIn, toggleThemeMode, setLanguage } =
  userSlice.actions;
export const selectUser = (state) => state.root.userReducer;

export default userSlice.reducer;
