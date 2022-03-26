import {authAPI} from "../../API/auth-api";
import {setIsLoggedInAC} from "../Auth/authReducer";
import {setIsInitializedAC} from "./appReducer";
import {AppDispatch} from "../store";

export const initializeAppTC = () => async (dispatch: AppDispatch) => {
   try {
      const data = await authAPI.me()
      if (data.resultCode === 0) {
         dispatch(setIsLoggedInAC({isLoggedIn: true}));
      } else {
      }
   } catch (e) {

   } finally {
      dispatch(setIsInitializedAC({isInitialized: true}));
   }
}

