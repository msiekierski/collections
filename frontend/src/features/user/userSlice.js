import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInUser } from "./userAPI";

const initialState = {
  user: null,
  settings: {
    language: "pl",
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
  },
});

export const { logOut, logIn, toggleThemeMode } = userSlice.actions;
export const selectUser = (state) => state.root.userReducer;

export default userSlice.reducer;
