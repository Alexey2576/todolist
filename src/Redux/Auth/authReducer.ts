import {ActionsAuthType} from "./authActions";

const initialState: AuthStateType = {
   isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionsAuthType): AuthStateType => {
   switch (action.type) {
      case "login/SET-IS-LOGGED-IN":
         return {
            ...state,
            ...action.payload
         }
      default:
         return state
   }
}

type AuthStateType = {
   isLoggedIn: boolean
}