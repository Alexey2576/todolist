import {useDispatch} from 'react-redux'
import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import {AppDispatch} from "../Redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
   const dispatch = useAppDispatch()

   return useMemo(() => {
      return bindActionCreators(actions, dispatch)
   }, [])
}