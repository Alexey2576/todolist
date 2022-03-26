import {AppDispatch, RootStateType} from "../store";
import {tasksApi} from "../../API/tasks-api";
import {
   addTaskAC,
   FilterPriorityTask,
   removeTaskAC,
   setAllTasksTodoListAC,
   setProgressTaskAC,
   UpdateDomainBodyTaskType,
   updateTaskAC
} from "./tasksReducer";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appReducer";
import {setProgressTodoListAC} from "../TodoLists/todoListsReducer";

export const getTasksTC = (todoListID: string) => async (dispatch: AppDispatch) => {
   try {
      const data = await tasksApi.getTasks(todoListID, 10, 1)
      if (data) {
         dispatch(setAllTasksTodoListAC({todoListID, tasks: data.items}))
         dispatch(setIsFetchingDataAC({isFetching: false}))
      }
   } catch (e) {
      
   }
}

export const addTaskTC = (title: string, todoList_ID: string, selectPriorityValue: FilterPriorityTask) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setProgressTodoListAC({todoList_ID, progress: "add-task"}))
      const data = await tasksApi.createTask(todoList_ID, title)
      if (data.resultCode === 0) {
         const updateDomainTaskBody: UpdateDomainBodyTaskType = {
            title: data.data.item.title,
            description: data.data.item.description,
            status: data.data.item.status,
            priority: selectPriorityValue,
            startDate: data.data.item.startDate,
            deadline: data.data.item.deadline,
         }
         dispatch(addTaskAC({title, todoList_ID, selectPriorityValue, task: data.data.item}))
         const updateTask = await tasksApi.updateTask(todoList_ID, data.data.item.id, updateDomainTaskBody)
         if (data.resultCode === 0) {
            dispatch(updateTaskAC({todoList_ID, task_ID: data.data.item.id, updateTaskBody: updateTask.data.item}))
         }
      } else {
         dispatch(setIsErrorGettingDataAC({errorMessage: data.messages[0]}))
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
   } finally {
      dispatch(setProgressTodoListAC({todoList_ID, progress: null}))
   }
}

export const removeTaskTC = (todoList_ID: string, task_ID: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(setProgressTaskAC({todoList_ID, task_ID, progress: "remove-task"}))
      const data = await tasksApi.deleteTask(todoList_ID, task_ID)
      if (data.resultCode === 0) {
         dispatch(removeTaskAC({todoList_ID, task_ID}))
         dispatch(setProgressTaskAC({todoList_ID, task_ID, progress: null}))
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC({errorMessage: "Some error"}))
   }
}

export const updateTaskTC = (todoList_ID: string, task_ID: string, updateTaskBody: UpdateBodyTaskType) => async (dispatch: AppDispatch, getState: () => RootStateType) => {
   try {
      const task = getState().tasks[todoList_ID].find(t => t.id === task_ID)
      if (!task) {
         throw new Error("Error")
      }
      const updateDomainTaskBody: UpdateDomainBodyTaskType = {
         title: task.title,
         description: task.description,
         status: task.status,
         priority: task.priority,
         startDate: task.startDate,
         deadline: task.deadline,
         ...updateTaskBody
      }

      const updateData = await tasksApi.updateTask(todoList_ID, task.id, updateDomainTaskBody)
      if (updateData.resultCode === 0) {
         dispatch(updateTaskAC({todoList_ID, task_ID: task.id, updateTaskBody: updateData.data.item}))
      }
   } catch (e) {
      
   }
}

type UpdateBodyTaskType = {
   title?: string
   description?: string
   status?: number
   priority?: FilterPriorityTask
   startDate?: string
   deadline?: string
}