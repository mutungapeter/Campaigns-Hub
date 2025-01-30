
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoading, userLoggedIn, userLoggedOut } from "./authSlice";
import Cookies from "js-cookie";
import React from "react";


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/auth/login/`,
        method: "POST",
        body: {
        email,
        password,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoading());
          const result = await queryFulfilled;
          console.log("result", result);
          console.log("Access Token:", result.data.user.accessToken);
          
          Cookies.set("accessToken", result.data.user.accessToken);
          dispatch(
            userLoggedIn({
              accessToken: result.data.user.accessToken,
              
              
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  
  }),
});
export const {
 
  useLoginMutation,

} = authApi;
