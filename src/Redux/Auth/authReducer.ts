import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI, LoginDataType} from "../../API/auth-api";
import {initializeAppTC, setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";
import {FieldsErrorType} from "../../API/settings-api";

export const loginTC = createAsyncThunk<undefined, LoginDataType, {
   rejectValue: { errorMessage: string, fieldsError?: FieldsErrorType[] }
}>("auth/login",
   async (loggedData, {dispatch, rejectWithValue}) => {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      try {
         const data = await authAPI.login(loggedData)
         if (data.resultCode === 0) {
            return
         } else {
            dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0], fieldsError: data.fieldsErrors})
         }
      } catch (e) {
         dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingDataAC({isFetching: false}))
      }
   })

export const logoutTC = createAsyncThunk<undefined, undefined, { rejectValue: { errorMessage: string } }>
("auth/logout",
   async (_, {dispatch, rejectWithValue}) => {
      dispatch(setIsFetchingDataAC({isFetching: true}))
      try {
         const data = await authAPI.logout()
         if (data.resultCode === 0) {
            return;
         } else {
            dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
            return rejectWithValue({errorMessage: data.messages[0]})
         }
      } catch (e) {
         dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
         return rejectWithValue({errorMessage: "Some error"})
      } finally {
         dispatch(setIsFetchingDataAC({isFetching: false}))
      }
   })

const slice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
         })
         .addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
         })
         .addCase(initializeAppTC.fulfilled, (state) => {
            state.isLoggedIn = true
         })
   }
})

export const authReducer = slice.reducer
