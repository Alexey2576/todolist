import {AppDispatch, RootStateType} from "../store";
import {tasksApi} from "../../API/tasks-api";
import {
   FilterPriorityTask,
   removeTaskAC,
   setProgressTaskAC,
   UpdateDomainBodyTaskType,
   updateTaskAC
} from "./tasksReducer";
import {setIsErrorGettingDataAC} from "../App/appReducer";

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