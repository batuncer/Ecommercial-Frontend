import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../config";
import axios from "axios";

const initialState = {
  products: [],
  product: {},
  loading: false,
  totalPages: 0,
  adminProducts: [],
  new: null,
};

export const getProducts = createAsyncThunk("products", async (page = 0) => {
  const response = await fetch(`${config.api.url}/products?page=${page}`);
  const data = await response.json();

  const totalItems = 100;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return { data, totalPages };
});
export const getAdminProducts = createAsyncThunk("admin", async (page = 0) => {
  const response = await fetch(`${config.api.url}/products`);
  const data = await response.json();

  return data;
});

export const createProduct = createAsyncThunk(
  "newProduct",
  async (newProduct) => {
    try {
      const response = await axios.post(
        `${config.api.url}/product/new`,
        newProduct
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

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
      }&price[lte]=${params.price.max || 30000}&category=${params.category}`;
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
        state.products = [...state.products, ...action.payload.data];
        state.totalPages = Math.ceil(100 / 8);
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
      })
      .addCase(getAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts.push(action.payload);
        state.new = action.payload;
      });
  },
});

export default productSlice.reducer;
