import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import cartReducer from './slices/cartSlice'
import authSliceReducer from './slices/authSlice.js';
const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart:cartReducer,
      auth:authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
  
  export default store;

//   This code sets up an API slice using Redux Toolkit for managing asynchronous API requests. The constants in constant.js define various URLs used in the application, and the apiSlice.js file creates an API object with a base query and potential endpoints (which are currently empty). The store.js file configures the Redux store and integrates the API slice reducer and middleware.

// Remember to further extend the endpoints section in apiSlice.js with actual API endpoint definitions for your application.



