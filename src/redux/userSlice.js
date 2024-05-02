import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../config";

const initialState = {
  user: {},
  loading: false,
  isAuth: false,
};
