import React, {useReducer, useState} from 'react';
import {TodoList} from "./Components/TodoList/TodoList";
import {v1} from "uuid";
import s from './App.module.css'
import {TaskType} from "./Components/TodoList/Task/Task";
import {
   addTaskAC,
   addTodoListAC,
   removeTaskAC,
   removeTodoListAC, setCheckedTaskAC, setFilterCheckedTodoListAC, setFilterPriorityTodoListAC,
   setValueInputAddTodoListAC,
   setValueSelectAC,
   todoListReducer
} from "./Components/TodoList/TodoListReducer/TodoListReducer";
import {FilterButtons} from "./Components/FilterButtons/FilterButtons";
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

export type TodoListsType = {
   todoList_ID: string
   title: string
   filterPriority: FilterPriorityTaskType
   filterChecked: FilterCheckedTaskType
   selectValue: FilterPriorityTaskType
}
export type TasksType = {
   [todoList_ID: string]: TaskType[]
}
export type FilterPriorityTaskType = "High" | "Middle" | "Low" | "All" | null
export type FilterCheckedTaskType = "All" | "Completed" | "Active"
export type TodoListStateType = {
   todoLists: TodoListsType[]
   tasks: TasksType
   valueInputAddTodoList: string
}

const App = () => {

   const todoList_ID_1 = v1()
   const todoList_ID_2 = v1()

   const initialState: TodoListStateType = {
      todoLists: [
         {todoList_ID: todoList_ID_1, title: "TodoList 1", filterPriority: "All", filterChecked: "All", selectValue: null},
         {todoList_ID: todoList_ID_2, title: "TodoList 2", filterPriority: "All", filterChecked: "All", selectValue: null}
      ],
      tasks: {
         [todoList_ID_1]: [
            {task_ID: "1", checked: false, task_title: "HTML", task_priority: "High"},
            {task_ID: "2", checked: false, task_title: "CSS", task_priority: "Middle"},
            {task_ID: "3", checked: false, task_title: "REACT", task_priority: "Low"}
         ],
         [todoList_ID_2]: [
            {task_ID: "1", checked: false, task_title: "HTML5", task_priority: "High"},
            {task_ID: "2", checked: false, task_title: "CSS3", task_priority: "Middle"},
            {task_ID: "3", checked: false, task_title: "REDUX", task_priority: "Low"}
         ]
      },
      valueInputAddTodoList: ""
   }

   const [state, dispatch] = useReducer(todoListReducer, initialState)
   const [error, setError] = useState<boolean>(false)
   //========================================= TODOLIST CALLBACKS =====================================================
   const addTodoListCallback = () => {
      if (!error && state.valueInputAddTodoList.length) {
         const newTodoList_ID = v1()
         dispatch(addTodoListAC(newTodoList_ID))
      }
   }
   const addTaskCallback = (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => {
      !error
      && value.length
      && dispatch(addTaskAC(value, todoList_ID, selectValue))
   }
   const removeTaskCallback = (todoList_ID: string, task_ID: string) => dispatch(removeTaskAC(todoList_ID, task_ID))
   const removeTodoListCallback = (todoList_ID: string) => dispatch(removeTodoListAC(todoList_ID))
   const changeTextNewTodoListCallback = (value: string) => dispatch(setValueInputAddTodoListAC(value))
   const changeFilterCheckedTodoList = (todoList_ID: string, filterChecked: FilterCheckedTaskType) => dispatch(setFilterCheckedTodoListAC(todoList_ID, filterChecked))
   const changeFilterPriorityTodoList = (todoList_ID: string, filterPriority: FilterPriorityTaskType) => dispatch(setFilterPriorityTodoListAC(todoList_ID, filterPriority))
   const changeValueSelectCallback = (todoList_ID: string, selectValue: FilterPriorityTaskType) => dispatch(setValueSelectAC(todoList_ID, selectValue))
   const changeCheckedTaskCallback = (todoList_ID: string, task_ID: string, checked: boolean) => dispatch(setCheckedTaskAC(todoList_ID, task_ID, checked))

   //========================================= FILTERED TASKS ========================================================
   const getFilteredPriorityTasks = (todoList_ID: string, filterPriority: FilterPriorityTaskType): TaskType[] => {
      switch (filterPriority) {
         case "High": return state.tasks[todoList_ID].filter(t => t.task_priority === "High")
         case "Middle": return state.tasks[todoList_ID].filter(t => t.task_priority === "Middle")
         case "Low": return state.tasks[todoList_ID].filter(t => t.task_priority === "Low")
         default: return state.tasks[todoList_ID]
      }
   }

   const getFilteredCheckedTasks = (todoList_ID: string, filterChecked: FilterCheckedTaskType, filterPriority: FilterPriorityTaskType): TaskType[] => {

      const filteredPriorityState = getFilteredPriorityTasks(todoList_ID, filterPriority)
      switch (filterChecked) {
         case "Active": return filteredPriorityState.filter(t => !t.checked)
         case "Completed": return filteredPriorityState.filter(t => t.checked)
         default: return filteredPriorityState
      }
   }

   return (
      <div className={s.todoLists}>
         {/*========================================= APP BAR =============================================*/}
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start"
                           color="inherit"
                           aria-label="menu">
                  <MenuIcon/>
               </IconButton>
               <Typography variant="h6">
                  TodoLists
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         <Container>
            <Grid container
                  style={{
                     margin: "20px 0",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center"}}>
               <Grid item>
                  <AddNewTodoList value={state.valueInputAddTodoList}
                                  addTodoListCallback={addTodoListCallback}
                                  changeTextNewTodoListCallback={changeTextNewTodoListCallback}/>
               </Grid>
            </Grid>
            <Grid container spacing={3}>
               {state.todoLists.map(tl => {
                  return (
                     <Grid item spacing={6} md={4} xs={3}>
                        <Paper elevation={7} style={{padding: "10px"}}>
                           <Grid item>
                           <TodoList key={tl.todoList_ID}
                                     todoList_ID={tl.todoList_ID}
                                     title={tl.title}
                                     selectValue={tl.selectValue}
                                     addTaskCallback={addTaskCallback}
                                     removeTaskCallback={removeTaskCallback}
                                     removeTodoListCallback={removeTodoListCallback}
                                     changeValueSelectCallback={changeValueSelectCallback}
                                     changeCheckedTaskCallback={changeCheckedTaskCallback}
                                     tasks={getFilteredCheckedTasks(tl.todoList_ID, tl.filterChecked, tl.filterPriority)}/>
                           </Grid>
                           {/* ============================ FILTER BUTTON BLOCK ===============================*/}
                           <Grid item style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                           <FilterButtons todoList_ID={tl.todoList_ID}
                                          filterChecked={tl.filterChecked}
                                          filterPriority={tl.filterPriority}
                                          changeFilterPriorityTodoList={changeFilterPriorityTodoList}
                                          changeFilterCheckedTodoList={changeFilterCheckedTodoList}/>
                           </Grid>
                        </Paper>
                     </Grid>
                  )
               })}
            </Grid>
         </Container>
      </div>
   );
};

export default App;