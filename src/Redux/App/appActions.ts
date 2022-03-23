export type ActionsAppType =
   | ReturnType<typeof setIsFetchingDataAC>
   | ReturnType<typeof setIsErrorGettingDataAC>

export const setIsFetchingDataAC = (isFetching: boolean) => ({type: "SET_IS_FETCHING_DATA", payload: {isFetching}} as const)
export const setIsErrorGettingDataAC = (errorMessage: string) => ({type: "SET_IS_ERROR_GETTING_DATA", payload: {errorMessage}} as const)