import React, {useCallback, useReducer, useState} from 'react';
import {v1} from "uuid";
import s from './App.module.css'
import {
   addTaskAC,
   addTodoListAC,
   removeTaskAC,
   removeTodoListAC,
   setCheckedTaskAC,
   setFilterCheckedTodoListAC,
   setFilterPriorityTodoListAC,
   setValueInputAddTodoListAC,
   setValueSelectAC,
   todoListReducer
} from "./Components/TodoListReducer/TodoListReducer";
import {MemoizedAddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {TodoLists} from "./Components/TodoLists/TodoLists";
import {AppBarTodoList} from "./Components/AppBarTodoList/AppBarTodoList";
import {Container} from "@material-ui/core";
import {TaskType} from "./Components/TodoLists/ListTasksTodoList/TaskTodoList/TaskTodoList";

export type TodoListsType = {
   todoList_ID: string
   title: string
   filterPriority: FilterPriorityTaskType
   filterChecked: FilterCheckedTaskType
   selectValue: FilterPriorityTaskType
}
export type TasksType = {
   [todoList_ID: string]: TaskType[]
}
export type FilterPriorityTaskType = "High" | "Middle" | "Low" | "All" | null
export type FilterCheckedTaskType = "All" | "Completed" | "Active"
export type TodoListStateType = {
   todoLists: TodoListsType[]
   tasks: TasksType
   valueInputAddTodoList: string
}

const App = () => {
   //========================================= INITIAL STATE ===========================================================
   const todoList_ID_1 = v1()
   const todoList_ID_2 = v1()
   const initialState: TodoListStateType = {
      todoLists: [
         {
            todoList_ID: todoList_ID_1,
            title: "TodoList 1",
            filterPriority: "All",
            filterChecked: "All",
            selectValue: null
         },
         {
            todoList_ID: todoList_ID_2,
            title: "TodoList 2",
            filterPriority: "All",
            filterChecked: "All",
            selectValue: null
         }
      ],
      tasks: {
         [todoList_ID_1]: [
            {task_ID: "1", checked: false, task_title: "HTML", task_priority: "High"},
            {task_ID: "2", checked: false, task_title: "CSS", task_priority: "Middle"},
            {task_ID: "3", checked: false, task_title: "REACT", task_priority: "Low"}
         ],
         [todoList_ID_2]: [
            {task_ID: "1", checked: false, task_title: "HTML5", task_priority: "High"},
            {task_ID: "2", checked: false, task_title: "CSS3", task_priority: "Middle"},
            {task_ID: "3", checked: false, task_title: "REDUX", task_priority: "Low"}
         ]
      },
      valueInputAddTodoList: ""
   }

   //========================================= USE STATE AND REDUCER ===================================================
   const [state, dispatch] = useReducer(todoListReducer, initialState)
   const [error, setError] = useState<boolean>(false)

   //========================================= TODOLIST CALLBACKS ==========================================================================================================================================================================
   const addTodoListCallback = useCallback(() => {
      if (!error && state.valueInputAddTodoList.length) {
         const newTodoList_ID = v1()
         dispatch(addTodoListAC(newTodoList_ID))
      }
   }, [addTodoListAC])
   const addTaskCallback = useCallback((todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => {
      !error
      && value.length
      && dispatch(addTaskAC(value, todoList_ID, selectValue))
   }, [addTaskAC])
   const removeTaskCallback = useCallback((todoList_ID: string, task_ID: string) => dispatch(removeTaskAC(todoList_ID, task_ID)), [removeTaskAC])
   const removeTodoListCallback = useCallback((todoList_ID: string) => dispatch(removeTodoListAC(todoList_ID)), [removeTodoListAC])
   const changeTextNewTodoListCallback = useCallback((value: string) => dispatch(setValueInputAddTodoListAC(value)), [setValueInputAddTodoListAC])
   const changeFilterCheckedTodoListCallback = useCallback((todoList_ID: string, filterChecked: FilterCheckedTaskType) => dispatch(setFilterCheckedTodoListAC(todoList_ID, filterChecked)), [setFilterCheckedTodoListAC])
   const changeFilterPriorityTodoListCallback = useCallback((todoList_ID: string, filterPriority: FilterPriorityTaskType) => dispatch(setFilterPriorityTodoListAC(todoList_ID, filterPriority)), [setFilterPriorityTodoListAC])
   const changeValueSelectCallback = useCallback((todoList_ID: string, selectValue: FilterPriorityTaskType) => dispatch(setValueSelectAC(todoList_ID, selectValue)), [setValueSelectAC])
   const changeCheckedTaskCallback = useCallback((todoList_ID: string, task_ID: string, checked: boolean) => dispatch(setCheckedTaskAC(todoList_ID, task_ID, checked)), [setCheckedTaskAC])

   //========================================= FILTERED TASKS (CALLBACK) ====================================================================================================================================================================
   const getFilteredPriorityTasks = (todoList_ID: string, filterPriority: FilterPriorityTaskType): TaskType[] => {
      switch (filterPriority) {
         case "High":
            return state.tasks[todoList_ID].filter(t => t.task_priority === "High")
         case "Middle":
            return state.tasks[todoList_ID].filter(t => t.task_priority === "Middle")
         case "Low":
            return state.tasks[todoList_ID].filter(t => t.task_priority === "Low")
         default:
            return state.tasks[todoList_ID]
      }
   }
   const getFilteredCheckedTasksCallback = (todoList_ID: string, filterChecked: FilterCheckedTaskType, filterPriority: FilterPriorityTaskType): TaskType[] => {
      const filteredPriorityState = getFilteredPriorityTasks(todoList_ID, filterPriority)
      switch (filterChecked) {
         case "Active":
            return filteredPriorityState.filter(t => !t.checked)
         case "Completed":
            return filteredPriorityState.filter(t => t.checked)
         default:
            return filteredPriorityState
      }
   }

   return (
      <div className={s.todoLists}>
         <AppBarTodoList/>
         <Container>
            <MemoizedAddNewTodoList value={state.valueInputAddTodoList}
                                    addTodoListCallback={addTodoListCallback}
                                    changeTextNewTodoListCallback={changeTextNewTodoListCallback}/>
            <TodoLists state={state}
                       addTaskCallback={addTaskCallback}
                       removeTaskCallback={removeTaskCallback}
                       removeTodoListCallback={removeTodoListCallback}
                       changeFilterCheckedTodoList={changeFilterCheckedTodoListCallback}
                       changeFilterPriorityTodoList={changeFilterPriorityTodoListCallback}
                       changeValueSelectCallback={changeValueSelectCallback}
                       changeCheckedTaskCallback={changeCheckedTaskCallback}
                       getFilteredCheckedTasksCallback={getFilteredCheckedTasksCallback}/>
         </Container>
      </div>
   );
};

export default App;