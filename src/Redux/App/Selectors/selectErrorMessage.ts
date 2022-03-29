import {RootStateType} from "../../store";

export const selectErrorMessage = (state: RootStateType): string => state.app.errorMessage