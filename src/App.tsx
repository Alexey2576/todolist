import React, {useReducer} from 'react';
import {TodoList} from "./Components/TodoList/TodoList";
import {v1} from "uuid";
import s from './App.module.css'
import {TaskType} from "./Components/TodoList/Task/Task";
import {SelectStateType} from "./Components/Select/MySelect";
import {
   selectReducer,
   setHoveredItemAC,
   setNewSelectAC,
   setSelectItemAC,
   setVisibleAC
} from "./Components/Select/SelectBlockItems/SelectReducer/SelectReducer";
import {
   addTaskAC,
   addTodoListAC,
   removeTaskAC,
   removeTodoListAC,
   setFilterTodoListAC,
   setValueInputAddTodoListAC,
   todoListReducer
} from "./Components/TodoList/TodoListReducer/TodoListReducer";
import {FilterButtons} from "./Components/FilterButtons/FilterButtons";
import {AddNewTodoList} from "./Components/AddNewTodoList/AddNewTodoList";

export type TodoListsType = {
   todoList_ID: string
   title: string
   filter: FilterType
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
         {todoList_ID: todoList_ID_1, title: "TodoList 1", filter: "All"},
         {todoList_ID: todoList_ID_2, title: "TodoList 2", filter: "All"},
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
   const initialSelectState: SelectStateType = {
      [todoList_ID_1]: {
         list: [
            {id: 0, title: "High"},
            {id: 1, title: "Middle"},
            {id: 2, title: "Low"},
         ],
         selectItem: "High",
         hoveredItem: "High",
         visible: true
      },
      [todoList_ID_2]: {
         list: [
            {id: 0, title: "High"},
            {id: 1, title: "Middle"},
            {id: 2, title: "Low"},
         ],
         selectItem: "High",
         hoveredItem: "High",
         visible: true
      }
   }

   //==================================== TODOLIST AND SELECT REDUCERS=================================================
   const [stateTodoList, dispatchTodoList] = useReducer(todoListReducer, initialTodoListState)
   const [stateSelect, dispatchSelect] = useReducer(selectReducer, initialSelectState)

   //========================================= TODOLIST CALLBACKS =====================================================
   const addTodoListCallback = () => {
      if (stateTodoList.error === "" && stateTodoList.valueInputAddTodoList.length) {
         const newTodoList_ID = v1()
         addTodoListAC(dispatchTodoList, newTodoList_ID)
         setNewSelectAC(dispatchSelect, newTodoList_ID)
      }
   }
   const addTaskCallback = (todoList_ID: string, value: string) => {
      stateTodoList.error === "" && value.length
      && addTaskAC(dispatchTodoList, value, todoList_ID, stateSelect[todoList_ID].selectItem)
   }
   const removeTaskCallback = (todoList_ID: string, task_ID: string) => removeTaskAC(dispatchTodoList, todoList_ID, task_ID)
   const removeTodoListCallback = (todoList_ID: string) => removeTodoListAC(dispatchTodoList, todoList_ID)
   const changeTextNewTodoListCallback = (value: string) => setValueInputAddTodoListAC(dispatchTodoList, value)
   const changeFilterTodoListCallback = (todoList_ID: string, filter: FilterType) => setFilterTodoListAC(dispatchTodoList, todoList_ID, filter)

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

            //========================================= SELECT CALLBACKS ==============================================
            const onClickSelectedItem = () => setVisibleAC(dispatchSelect, tl.todoList_ID, stateSelect[tl.todoList_ID].visible)
            const setSelectItemCallback = (title: FilterType) => {
               setSelectItemAC(dispatchSelect, title, tl.todoList_ID)
               setVisibleAC(dispatchSelect, tl.todoList_ID, stateSelect[tl.todoList_ID].visible)
            }
            const onBlurSelectBlockItems = () => {
               setSelectItemAC(dispatchSelect, stateSelect[tl.todoList_ID].hoveredItem, tl.todoList_ID)
               setVisibleAC(dispatchSelect, tl.todoList_ID, stateSelect[tl.todoList_ID].visible)
            }
            const setNextValueCallBack = (key: string) => {
               const item = stateSelect[tl.todoList_ID].list.find(
                  l => l.title === stateSelect[tl.todoList_ID].hoveredItem
               )
               if (item) {
                  const nextIdIndex = stateSelect[tl.todoList_ID].list.indexOf(item) + 1
                  const prevIdIndex = stateSelect[tl.todoList_ID].list.indexOf(item) - 1
                  if (key === "ArrowDown") {
                     if (nextIdIndex < stateSelect[tl.todoList_ID].list.length) {
                        setHoveredItemAC(
                           dispatchSelect,
                           stateSelect[tl.todoList_ID].list[nextIdIndex].title, tl.todoList_ID
                        )
                        setSelectItemAC(
                           dispatchSelect,
                           stateSelect[tl.todoList_ID].list[nextIdIndex].title, tl.todoList_ID
                        )
                     }
                  }
                  if (key === "ArrowUp") {
                     if (prevIdIndex >= 0) {
                        setHoveredItemAC(
                           dispatchSelect, stateSelect[tl.todoList_ID].list[prevIdIndex].title, tl.todoList_ID
                        )
                        setSelectItemAC(
                           dispatchSelect, stateSelect[tl.todoList_ID].list[prevIdIndex].title, tl.todoList_ID
                        )
                     }
                  }
               }
            }
            const setHoveredItem = (title: FilterType) => setHoveredItemAC(dispatchSelect, title, tl.todoList_ID)

            return (
               <div className={s.todoList}>
                  <TodoList key={tl.todoList_ID}
                            todoList_ID={tl.todoList_ID}
                            title={tl.title}
                            addTaskCallback={addTaskCallback}
                            removeTaskCallback={removeTaskCallback}
                            removeTodoListCallback={removeTodoListCallback}
                            tasks={setFilteredTasks(tl.todoList_ID, tl.filter)}

                            onClickSelectedItem={onClickSelectedItem}
                            onBlurSelectBlockItems={onBlurSelectBlockItems}
                            setNextValueCallBack={setNextValueCallBack}
                            stateSelect={stateSelect}
                            setSelectItemCallback={setSelectItemCallback}
                            setHoveredItem={setHoveredItem}
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