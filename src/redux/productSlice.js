import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
};

export const getProducts = createAsyncThunk("products", async () => {
  const response = await fetch(`http://localhost:8080/products/`);
  return await response.json();
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loading: (state, payload) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
