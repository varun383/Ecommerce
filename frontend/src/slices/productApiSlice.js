import { PRODUCTS_URL } from "../constant.js";
import { apiSlice } from "./apiSlice.js";
import { UPLOAD_URL } from "../constant.js";

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: ({keyword,pageNumber}) => ({
          url: PRODUCTS_URL,
          params:{keyword,pageNumber},
        }),
        keepUnusedDataFor: 5,
        providesTags:['Products']
      }),
      getProductDetails: builder.query({
        query: (productId) => ({
          url: `${PRODUCTS_URL}/${productId}`,
        }),
        keepUnusedDataFor: 5,
      }),
      createProduct: builder.mutation({
        query: () => ({
          url: `${PRODUCTS_URL}`,
          method: 'POST',
        }),
        invalidatesTags: ['Product'],
      }),
      updateProduct: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Product'],
      }),
      uploadProductImage:builder.mutation({
        query:(data)=>({
          url:`${UPLOAD_URL}`,
          method:'POST',
          body:data,
        }),
      }),
      deleteProduct: builder.mutation({
        query: (productId) => ({
          url: `${PRODUCTS_URL}/${productId}`,
          method: 'DELETE',
        }),
        providesTags: ['Product'],
      }),

      createReview: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}/reviews`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Product'],
      }),
      getTopProducts: builder.query({
        query: () => `${PRODUCTS_URL}/top`,
        keepUnusedDataFor: 5,
      }),
    }),
  });
//   The useGetProductsQuery hook is exported from the productSlice. This hook is specifically tailored to the getProducts endpoint, allowing you to easily integrate it into your React components. When you use this hook, it will automatically handle the lifecycle of the API request, fetching and managing the data in your Redux store, and providing the necessary information for rendering and handling loading/error states in your components.

  export const { useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,
  useUploadProductImageMutation,useDeleteProductMutation,useCreateReviewMutation,useGetTopProductsQuery}=productSlice;
//   injectEndpoints is a method provided by apiSlice that allows you to define multiple API endpoints in a single slice.

//   Inside the endpoints object, two endpoints are defined: getProducts and getProductDetails.
  
//   getProducts is defined using the builder.query method. It takes an object with a query function and additional options. The query function specifies the URL to fetch products from (url: PRODUCTS_URL). keepUnusedDataFor is set to 5, indicating that the data fetched by this query will be kept in the store for 5 minutes even if it is not actively used.
  
//   getProductDetails is defined similarly, but it takes a productId parameter in its query function and appends it to the URL to fetch details for a specific product.

