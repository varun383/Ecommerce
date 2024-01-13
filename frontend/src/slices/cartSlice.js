import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [],shippingAddress:{},paymentMethod:'PayPal' };

// const addDecimals = (num) => {
//   return (Math.round(num * 100) / 100).toFixed(2);
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;
      // Update the cart state using the updateCart function
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems || [];
      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter((x) => x && x._id !== action.payload);

      // Update the prices and save to storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart,removeFromCart,saveShippingAddress,savePaymentMethod,clearCartItems} = cartSlice.actions;

export default cartSlice.reducer;


//In summary, this code sets up a Redux slice for managing a shopping cart, defining actions to add items to the cart and calculating various prices associated with the cart. The state is also persisted in the local storage.
