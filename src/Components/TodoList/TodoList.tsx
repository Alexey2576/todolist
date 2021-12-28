import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Task, TaskType} from "./Task/Task";
import {EditableSpan} from "../MyComponents/MyEditableSpan/MyEditableSpan";
import {FilterType} from "../../App";
import {
   Checkbox,
   FormControl, FormHelperText,
   Grid,
   IconButton,
   InputLabel,
   List, ListItem,
   MenuItem,
   Select,
   TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import AddIcon from '@material-ui/icons/Add';

export type TodoListType = {
   todoList_ID: string
   title: string
   selectValue: FilterType
   tasks: TaskType[]
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterType) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterType) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}

export const TodoList: React.FC<TodoListType> = (
   {
      todoList_ID,
      title,
      selectValue,
      tasks,
      addTaskCallback,
      removeTaskCallback,
      removeTodoListCallback,
      changeValueSelectCallback,
      changeCheckedTaskCallback
   }
) => {

   const [valueTitle, setValueTitle] = useState<string>(title)
   const [valueTask, setValueTask] = useState<string>("")

   const [errorSelect, setErrorSelect] = useState<boolean>(false)
   const [errorInput, setErrorInput] = useState<boolean>(false)

   const onChangeTextTitle = (value: string) => setValueTitle(value)
   const onClickAddTask = () => {
      if (!selectValue) setErrorSelect(true)
      else if (!valueTask.trim()) setErrorInput(true)
      else if (!errorInput && !errorSelect) {
         addTaskCallback(todoList_ID, valueTask.trim(), selectValue)
         setValueTask("")
         changeValueSelectCallback(todoList_ID, null)
      }
   }
   const onClickRemoveTodoList = () => removeTodoListCallback(todoList_ID)
   const changeValueSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
      changeValueSelectCallback(todoList_ID, e.target.value as FilterType)
      setErrorSelect(false)
   }
   const onChangeTextTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValueTask(e.currentTarget.value)
      setErrorInput(false)
   }
   const onEnterHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      e.key === "Enter"
      && onClickAddTask()
   }

   return (
      <>
         <Grid container
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px"
               }}>
            <EditableSpan value={valueTitle} variant={"h5"}
                          onChangeTextTitle={onChangeTextTitle}/>
            <IconButton size="small" onClick={onClickRemoveTodoList}>
               <ClearAllIcon/>
            </IconButton>
         </Grid>

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
            <IconButton onClick={onClickAddTask}>
               <AddIcon/>
            </IconButton>
         </Grid>

         <List component="nav" aria-label="mailbox folders">
            {tasks.map(t => {

               const onClickRemoveTask = () => removeTaskCallback(todoList_ID, t.task_ID)
               const onChangeCheckedTask = () => changeCheckedTaskCallback(todoList_ID, t.task_ID, !t.checked)
               const opacityTask = !t.checked ? "100%" : "40%"

               return (
                  <Grid container
                        style={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center"}}>
                     <Grid item style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"}}>
                        <Checkbox
                           checked={t.checked}
                           onChange={onChangeCheckedTask}
                           inputProps={{'aria-label': 'controlled'}}/>
                        <ListItem button divider
                                  style={{
                                     display: "flex",
                                     justifyContent: "space-between",
                                     opacity: opacityTask}}>
                           <Task key={t.task_ID}
                                 task_ID={t.task_ID}
                                 checked={t.checked}
                                 task_title={t.task_title}
                                 task_priority={t.task_priority}/>
                        </ListItem>
                        <IconButton aria-label="delete" onClick={onClickRemoveTask}>
                           <DeleteIcon/>
                        </IconButton>
                     </Grid>
                  </Grid>
               )
            })}
         </List>
      </>
   )
}