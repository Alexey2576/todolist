import React from 'react';
import {Checkbox, Grid, IconButton} from "@material-ui/core";
import {TaskTitle} from "./TaskTittle/TaskTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import {FilterPriorityTaskType} from "../../../../App";

export type TaskType = {
   task_ID: string,
   checked: boolean
   task_title: string
   task_priority: FilterPriorityTaskType
}
export type TaskTodoListType = {
   todoList_ID: string
   task: TaskType
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}

export const TaskTodoList: React.FC<TaskTodoListType> = (
   {
      todoList_ID,
      task,
      removeTaskCallback,
      changeCheckedTaskCallback
   }
) => {
   const onClickRemoveTaskHandler = () => removeTaskCallback(todoList_ID, task.task_ID)
   const onChangeCheckedTaskHandler = () => changeCheckedTaskCallback(todoList_ID, task.task_ID, !task.checked)

   return (
         <Grid container
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
               }}>
            <Grid item style={{
               width: "100%",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center"
            }}>
               <Checkbox
                  checked={task.checked}
                  onChange={onChangeCheckedTaskHandler}
                  inputProps={{'aria-label': 'controlled'}}/>
               <TaskTitle key={task.task_ID}
                          checked={task.checked}
                          task_title={task.task_title}
                          task_priority={task.task_priority}/>

               <IconButton aria-label="delete" onClick={onClickRemoveTaskHandler}>
                  <DeleteIcon/>
               </IconButton>
            </Grid>
         </Grid>
   );
};