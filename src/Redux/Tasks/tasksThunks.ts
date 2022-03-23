import {RootStateType, ThunkType} from "../store";
import {addTaskAC, removeTaskAC, setAllTasksTodoListAC, setProgressTaskAC, updateTaskAC} from "./tasksActions";
import {tasksApi} from "../../API/tasks-api";
import {FilterPriorityTask, UpdateDomainBodyTaskType} from "./tasksReducer";
import {setProgressTodoListAC} from "../TodoLists/todoListsActions";
import {setIsErrorGettingDataAC, setIsFetchingDataAC} from "../App/appActions";

export const getTasksTC = (todoListID: string): ThunkType => async dispatch => {
   try {
      const data = await tasksApi.getTasks(todoListID, 10, 1)
      if (data) {
         dispatch(setAllTasksTodoListAC(todoListID, data.items))
         dispatch(setIsFetchingDataAC(false))
      }
   } catch (e) {
      
   }
}

export const addTaskTC = (title: string, todoList_ID: string, selectPriorityValue: FilterPriorityTask): ThunkType => async dispatch => {
   try {
      dispatch(setProgressTodoListAC(todoList_ID, "add-task"))
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
         dispatch(addTaskAC(title, todoList_ID, selectPriorityValue, data.data.item))
         const updateTask = await tasksApi.updateTask(todoList_ID, data.data.item.id, updateDomainTaskBody)
         if (data.resultCode === 0) {
            dispatch(updateTaskAC(todoList_ID, data.data.item.id, updateTask.data.item))
         }
      } else {
         dispatch(setIsErrorGettingDataAC(data.messages[0]))
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC("Some error"))
   } finally {
      dispatch(setProgressTodoListAC(todoList_ID, null))
   }
}

export const removeTaskTC = (todoList_ID: string, task_ID: string): ThunkType => async dispatch => {
   try {
      dispatch(setProgressTaskAC(todoList_ID, task_ID, "remove-task"))
      const data = await tasksApi.deleteTask(todoList_ID, task_ID)
      if (data.resultCode === 0) {
         dispatch(removeTaskAC(todoList_ID, task_ID))
         dispatch(setProgressTaskAC(todoList_ID, task_ID, null))
      }
   } catch (e) {
      dispatch(setIsErrorGettingDataAC("Some error"))
   }
}

export const updateTaskTC = (todoList_ID: string, task_ID: string, updateTaskBody: UpdateBodyTaskType): ThunkType => async (dispatch, getState: () => RootStateType) => {
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
         dispatch(updateTaskAC(todoList_ID, task.id, updateData.data.item))
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