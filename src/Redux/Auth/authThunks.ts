import {authAPI, LoginDataType} from "../../API/auth-api";
import {setIsLoggedInAC} from "./authReducer";
import {Dispatch} from "redux";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";

export const loginTC = (loggedData: LoginDataType) => async (dispatch: Dispatch) => {
   dispatch(setIsFetchingDataAC({isFetching: true}))
   try {
      const data = await authAPI.login(loggedData)
      if (data.resultCode === 0) {
         dispatch(setIsLoggedInAC({isLoggedIn: true}))
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
      }
   } catch (e) {

   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
   dispatch(setIsFetchingDataAC({isFetching: true}))
   try {
      const data = await authAPI.logout()
      if (data.resultCode === 0) {
         dispatch(setIsLoggedInAC({isLoggedIn: false}))
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
      }
   } catch (e) {

   } finally {
      dispatch(setIsFetchingDataAC({isFetching: false}))
   }
}