import {RootStateType} from "../../store";

export const selectIsFetching = (state: RootStateType): boolean => state.app.isFetching