import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import {useActions} from "../../../../../Utils/useActions";
import {FilterPriorityTask} from "../../../../../Redux/Tasks/Enums";
import {tasksActions, todoListsActions} from "../../../../../Redux";
import {ProgressTodoListType} from "../../../../../Redux/TodoLists/Types";
import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import {
   Grid,
   Select,
   MenuItem,
   TextField,
   IconButton,
   InputLabel,
   FormControl,
   FormHelperText,
   CircularProgress
} from "@material-ui/core";

export const AddTaskTodoList: FC<AddTaskTodoListType> = memo((props) => {
   const {todoList_ID, selectPriorityValue, progressTodoList} = props

   const classes = useStyles();
   const {addTask} = useActions(tasksActions)
   const {setValueSelect} = useActions(todoListsActions)

   const [valueTask, setValueTask] = useState("")
   const [errorInput, setErrorInput] = useState(false)
   const [errorSelect, setErrorSelect] = useState(false)

   const onClickAddTaskHandler = useCallback(() => {
      if (!selectPriorityValue) {
         setErrorSelect(true)
      } else if (!valueTask.trim()) {
         setErrorInput(true)
      } else if (!errorInput && !errorSelect) {
         addTask({title: valueTask.trim(), todoList_ID, selectPriorityValue})
         setValueTask("")
         setValueSelect({todoList_ID, selectPriorityValue: FilterPriorityTask.null})
      }
   }, [selectPriorityValue, valueTask, errorInput, errorSelect, addTask, todoList_ID, setValueSelect])
   const changeValueSelectHandler = useCallback((e: ChangeEvent<{ value: unknown }>) => {
      setValueSelect({todoList_ID, selectPriorityValue: e.target.value as FilterPriorityTask})
      setErrorSelect(false)
   }, [setValueSelect, todoList_ID])
   const onChangeTextTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValueTask(e.currentTarget.value)
      setErrorInput(false)
   }, [setValueTask, setErrorInput])
   const onEnterHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
      e.key === "Enter" && onClickAddTaskHandler()
   }, [onClickAddTaskHandler])

   return (
      <Grid container className={classes.grid_container}>
         <TextField
            size={"small"}
            value={valueTask}
            error={errorInput}
            variant="outlined"
            id="outlined-basic"
            label="Add new task title"
            onKeyPress={onEnterHandler}
            className={classes.text_field}
            onChange={onChangeTextTaskHandler}
            disabled={progressTodoList === "add-task"}
            helperText={errorInput && "Incorrect entry"}
         />
         <FormControl variant="outlined" size={"small"}>
            <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
            {
               errorSelect &&
               <FormHelperText className={classes.form_helper_text}>
                 Enter priority
               </FormHelperText>
            }
            <Select
               label="Priority"
               error={errorSelect}
               className={classes.select}
               value={selectPriorityValue}
               id="demo-simple-select-outlined"
               onChange={changeValueSelectHandler}
               disabled={progressTodoList === "add-task"}
               labelId="demo-simple-select-outlined-label"
            >
               <MenuItem value={FilterPriorityTask.High}>High</MenuItem>
               <MenuItem value={FilterPriorityTask.Middle}>Middle</MenuItem>
               <MenuItem value={FilterPriorityTask.Low}>Low</MenuItem>
            </Select>
         </FormControl>
         <IconButton
            onClick={onClickAddTaskHandler}
            disabled={progressTodoList === "add-task"}
         >
            {
               progressTodoList === "add-task"
                  ? <CircularProgress size={24}/>
                  : <AddIcon/>
            }
         </IconButton>
      </Grid>
   )
})

export type AddTaskTodoListType = {
   todoList_ID: string
   progressTodoList: ProgressTodoListType
   selectPriorityValue: FilterPriorityTask | null
}

const useStyles = makeStyles({
   grid_container: {
      height: "45px",
      display: "flex",
      alignItems: "start",
      marginBottom: "7px",
      justifyContent: "space-between",
   },
   text_field: {
      marginRight: "10px",
   },
   select: {
      width: "100px",
   },
   form_helper_text: {
      color: "red",
   },
})
