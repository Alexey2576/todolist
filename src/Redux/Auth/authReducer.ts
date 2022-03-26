import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
   },
   reducers: {
      setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
         state.isLoggedIn = action.payload.isLoggedIn
      },
   },
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions
