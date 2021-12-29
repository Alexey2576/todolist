import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {
   FormControl,
   FormHelperText,
   Grid,
   IconButton,
   InputLabel,
   MenuItem,
   Select,
   TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {FilterPriorityTaskType} from "../../../App";
import {makeStyles} from "@material-ui/core/styles";

export type AddTaskTodoListType = {
   todoList_ID: string
   selectValue: FilterPriorityTaskType
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterPriorityTaskType) => void
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => void
}

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      marginBottom: "7px",
      height: "45px"
   },
   select: {
      width: "100px"
   },
   form_helper_text: {
      color: "red"
   }
});

const AddTaskTodoList: React.FC<AddTaskTodoListType> = (
   {
      todoList_ID,
      changeValueSelectCallback,
      selectValue,
      addTaskCallback
   }
) => {
   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ============================= USE STATES =========================================================================
   const [valueTask, setValueTask] = useState("")
   const [errorSelect, setErrorSelect] = useState(false)
   const [errorInput, setErrorInput] = useState(false)

   // ============================= HANDLERS ===========================================================================
   const onClickAddTaskHandler = () => {
      if (!selectValue) {
         setErrorSelect(true)
      }
      else if (!valueTask.trim()) {
         setErrorInput(true)
      }
      else if (!errorInput && !errorSelect) {
         addTaskCallback(todoList_ID, valueTask.trim(), selectValue)
         setValueTask("")
         changeValueSelectCallback(todoList_ID, null)
      }
   }
   const changeValueSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
      changeValueSelectCallback(todoList_ID, e.target.value as FilterPriorityTaskType)
      setErrorSelect(false)
   }
   const onChangeTextTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValueTask(e.currentTarget.value)
      setErrorInput(false)
   }
   const onEnterHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      e.key === "Enter" && onClickAddTaskHandler()
   }

   return (
      <Grid container className={classes.grid_container}>
         <TextField id="outlined-basic"
                    label="Add new task title"
                    variant="outlined"
                    size={"small"}
                    value={valueTask}
                    error={errorInput}
                    helperText={errorInput && "Incorrect entry"}
                    onKeyPress={onEnterHandler}
                    onChange={onChangeTextTaskHandler}/>
         <FormControl variant="outlined" size={"small"}>
            <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
            <Select
               labelId="demo-simple-select-outlined-label"
               className={classes.select}
               id="demo-simple-select-outlined"
               value={selectValue}
               error={errorSelect}
               onChange={changeValueSelectHandler}
               label="Priority">
               <MenuItem value={"High"}>High</MenuItem>
               <MenuItem value={"Middle"}>Middle</MenuItem>
               <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
            {errorSelect && <FormHelperText className={classes.form_helper_text}>Enter priority</FormHelperText>}
         </FormControl>
         <IconButton onClick={onClickAddTaskHandler}>
            <AddIcon/>
         </IconButton>
      </Grid>
   );
}

export const MemoizedAddTaskTodoList = React.memo(AddTaskTodoList)