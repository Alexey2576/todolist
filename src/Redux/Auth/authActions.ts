export type ActionsAuthType =
   | ReturnType<typeof setIsLoggedInAC>


export const setIsLoggedInAC = (isLoggedIn: boolean) =>
   ({type: 'login/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const)



