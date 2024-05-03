import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../config";

const initialState = {
  user: {},
  loading: false,
};

export const getDetails = createAsyncThunk("users", async (id) => {
  const response = await fetch(`${config.api.url}/user/${id}`);
  return await response.json();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      });
  },
});

export default userSlice.reducer;
