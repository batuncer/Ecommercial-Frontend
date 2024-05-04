import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../config";
import axios from "axios";

const initialState = {
  user: {},
  loading: false,
};

export const getDetails = createAsyncThunk("users/getDetails", async () => {
  try {
    const response = await axios.get(`${config.api.url}/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
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
        state.user = action.payload;
      })
      .addCase(getDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
