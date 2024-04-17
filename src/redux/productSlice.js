import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  loading: false,
};

export const getProducts = createAsyncThunk("products", async () => {
  const response = await fetch(`http://localhost:8080/products/`);
  return await response.json();
});

export const getProductDetails = createAsyncThunk("product", async (id) => {
  const response = await fetch(`http://localhost:8080/products/${id}`);
  return await response.json();
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      });
  },
});

export default productSlice.reducer;
