import {TaskTitle} from "./TaskTittle/TaskTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import {tasksActions} from "../../../../../../Redux";
import React, {FC, memo, useCallback, useState} from 'react';
import {TaskType} from "../../../../../../Redux/Tasks/Types";
import {useActions} from "../../../../../../Utils/useActions";
import {FilterStatusTask} from "../../../../../../Redux/Tasks/Enums";
import {Checkbox, CircularProgress, Grid, IconButton, ListItem} from "@material-ui/core";

export const TaskTodoList: FC<TaskTodoListType> = memo(({todoList_ID, task}) => {
   const classes = useStyles()
   const {removeTask, updateTask} = useActions(tasksActions)
   const [isDisable, setIsDisable] = useState(true)

   const opacityIconButton = isDisable ? "0%" : "100%"
   const opacityTask = task.status === FilterStatusTask.New ? "100%" : "40%"

   const onMouseOut = useCallback(() => setIsDisable(true), [setIsDisable])
   const onMouseOverHandler = useCallback(() => setIsDisable(false), [setIsDisable])
   const onClickRemoveTaskHandler = useCallback(() => {
      removeTask({todoList_ID, task_ID: task.id})
      setIsDisable(false)
   }, [removeTask, todoList_ID, task.id])
   const onChangeCheckedTaskHandler = useCallback(() => {
      updateTask({
         todoList_ID,
         task_ID: task.id,
         updateTaskBody: task.status === FilterStatusTask.New
            ? {status: FilterStatusTask.Completed}
            : {status: FilterStatusTask.New}
      })
   }, [updateTask, todoList_ID, task.id, task.status])

   return (
      <Grid container className={classes.grid_container}>
         <Grid item className={classes.grid_item}>
            <ListItem
               button
               divider
               onMouseOut={onMouseOut}
               onMouseOver={onMouseOverHandler}
               disabled={task.progress === "remove-task"}
               style={{
                  padding: "2px",
                  opacity: opacityTask,
               }}
            >
               <Checkbox
                  onChange={onChangeCheckedTaskHandler}
                  inputProps={{'aria-label': 'controlled'}}
                  checked={task.status === FilterStatusTask.Completed}
               />
               <TaskTitle
                  key={task.id}
                  task_ID={task.id}
                  task_title={task.title}
                  todoList_ID={todoList_ID}
                  task_priority={task.priority}
               />
               <IconButton
                  size={"small"}
                  aria-label="delete"
                  onClick={onClickRemoveTaskHandler}
                  style={{
                     opacity: opacityIconButton,
                  }}
               >
                  {
                     task.progress === "remove-task"
                        ? <CircularProgress size={24}/>
                        : <DeleteIcon/>
                  }
               </IconButton>
            </ListItem>
         </Grid>
      </Grid>
   )
})

export type TaskTodoListType = {
   task: TaskType
   todoList_ID: string
}

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
   grid_item: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
})