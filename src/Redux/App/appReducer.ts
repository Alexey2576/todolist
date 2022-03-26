import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
      setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
         state.isInitialized = action.payload.isInitialized
      },
      setIsErrorGettingDataAC(state, action: PayloadAction<{ errorMessage: string }>) {
         state.errorMessage = action.payload.errorMessage
      },
   },
})

export const appReducer = slice.reducer
export const {setIsErrorGettingDataAC, setIsFetchingDataAC, setIsInitializedAC} = slice.actions