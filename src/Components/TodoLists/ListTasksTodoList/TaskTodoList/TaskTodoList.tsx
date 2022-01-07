import React, {useState} from 'react';
import {Checkbox, Grid, IconButton, ListItem} from "@material-ui/core";
import {TaskTitle} from "./TaskTittle/TaskTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import {FilterPriorityTaskType} from "../../../../App";
import {makeStyles} from "@material-ui/core/styles";

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

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
   },
   grid_item: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
   }
});

const TaskTodoList: React.FC<TaskTodoListType> = (
   {
      todoList_ID,
      task,

      removeTaskCallback,
      changeCheckedTaskCallback
   }
) => {
   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   const [isDisable, setIsDisable] = useState(true)

   // =================================== HANDLERS =====================================================================
   const onClickRemoveTaskHandler = () => removeTaskCallback(todoList_ID, task.task_ID)
   const onChangeCheckedTaskHandler = () => changeCheckedTaskCallback(todoList_ID, task.task_ID, !task.checked)

   const opacityTask = !task.checked ? "100%" : "40%"
   const opacityIconButton = isDisable ? "0%" : "100%"

   return (
      <Grid container className={classes.grid_container}>
         <Grid item className={classes.grid_item} >
            <ListItem button
                      divider
                      onMouseOver={() => setIsDisable(false)}
                      onMouseOut={() => setIsDisable(true)}
                      style={{
                         opacity: opacityTask,
                         padding: "2px"
                      }}>
               <Checkbox
                  checked={task.checked}
                  onChange={onChangeCheckedTaskHandler}
                  inputProps={{'aria-label': 'controlled'}}/>
               <TaskTitle key={task.task_ID}
                          task_title={task.task_title}
                          task_priority={task.task_priority}/>
               <IconButton aria-label="delete"
                           style={{
                              opacity: opacityIconButton
                           }}
                           onClick={onClickRemoveTaskHandler}
                           size={"small"}>
                  <DeleteIcon/>
               </IconButton>
            </ListItem>
         </Grid>
      </Grid>
   );
};

export const MemoizedTaskTodoList = React.memo(TaskTodoList)