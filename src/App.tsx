import React, {useReducer} from 'react';
import {TodoList} from "./Components/TodoList/TodoList";
import {v1} from "uuid";
import s from './App.module.css'
import {TaskType} from "./Components/TodoList/Task/Task";
import {
   addTaskAC,
   addTodoListAC,
   removeTaskAC,
   removeTodoListAC,
   setFilterTodoListAC,
   setValueInputAddTodoListAC, setValueSelectAC,
   todoListReducer
} from "./Components/TodoList/TodoListReducer/TodoListReducer";
import {FilterButtons} from "./Components/FilterButtons/FilterButtons";
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";

export type TodoListsType = {
   todoList_ID: string
   title: string
   filter: FilterType
   selectValue: FilterType
}
export type TasksType = {
   [todoList_ID: string]: TaskType[]
}
export type FilterType = "High" | "Middle" | "Low" | "All"
export type TodoListStateType = {
   todoLists: TodoListsType[]
   tasks: TasksType
   valueInputAddTodoList: string
   error: string
}

const App = () => {

   const todoList_ID_1 = v1()
   const todoList_ID_2 = v1()

   //========================================== INITIAL STATES ========================================================
   const initialTodoListState: TodoListStateType = {
      todoLists: [
         {todoList_ID: todoList_ID_1, title: "TodoList 1", filter: "All", selectValue: "High"},
         {todoList_ID: todoList_ID_2, title: "TodoList 2", filter: "All", selectValue: "High",},
      ],
      tasks: {
         [todoList_ID_1]: [
            {task_ID: "1", task_title: "HTML", task_priority: "High"},
            {task_ID: "2", task_title: "CSS", task_priority: "Middle"},
            {task_ID: "3", task_title: "REACT", task_priority: "Low"}
         ],
         [todoList_ID_2]: [
            {task_ID: "1", task_title: "HTML5", task_priority: "High"},
            {task_ID: "2", task_title: "CSS3", task_priority: "Middle"},
            {task_ID: "3", task_title: "REDUX", task_priority: "Low"}
         ]
      },
      valueInputAddTodoList: "",
      error: ""
   }

   //==================================== TODOLIST AND SELECT REDUCERS=================================================
   const [stateTodoList, dispatchTodoList] = useReducer(todoListReducer, initialTodoListState)

   //========================================= TODOLIST CALLBACKS =====================================================
   const addTodoListCallback = () => {
      if (stateTodoList.error === "" && stateTodoList.valueInputAddTodoList.length) {
         const newTodoList_ID = v1()
         addTodoListAC(dispatchTodoList, newTodoList_ID)
      }
   }
   const addTaskCallback = (todoList_ID: string, value: string, selectValue: FilterType) => {
      stateTodoList.error === "" && value.length
      && addTaskAC(dispatchTodoList, value, todoList_ID, selectValue)
   }
   const removeTaskCallback = (todoList_ID: string, task_ID: string) => removeTaskAC(dispatchTodoList, todoList_ID, task_ID)
   const removeTodoListCallback = (todoList_ID: string) => removeTodoListAC(dispatchTodoList, todoList_ID)
   const changeTextNewTodoListCallback = (value: string) => setValueInputAddTodoListAC(dispatchTodoList, value)
   const changeFilterTodoListCallback = (todoList_ID: string, filter: FilterType) => setFilterTodoListAC(dispatchTodoList, todoList_ID, filter)
   const changeValueSelectCallback = (todoList_ID: string, selectValue: FilterType) => setValueSelectAC(dispatchTodoList, todoList_ID, selectValue)

   //========================================= FILTERED TASKS ========================================================
   const setFilteredTasks = (todoList_ID: string, filter: FilterType): TaskType[] => {
      if (filter === "High") return stateTodoList.tasks[todoList_ID].filter(t => t.task_priority === "High")
      else if (filter === "Middle") return stateTodoList.tasks[todoList_ID].filter(t => t.task_priority === "Middle")
      else if (filter === "Low") return stateTodoList.tasks[todoList_ID].filter(t => t.task_priority === "Low")
      else return stateTodoList.tasks[todoList_ID]
   }

   return (
      <div className={s.todoLists}>
         <AddNewTodoList value={stateTodoList.valueInputAddTodoList}
                         addTodoListCallback={addTodoListCallback}
                         changeTextNewTodoListCallback={changeTextNewTodoListCallback}/>

         { stateTodoList.todoLists.map(tl => {
            return (
               <div className={s.todoList}>
                  <TodoList key={tl.todoList_ID}
                            todoList_ID={tl.todoList_ID}
                            title={tl.title}
                            selectValue={tl.selectValue}
                            addTaskCallback={addTaskCallback}
                            removeTaskCallback={removeTaskCallback}
                            removeTodoListCallback={removeTodoListCallback}
                            changeValueSelectCallback={changeValueSelectCallback}
                            tasks={setFilteredTasks(tl.todoList_ID, tl.filter)}
                  />

                  {/* ============================ FILTER BUTTON BLOCK ===============================*/}
                  <FilterButtons todoList_ID={tl.todoList_ID}
                                 changeFilterTodoList={changeFilterTodoListCallback}/>
               </div>
            )
         })}
      </div>
   );
};

export default App;