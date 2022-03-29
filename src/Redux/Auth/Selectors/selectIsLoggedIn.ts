import {RootStateType} from "../../store";

export const selectIsLoggedIn = (state: RootStateType): boolean => state.auth.isLoggedIn