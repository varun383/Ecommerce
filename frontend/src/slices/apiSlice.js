import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant.js';

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})

//API CREATION

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['Product','User','Order'],
    endpoints:(builder)=>({})
})

// The fetchBaseQuery function is imported from the @reduxjs/toolkit/query/react library and used to create a base query with the specified baseUrl (taken from BASE_URL).

// createApi is then used to create an API object (apiSlice) with the specified baseQuery. The tagTypes array is used to define tag types for grouping and associating queries.

// The endpoints function is an empty object in this case. You would typically define your API endpoints here using the builder argument.