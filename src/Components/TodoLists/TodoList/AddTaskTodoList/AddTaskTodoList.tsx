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
import {FilterPriorityTaskType} from "../../../../App";

export type AddTaskTodoListType = {
   todoList_ID: string
   selectValue: FilterPriorityTaskType
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterPriorityTaskType) => void
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => void
}

export const AddTaskTodoList: React.FC<AddTaskTodoListType> = (
   {
      todoList_ID,
      changeValueSelectCallback,
      selectValue,
      addTaskCallback
   }
) => {
   const [valueTask, setValueTask] = useState<string>("")

   const [errorSelect, setErrorSelect] = useState<boolean>(false)
   const [errorInput, setErrorInput] = useState<boolean>(false)

   const onClickAddTaskHandler = () => {
      if (!selectValue) setErrorSelect(true)
      else if (!valueTask.trim()) setErrorInput(true)
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
      e.key === "Enter"
      && onClickAddTaskHandler()
   }

   return (
      <Grid container
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "start",
               marginBottom: "7px",
               height: "45px"
            }}>
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
               style={{width: "100px"}}
               id="demo-simple-select-outlined"
               value={selectValue}
               error={errorSelect}
               onChange={changeValueSelectHandler}
               label="Priority">
               <MenuItem value={"High"}>High</MenuItem>
               <MenuItem value={"Middle"}>Middle</MenuItem>
               <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
            {errorSelect && <FormHelperText style={{color: "red"}}>Enter priority</FormHelperText>}
         </FormControl>
         <IconButton onClick={onClickAddTaskHandler}>
            <AddIcon/>
         </IconButton>
      </Grid>
   );
}