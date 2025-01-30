import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("accessToken");
      console.log("Access token:", accessToken); 
    
      if (accessToken) {
        // This header is optional, depending on how your backend verifies the token (cookie vs. Authorization header)
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    
      return headers;
    },
    
    
    credentials: 'include',
  }),
  endpoints: (builder) => ({
  }),
});

export const { } = apiSlice;
