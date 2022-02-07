import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
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
import {makeStyles} from "@material-ui/core/styles";
import {FilterPriorityTask} from "../../../../Reducers/TasksReducer/tasksReducer";

export type AddTaskTodoListType = {
   todoList_ID: string
   selectPriorityValue: FilterPriorityTask | null
   changeValueSelectCallback: (todoList_ID: string, selectPriorityValue: FilterPriorityTask) => void
   addTaskCallback: (todoList_ID: string, value: string, selectPriorityValue: FilterPriorityTask) => void
}

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      marginBottom: "7px",
      height: "45px",
   },
   select: {
      width: "100px",
   },
   form_helper_text: {
      color: "red",
   },
});

export const AddTaskTodoList: React.FC<AddTaskTodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const { todoList_ID, changeValueSelectCallback, selectPriorityValue, addTaskCallback, } = props

   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ============================= USE STATES =========================================================================
   const [valueTask, setValueTask] = useState("")
   const [errorSelect, setErrorSelect] = useState(false)
   const [errorInput, setErrorInput] = useState(false)

   // ============================= HANDLERS ===========================================================================
   const onClickAddTaskHandler = useCallback(() => {
      if (!selectPriorityValue) {
         setErrorSelect(true)
      }
      else if (!valueTask.trim()) {
         setErrorInput(true)
      }
      else if (!errorInput && !errorSelect) {
         addTaskCallback(todoList_ID, valueTask.trim(), selectPriorityValue)
         setValueTask("")
         changeValueSelectCallback(todoList_ID, FilterPriorityTask.null)
      }
   }, [setErrorSelect, setErrorInput, addTaskCallback, setValueTask, changeValueSelectCallback, todoList_ID, errorInput, errorSelect, selectPriorityValue, valueTask])
   const changeValueSelectHandler = useCallback((e: ChangeEvent<{ value: unknown }>) => {
      changeValueSelectCallback(todoList_ID, e.target.value as FilterPriorityTask)
      setErrorSelect(false)
   }, [changeValueSelectCallback, setErrorSelect, todoList_ID])
   const onChangeTextTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValueTask(e.currentTarget.value)
      setErrorInput(false)
   }, [setValueTask, setErrorInput])
   const onEnterHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
      e.key === "Enter" && onClickAddTaskHandler()
   }, [onClickAddTaskHandler])

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
               value={selectPriorityValue}
               error={errorSelect}
               onChange={changeValueSelectHandler}
               label="Priority">
               <MenuItem value={FilterPriorityTask.High}>High</MenuItem>
               <MenuItem value={FilterPriorityTask.Middle}>Middle</MenuItem>
               <MenuItem value={FilterPriorityTask.Low}>Low</MenuItem>
            </Select>
            {errorSelect && <FormHelperText className={classes.form_helper_text}>Enter priority</FormHelperText>}
         </FormControl>
         <IconButton onClick={onClickAddTaskHandler}>
            <AddIcon/>
         </IconButton>
      </Grid>
   );
})