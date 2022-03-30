import {FieldsErrorType} from "../../API/settings-api";
import {authAPI, LoginDataType} from "../../API/auth-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {initializeApp, setIsErrorGettingData, setIsFetchingData} from "../App/appReducer";

const login = createAsyncThunk<undefined, LoginDataType, {
   rejectValue: { errorMessage: string, fieldsError?: FieldsErrorType[] }
}>(
   "auth/login",
   async (loggedData, {dispatch, rejectWithValue}
   ) => {
      dispatch(setIsFetchingData({isFetching: true}))
      try {
         const data = await authAPI.login(loggedData)
         if (data.resultCode === 0) {
            return
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0], fieldsError: data.fieldsErrors})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

const logout = createAsyncThunk<undefined, undefined, { rejectValue: { errorMessage: string } }>(
   "auth/logout",
   async (_, {dispatch, rejectWithValue}
   ) => {
      dispatch(setIsFetchingData({isFetching: true}))
      try {
         const data = await authAPI.logout()
         if (data.resultCode === 0) {
            return;
         } else {
            dispatch(setIsErrorGettingData({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingData({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingData({isFetching: false}))
      }
   })

export const asyncActions = {
   login,
   logout,
}

const slice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
         })
         .addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
         })
         .addCase(initializeApp.fulfilled, (state) => {
            state.isLoggedIn = true
         })
   }
})

export const authReducer = slice.reducer
