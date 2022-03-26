import {
   FilterPriorityTask,
   FilterStatusTask,
   TasksStateType,
   TaskType
} from "../../../Redux/Tasks/tasksReducer";
import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TitleTodoLists} from "./TitleTodoList/TitleTodoList";
import {AddTaskTodoList} from "./AddTaskTodoList/AddTaskTodoList";
import {LinearProgressTasks} from "./LinearProgressTasks/LinearProgressTasks";
import {ListTasksTodoList} from "./ListTasksTodoList/ListTasksTodoList";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {getTasksTC} from "../../../Redux/Tasks/tasksThunks";
import {TodoListsStateType} from "../../../Redux/TodoLists/todoListsReducer";
import {useAppDispatch} from "../../../Redux/store";

export type TodoListType = {
   todoList: TodoListsStateType
   tasksState: TasksStateType
   addTaskCallback: (todoList_ID: string, value: string, selectPriorityValue: FilterPriorityTask) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeFilterStatusTodoListCallback: (todoList_ID: string, filterStatus: FilterStatusTask) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTask) => void
   changeValueSelectCallback: (todoList_ID: string, selectPriorityValue: FilterPriorityTask) => void
   changeStatusTaskCallback: (todoList_ID: string, task_ID: string, checked: FilterStatusTask) => void
   changeTitleTodoListCallback: (todoList_ID: string, valueTitle: string) => void
   changeTitleTaskCallback: (todoList_ID: string, task_ID: string, title: string) => void
}
export const TodoList: React.FC<TodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const {tasksState, todoList} = props

   //========================================= FILTERED TASKS =====================================================================================================
   const getFilteredPriorityTasks = (todoList_ID: string, filterPriority: FilterPriorityTask): TaskType[] => {
      switch (filterPriority) {
         case FilterPriorityTask.High:
            return tasksState[todoList_ID].filter(t => t.priority === FilterPriorityTask.High)
         case FilterPriorityTask.Middle:
            return tasksState[todoList_ID].filter(t => t.priority === FilterPriorityTask.Middle)
         case FilterPriorityTask.Low:
            return tasksState[todoList_ID].filter(t => t.priority === FilterPriorityTask.Low)
         default:
            return tasksState[todoList_ID]
      }
   }
   const getFilteredCheckedTasksCallback = (todoList_ID: string, filterStatus: FilterStatusTask, filterPriority: FilterPriorityTask): TaskType[] => {
      const filteredPriorityState = getFilteredPriorityTasks(todoList_ID, filterPriority)
      switch (filterStatus) {
         case FilterStatusTask.New:
            return filteredPriorityState.filter(t => t.status === FilterStatusTask.New)
         case FilterStatusTask.Completed:
            return filteredPriorityState.filter(t => t.status === FilterStatusTask.Completed)
         default:
            return filteredPriorityState
      }
   }

   //========================================= CONSTANTS ===============================================================
   const filteredTasks = getFilteredCheckedTasksCallback(todoList.id, todoList.filterStatus, todoList.filterPriority)
   const numberOfAllTasks = tasksState[todoList.id].length
   const numberOfCompletedTasks = tasksState[todoList.id].filter(t => t.status === FilterStatusTask.Completed).length

   //========================================= USE EFFECT ===============================================================
   const dispatch = useAppDispatch()
   useEffect(() => {
      dispatch(getTasksTC(todoList.id))
   }, [dispatch, todoList.id])

   return (
      <Grid item>
         <Paper elevation={7} style={{padding: "10px"}}>
            <TitleTodoLists todoList_ID={todoList.id}
                            title={todoList.title}
                            {...props}/>
            <AddTaskTodoList todoList_ID={todoList.id}
                             progressTodoList={todoList.progress}
                             selectPriorityValue={todoList.selectPriorityValue}
                             {...props}/>
            {numberOfAllTasks !== 0 &&
            <LinearProgressTasks numberOfAllTasks={numberOfAllTasks}
                                 numberOfCompletedTasks={numberOfCompletedTasks}/>}
            <ListTasksTodoList todoList_ID={todoList.id}
                               tasks={filteredTasks}
                               {...props}/>
            <FilterButtons todoList_ID={todoList.id}
                           filterStatus={todoList.filterStatus}
                           filterPriority={todoList.filterPriority}
                           {...props}/>
         </Paper>
      </Grid>
   )
})