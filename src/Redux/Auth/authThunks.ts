import {ThunkType} from "../store";
import {authAPI, LoginDataType} from "../../API/auth-api";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appActions";
import {setIsLoggedInAC} from "./authActions";
import {getTodoListsTC} from "../TodoLists/todoListsThunks";

export const loginTC = (loggedData: LoginDataType): ThunkType => async dispatch => {
   dispatch(setIsFetchingDataAC(true))
   try {
      const data = await authAPI.login(loggedData)
      if (data.resultCode === 0) {
         // await dispatch(getTodoListsTC());
         dispatch(setIsLoggedInAC(true))
      } else {
         dispatch(setIsErrorGettingDataAC(data.messages[0]))
      }
   } catch (e) {

   } finally {
      dispatch(setIsFetchingDataAC(false))
   }

}