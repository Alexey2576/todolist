import {TodoListsStateType} from "../../../Reducers/TodoListsReducer/todoListsReducer";
import {TasksStateType} from "../../../Reducers/TasksReducer/tasksReducer";
import {FilterCheckedTaskType, FilterPriorityTaskType} from "../../../App";
import React from "react";
import {TaskType} from "./ListTasksTodoList/TaskTodoList/TaskTodoList";
import {Grid, Paper} from "@material-ui/core";
import {TitleTodoLists} from "./TitleTodoList/TitleTodoList";
import {AddTaskTodoList} from "./AddTaskTodoList/AddTaskTodoList";
import {LinearProgressTasks} from "./LinearProgressTasks/LinearProgressTasks";
import {ListTasksTodoList} from "./ListTasksTodoList/ListTasksTodoList";
import {FilterButtons} from "./FilterButtons/FilterButtons";

export type TodoListType = {
   todoList: TodoListsStateType
   tasksState: TasksStateType
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeFilterCheckedTodoList: (todoList_ID: string, filterChecked: FilterCheckedTaskType) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTaskType) => void
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterPriorityTaskType) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}
export const TodoList: React.FC<TodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const {tasksState, todoList} = props

   //========================================= FILTERED TASKS =====================================================================================================
   const getFilteredPriorityTasks = (todoList_ID: string, filterPriority: FilterPriorityTaskType): TaskType[] => {
      switch (filterPriority) {
         case "High":
            return tasksState[todoList_ID].filter(t => t.task_priority === "High")
         case "Middle":
            return tasksState[todoList_ID].filter(t => t.task_priority === "Middle")
         case "Low":
            return tasksState[todoList_ID].filter(t => t.task_priority === "Low")
         default:
            return tasksState[todoList_ID]
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

   //========================================= CONSTANTS ===============================================================
   const filteredTasks = getFilteredCheckedTasksCallback(todoList.todoList_ID, todoList.filterChecked, todoList.filterPriority)
   const numberOfAllTasks = tasksState[todoList.todoList_ID].length
   const numberOfCompletedTasks = tasksState[todoList.todoList_ID].filter(t => t.checked).length
   return (
      <Grid item spacing={6} md={4} xs={3}>
         <Paper elevation={7} style={{padding: "10px"}}>
            <TitleTodoLists todoList_ID={todoList.todoList_ID}
                            title={todoList.title}
                            {...props}/>
            <AddTaskTodoList todoList_ID={todoList.todoList_ID}
                             selectValue={todoList.selectValue}
                             {...props}/>
            <LinearProgressTasks numberOfAllTasks={numberOfAllTasks}
                                 numberOfCompletedTasks={numberOfCompletedTasks}/>
            <ListTasksTodoList todoList_ID={todoList.todoList_ID}
                               tasks={filteredTasks}
                               {...props}/>
            <FilterButtons todoList_ID={todoList.todoList_ID}
                           filterChecked={todoList.filterChecked}
                           filterPriority={todoList.filterPriority}
                           {...props}/>
         </Paper>
      </Grid>
   )
})