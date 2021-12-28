import React, {useReducer, useState} from 'react';
import {TodoList} from "./Components/TodoList/TodoList";
import {v1} from "uuid";
import s from './App.module.css'
import {TaskType} from "./Components/TodoList/Task/Task";
import {
   addTaskAC,
   addTodoListAC,
   removeTaskAC,
   removeTodoListAC, setCheckedTaskAC,
   setFilterTodoListAC,
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
   filter: FilterType
   selectValue: FilterType
}
export type TasksType = {
   [todoList_ID: string]: TaskType[]
}
export type FilterType = "High" | "Middle" | "Low" | "All" | null
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
         {todoList_ID: todoList_ID_1, title: "TodoList 1", filter: "All", selectValue: null},
         {todoList_ID: todoList_ID_2, title: "TodoList 2", filter: "All", selectValue: null},
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
   const addTaskCallback = (todoList_ID: string, value: string, selectValue: FilterType) => {
      !error
      && value.length
      && dispatch(addTaskAC(value, todoList_ID, selectValue))
   }
   const removeTaskCallback = (todoList_ID: string, task_ID: string) => dispatch(removeTaskAC(todoList_ID, task_ID))
   const removeTodoListCallback = (todoList_ID: string) => dispatch(removeTodoListAC(todoList_ID))
   const changeTextNewTodoListCallback = (value: string) => dispatch(setValueInputAddTodoListAC(value))
   const changeFilterTodoListCallback = (todoList_ID: string, filter: FilterType) => dispatch(setFilterTodoListAC(todoList_ID, filter))
   const changeValueSelectCallback = (todoList_ID: string, selectValue: FilterType) => dispatch(setValueSelectAC(todoList_ID, selectValue))
   const changeCheckedTaskCallback = (todoList_ID: string, task_ID: string, checked: boolean) => dispatch(setCheckedTaskAC(todoList_ID, task_ID, checked))

   //========================================= FILTERED TASKS ========================================================
   const setFilteredTasks = (todoList_ID: string, filter: FilterType): TaskType[] => {
      if (filter === "High") return state.tasks[todoList_ID].filter(t => t.task_priority === "High")
      else if (filter === "Middle") return state.tasks[todoList_ID].filter(t => t.task_priority === "Middle")
      else if (filter === "Low") return state.tasks[todoList_ID].filter(t => t.task_priority === "Low")
      else return state.tasks[todoList_ID]
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
                           <TodoList key={tl.todoList_ID}
                                     todoList_ID={tl.todoList_ID}
                                     title={tl.title}
                                     selectValue={tl.selectValue}
                                     addTaskCallback={addTaskCallback}
                                     removeTaskCallback={removeTaskCallback}
                                     removeTodoListCallback={removeTodoListCallback}
                                     changeValueSelectCallback={changeValueSelectCallback}
                                     changeCheckedTaskCallback={changeCheckedTaskCallback}
                                     tasks={setFilteredTasks(tl.todoList_ID, tl.filter)}/>
                           {/* ============================ FILTER BUTTON BLOCK ===============================*/}
                           <FilterButtons todoList_ID={tl.todoList_ID}
                                          filter={tl.filter}
                                          changeFilterTodoList={changeFilterTodoListCallback}/>
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