import {ThunkType} from "../store";
import {authAPI} from "../../API/auth-api";
import {setIsLoggedInAC} from "../Auth/authActions";
import {setIsInitializedAC} from "./appActions";

export const initializeAppTC = (): ThunkType => async dispatch => {
   try {
      const data = await authAPI.me()
      if (data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true));
      } else {
      }
   } catch (e) {

   } finally {
      dispatch(setIsInitializedAC(true));
   }
}

