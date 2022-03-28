import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../API/auth-api";

export const initializeAppTC = createAsyncThunk(
   "app/initializeApp",
   async (_, {dispatch, rejectWithValue}) => {
      try {
         const data = await authAPI.me()
         if (data.resultCode === 0) {
            return {isLoggedIn: true}
         } else {
            dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      }
   })

const slice = createSlice({
   name: "app",
   initialState: {
      isFetching: false,
      isInitialized: false,
      errorMessage: "",
   },
   reducers: {
      setIsFetchingDataAC(state, action: PayloadAction<{ isFetching: boolean }>) {
         state.isFetching = action.payload.isFetching
      },
      setIsErrorGettingDataAC(state, action: PayloadAction<{ errorMessage: string }>) {
         state.errorMessage = action.payload.errorMessage
      },
   },
   extraReducers: builder => {
      builder
         .addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
         })
         .addCase(initializeAppTC.rejected, (state) => {
            state.isInitialized = true
         })
   }
})

export const appReducer = slice.reducer
export const {setIsErrorGettingDataAC, setIsFetchingDataAC} = slice.actions