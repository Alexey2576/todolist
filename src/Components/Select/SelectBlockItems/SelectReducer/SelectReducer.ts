import {SelectStateType} from "../../Select";
import {FilterType} from "../../../../App";

const SET_VISIBLE = "SET_VISIBLE"
const SET_SELECT_ITEM = "SET_SELECT_ITEM"
const SET_HOVERED_ITEM = "SET_HOVERED_ITEM"
const SET_NEW_SELECT = "SET_NEW_SELECT"

export type DispatchType = {
   type: string,
   title: FilterType
   todoList_ID: string
   visible?: boolean
}

export const selectReducer = (state: SelectStateType, action: DispatchType): SelectStateType => {
   switch (action.type) {
      case SET_VISIBLE:
         return {
            ...state,
            [action.todoList_ID]: {
               ...state[action.todoList_ID],
               visible: !action.visible
            }
         }
      case SET_SELECT_ITEM: {
         return {
            ...state,
            [action.todoList_ID]: {
               ...state[action.todoList_ID],
               selectItem: action.title
            }
         }
      }
      case SET_HOVERED_ITEM: {
         return {
            ...state,
            [action.todoList_ID]: {
               ...state[action.todoList_ID],
               hoveredItem: action.title
            }
         }
      }
      case SET_NEW_SELECT: {
         state[action.todoList_ID] = {
            list: [
               {id: 0, title: "High"},
               {id: 1, title: "Middle"},
               {id: 2, title: "Low"},
            ],
            visible: false,
            selectItem: action.title,
            hoveredItem: action.title}
         return {...state}
      }
      default:
         throw new Error("Error")
   }
}

export const setVisibleAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string,
   visible: boolean
) => dispatch({type: SET_VISIBLE, title: "High", todoList_ID, visible})

export const setSelectItemAC = (
   dispatch: (dispatch: DispatchType) => void,
   title: FilterType, todoList_ID: string
) => dispatch({type: SET_SELECT_ITEM, title, todoList_ID})

export const setHoveredItemAC = (
   dispatch: (dispatch: DispatchType) => void,
   title: FilterType, todoList_ID: string
) => dispatch({type: SET_HOVERED_ITEM, title, todoList_ID})

export const setNewSelectAC = (
   dispatch: (dispatch: DispatchType) => void,
   todoList_ID: string
) => dispatch({type: SET_NEW_SELECT, title: "High", todoList_ID})