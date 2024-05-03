import { createSlice } from "@reduxjs/toolkit";

const fetchDataLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: fetchDataLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cart = state.carts.find((cart) => cart.id === action.payload.id);
      if (cart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === cart.id) {
            item.quantity += 1;
          }
          return {
            ...item,
            quantity: item.quantity,
          };
        });

        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
      storeInLocalStorage(state.carts);
    },

    removeFromCart: (state, action) => {
      const cart = state.carts.filter((cart) => cart.id !== action.payload);
      state.carts = cart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
