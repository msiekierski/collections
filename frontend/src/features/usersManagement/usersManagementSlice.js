import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers, updateUser, deleteUser } from "./usersManagementAPI";

const initialState = {
  users: [],
  isFetching: true,
  isUpdating: false,
};

export const getUsers = createAsyncThunk(
  "usersManagement/getUsers",
  async () => {
    const { data } = await fetchUsers();
    return data;
  }
);

export const updateUsers = createAsyncThunk(
  "usersManagement/updateUsers",
  async ({ selectedIds, values }) => {
    await Promise.allSettled(
      selectedIds.map((userId) => updateUser(userId, values))
    );
  }
);

export const deleteUsers = createAsyncThunk(
  "usersManagement/deleteUsers",
  async ({ selectedIds }) => {
    await Promise.allSettled(selectedIds.map((userId) => deleteUser(userId)));
  }
);

export const usersManagementSlice = createSlice({
  name: "usersManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isFetching = false;
      })
      .addCase(updateUsers.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUsers.fulfilled, (state) => {
        state.isUpdating = false;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        state.isUpdating = false;
      });
  },
});

export const {} = usersManagementSlice.actions;

export const selectUsersManagement = (state) => state.usersManagement;

export default usersManagementSlice.reducer;
