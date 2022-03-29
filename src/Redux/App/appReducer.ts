import {authAPI} from "../../API/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initializeApp = createAsyncThunk(
   "app/initializeApp",
   async (_, {dispatch, rejectWithValue}) => {
      try {
         const data = await authAPI.me()
         if (data.resultCode === 0) {
            return {isLoggedIn: true}
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      }
   })

export const asyncActions = {
   initializeApp
}

export const slice = createSlice({
   name: "app",
   initialState: {
      errorMessage: "",
      isFetching: false,
      isInitialized: false,
   },
   reducers: {
      setIsFetchingData: (state, action: PayloadAction<{ isFetching: boolean }>) => {
         state.isFetching = action.payload.isFetching
      },
      setIsErrorGettingData: (state, action: PayloadAction<{ errorMessage: string }>) => {
         state.errorMessage = action.payload.errorMessage
      },
   },
   extraReducers: builder => {
      builder
         .addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
         })
         .addCase(initializeApp.rejected, (state) => {
            state.isInitialized = true
         })
   }
})

export const appReducer = slice.reducer
export const {setIsErrorGettingData, setIsFetchingData} = slice.actions