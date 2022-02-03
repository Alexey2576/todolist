import {ActionsTodoListsType} from "./todoListsActions";
import {FilterPriorityTask, FilterStatusTask} from "../../API/tasks-api";
import {TodoListsStateType} from "../../API/todoLists-api";

export type  OwnTodoListType = {
   filterPriority: FilterPriorityTask,
   filterStatus: FilterStatusTask,
   selectPriorityValue: any
}

const initialTodoListsState: TodoListsStateType[] = [
   {
      id: "todoList_ID_1",
      title: "TodoList 1",
      addedDate: "2022",
      order: 0,
      filterPriority: FilterPriorityTask.All,
      filterStatus: FilterStatusTask.All,
      selectPriorityValue: null
   },
   {
      id: "todoList_ID_2",
      title: "TodoList 2",
      addedDate: "2022",
      order: 0,
      filterPriority: FilterPriorityTask.All,
      filterStatus: FilterStatusTask.All,
      selectPriorityValue: null
   }
]

export const todoListsReducer = (state: TodoListsStateType[] = initialTodoListsState, action: ActionsTodoListsType): TodoListsStateType[] => {
   switch (action.type) {
      case "REMOVE_TODOLIST":
         return state.filter(tl => tl.id !== action.todoList_ID)
      case "ADD_TODOLIST":
         return [
            ...state,
            {id: action.todoList_ID, title: action.title, addedDate: "2022", order: 0, filterPriority: FilterPriorityTask.All, filterStatus: FilterStatusTask.New, selectPriorityValue: null}]
      case "CHANGE_TITLE_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, title: action.newTitle} : tl)
      case "CHANGE_FILTER_CHECKED_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, filterStatus: action.filterStatus} : tl)
      case "CHANGE_FILTER_PRIORITY_TODOLIST":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, filterPriority: action.filterPriority} : tl)
      case "SET_VALUE_SELECT":
         return state.map(tl => tl.id === action.todoList_ID ? {...tl, selectPriorityValue: action.selectPriorityValue} : tl)
      default: return state
   }
}

