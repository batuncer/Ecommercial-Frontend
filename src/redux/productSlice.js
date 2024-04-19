import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../config";

const initialState = {
  products: [],
  product: {},
  loading: false,
};

export const getProducts = createAsyncThunk("products", async () => {
  const response = await fetch(`${config.api.url}/products`);
  return await response.json();
});

export const getProductsSearch = createAsyncThunk(
  "products2",
  async (params) => {
    let link = `${config.api.url}/products?keyword=${
      params.keyword
    }&rating[gte]=${params.rate || 0}&price[gte]=${
      params.price.min || 0
    }&price[lte]=${params.price.max || 30000}`;

    if (params.category) {
      link = `${config.api.url}/products?keyword=${
        params.keyword
      }&rating[gte]=${params.rate || 0}&price[gte]=${
        params.price.min || 0
      }&price[lte]=${params.price.max || 30000}&catagory=${params.category}`;
    }

    const response = await fetch(link);
    return await response.json();
  }
);

export const getProductDetails = createAsyncThunk("product", async (id) => {
  const response = await fetch(`${config.api.url}/products/${id}`);
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
      })
      .addCase(getProductsSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;
