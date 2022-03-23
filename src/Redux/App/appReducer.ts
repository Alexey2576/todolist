import {ActionsAppType} from "./appActions";

const initialState: AppStateType = {
   isFetching: false,
   errorMessage: "",
}

export const appReducer = (state: AppStateType = initialState, action: ActionsAppType): AppStateType => {
   switch (action.type) {
      case "SET_IS_FETCHING_DATA":
      case "SET_IS_ERROR_GETTING_DATA":
         return {...state, ...action.payload}
      default:
         return state
   }
}

type AppStateType = {
   isFetching: boolean
   errorMessage: string
}