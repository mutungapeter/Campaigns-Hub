import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string;
  user: any;
  tokenExpiry: number | null;
  loading: boolean; 
  error: string | null;
}

const initialState: AuthState = {
  accessToken: "",
  user: null,
  tokenExpiry: null,
  loading: false, 
  error: null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
      userLoading: (state) => {
        state.loading = true;
        state.error = null;  
      },
  
      userLoggedIn: (
        state,
        action: PayloadAction<{
          accessToken: string;
          // refreshToken: string;
          user: any;
        }>
      ) => {
        const accessToken = action.payload.accessToken;
  
  if (typeof accessToken !== 'string') {
    throw new Error('Invalid token specified: must be a string');
  }
        state.user = action.payload.user;
        
        const decodedToken: any = jwtDecode(action.payload.accessToken);
        state.tokenExpiry = decodedToken.exp * 1000; 
  
        state.loading = false; 
      },
  
      userLoggedOut: (state) => {
        state.accessToken = "";
       
        state.user = null;
        state.tokenExpiry = null;
        state.loading = false;
        Cookies.remove("accessToken");
      
      },
  
      userLoginFailed: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;  
      },
      loadUser: (state) => {
        // console.log("Loading user...");
        state.loading = true;
        const accessToken = Cookies.get("accessToken");
       ;
  
        if (accessToken ) {
          const decodedToken: any = jwtDecode(accessToken);
          state.accessToken = accessToken;
          
          state.user = decodedToken;  
          state.tokenExpiry = decodedToken.exp * 1000;
          state.loading = false;
        } else {
          state.accessToken = "";
         
          state.user = null;
          state.tokenExpiry = null;
        }
        state.loading = false;
        // console.log("Loading state set to false");
      },
    }
})

export const  {userLoggedIn,userLoggedOut,userLoginFailed, loadUser, userLoading} = authSlice.actions;
export default authSlice.reducer;