import React, {useCallback, useState} from 'react';
import {Checkbox, CircularProgress, Grid, IconButton, ListItem} from "@material-ui/core";
import {TaskTitle} from "./TaskTittle/TaskTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import {FilterStatusTask, TaskType} from "../../../../../Redux/Tasks/tasksReducer";

export type TaskTodoListType = {
   todoList_ID: string
   task: TaskType
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeStatusTaskCallback: (todoList_ID: string, task_ID: string, checked: FilterStatusTask) => void
   changeTitleTaskCallback: (todoList_ID: string, task_ID: string, title: string) => void
}

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   grid_item: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
});

export const TaskTodoList: React.FC<TaskTodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const {
      todoList_ID,
      task,
      removeTaskCallback,
      changeStatusTaskCallback,
      changeTitleTaskCallback,
   } = props


   // ============================= USE STATE ==========================================================================
   const [isDisable, setIsDisable] = useState(true)

   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // =================================== CONSTANTS ====================================================================
   const opacityTask = task.status === FilterStatusTask.New ? "100%" : "40%"
   const opacityIconButton = isDisable ? "0%" : "100%"

   // =================================== HANDLERS =====================================================================
   const onClickRemoveTaskHandler = useCallback(() => {
      removeTaskCallback(todoList_ID, task.id)
      setIsDisable(false)
   }, [removeTaskCallback, todoList_ID, task.id])
   const onChangeCheckedTaskHandler = useCallback(() => {
      changeStatusTaskCallback(todoList_ID, task.id, task.status === FilterStatusTask.New ? FilterStatusTask.Completed : FilterStatusTask.New)
   }, [changeStatusTaskCallback, todoList_ID, task.id, task.status])
   const onMouseOverHandler = useCallback(() => setIsDisable(false), [setIsDisable])
   const onMouseOut = useCallback(() => setIsDisable(true), [setIsDisable])

   return (
      <Grid container className={classes.grid_container}>
         <Grid item className={classes.grid_item}>
            <ListItem button
                      divider
                      disabled={task.progress === "remove-task"}
                      onMouseOver={onMouseOverHandler}
                      onMouseOut={onMouseOut}
                      style={{
                         opacity: opacityTask,
                         padding: "2px",
                      }}>
               <Checkbox checked={task.status === FilterStatusTask.Completed}
                         onChange={onChangeCheckedTaskHandler}
                         inputProps={{'aria-label': 'controlled'}}/>
               <TaskTitle key={task.id}
                          task_ID={task.id}
                          todoList_ID={todoList_ID}
                          task_title={task.title}
                          task_priority={task.priority}
                          changeTitleTaskCallback={changeTitleTaskCallback}/>
               <IconButton aria-label="delete"
                           onClick={onClickRemoveTaskHandler}
                           size={"small"}
                           style={{
                              opacity: opacityIconButton,
                           }}>
                  {task.progress === "remove-task" ? <CircularProgress size={24}/>: <DeleteIcon/>}
               </IconButton>
            </ListItem>

         </Grid>


      </Grid>
   );
});