import React, {useReducer, useState} from 'react';
import {TodoList} from "./Components/TodoList/TodoList";
import {v1} from "uuid";
import s from './App.module.css'
import {TaskType} from "./Components/Task/Task";
import InputText from "./Components/Input/InputText";
import Button from "./Components/Button/Button";
import {SelectStateType} from "./Components/Select/Select";
import {
   selectReducer,
   setHoveredItemAC,
   setNewSelectAC,
   setSelectItemAC,
   setVisibleAC
} from "./Components/Select/SelectReducer";

export type TodoListsType = {
   todoList_ID: string
   title: string
   filter: FilterType
}
export type TasksType = {
   [todoList_ID: string]: TaskType[]
}
export type FilterType = "High" | "Middle" | "Low" | "All"

const App = () => {
   const todoList_ID_1 = v1()
   const todoList_ID_2 = v1()

   const [todoLists, setTodoLists] = useState<TodoListsType[]>([
      {todoList_ID: todoList_ID_1, title: "TodoList 1", filter: "All"},
      {todoList_ID: todoList_ID_2, title: "TodoList 2", filter: "All"},
   ])
   const [tasks, setTasks] = useState<TasksType>({
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
   })

   const initialState: SelectStateType = {
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
   const [stateSelect, dispatch] = useReducer(selectReducer, initialState)

   const [value, setValue] = useState<string>("")
   const [error, setError] = useState<string>("")

   const onClickAddTodoList = () => {
      if (error === "" && value.length) {
         const newTodoList: TodoListsType = {todoList_ID: v1(), title: value, filter: "All"}
         setTodoLists([...todoLists, newTodoList])
         setTasks({...tasks, [newTodoList.todoList_ID]: []})
         setNewSelectAC(dispatch, newTodoList.todoList_ID)
         setValue("")
      }
   }
   const addTaskCallback = (todoList_ID: string, value: string) => {
      if (error === "" && value.length) {
         const newTask: TaskType = {
            task_ID: v1(),
            task_title: value,
            task_priority: stateSelect[todoList_ID].selectItem
         }
         setTasks({...tasks, [todoList_ID]: [...tasks[todoList_ID], newTask]})
      }
   }
   const removeTaskCallback = (todoList_ID: string, task_ID: string) => {
      tasks[todoList_ID] = tasks[todoList_ID].filter(t => t.task_ID !== task_ID)
      setTasks({...tasks})
   }
   const removeTodoListCallback = (todoList_ID: string) => {
      const newTodoLists = todoLists.filter(tl => tl.todoList_ID !== todoList_ID)
      setTodoLists(newTodoLists)
      delete tasks[todoList_ID]
      setTasks({...tasks})
   }
   const onChangeTextNewTodoList = (value: string) => setValue(value)
   const onEnter = () => setValue(value)
   const filterTasks = (todoList_ID: string, filter: FilterType): TaskType[] => {
      if (filter === "High") return tasks[todoList_ID].filter(t => t.task_priority === "High")
      else if (filter === "Middle") return tasks[todoList_ID].filter(t => t.task_priority === "Middle")
      else if (filter === "Low") return tasks[todoList_ID].filter(t => t.task_priority === "Low")
      else return tasks[todoList_ID]
   }
   const changeFilterTodoList = (todoList_ID: string, filter: FilterType) => setTodoLists(
      todoLists.map(tl => tl.todoList_ID === todoList_ID ? {
         ...tl,
         filter: filter
      } : tl)
   )

   return (
      <div className={s.todoLists}>
         <div className={s.add_todoList}>
            <InputText value={value}
                       onChangeText={onChangeTextNewTodoList}
                       onEnter={onEnter}
                       className={s.add_todoList_input}
            />
            <Button onClick={onClickAddTodoList} className={s.add_todoList_button}>Add</Button>
         </div>
         {todoLists.map(tl => {

            const setAllHandler = () => changeFilterTodoList(tl.todoList_ID, "All")
            const setHighHandler = () => changeFilterTodoList(tl.todoList_ID, "High")
            const setMiddleHandler = () => changeFilterTodoList(tl.todoList_ID, "Middle")
            const setLowHandler = () => changeFilterTodoList(tl.todoList_ID, "Low")

            const onClickSelectedItem = () => setVisibleAC(dispatch, tl.todoList_ID, stateSelect[tl.todoList_ID].visible)
            const setSelectItemCallback = (title: FilterType) => {
               setSelectItemAC(dispatch, title, tl.todoList_ID)
               setVisibleAC(dispatch, tl.todoList_ID, stateSelect[tl.todoList_ID].visible)
            }
            const onBlurSelectBlockItems = () => {
               setSelectItemAC(dispatch, stateSelect[tl.todoList_ID].hoveredItem, tl.todoList_ID)
               setVisibleAC(dispatch, tl.todoList_ID, stateSelect[tl.todoList_ID].visible)
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
                           dispatch,
                           stateSelect[tl.todoList_ID].list[nextIdIndex].title, tl.todoList_ID
                        )
                        setSelectItemAC(
                           dispatch,
                           stateSelect[tl.todoList_ID].list[nextIdIndex].title, tl.todoList_ID
                        )
                     }
                  }
                  if (key === "ArrowUp") {
                     if (prevIdIndex >= 0) {
                        setHoveredItemAC(
                           dispatch, stateSelect[tl.todoList_ID].list[prevIdIndex].title, tl.todoList_ID
                        )
                        setSelectItemAC(
                           dispatch, stateSelect[tl.todoList_ID].list[prevIdIndex].title, tl.todoList_ID
                        )
                     }
                  }
               }
            }
            const setHoveredItem = (title: FilterType) => setHoveredItemAC(dispatch, title, tl.todoList_ID)

            return (
               <div className={s.todoList}>
                  <TodoList key={tl.todoList_ID}
                            todoList_ID={tl.todoList_ID}
                            title={tl.title}
                            addTaskCallback={addTaskCallback}
                            removeTaskCallback={removeTaskCallback}
                            removeTodoListCallback={removeTodoListCallback}
                            tasks={filterTasks(tl.todoList_ID, tl.filter)}

                            onClickSelectedItem={onClickSelectedItem}
                            onBlurSelectBlockItems={onBlurSelectBlockItems}
                            setNextValueCallBack={setNextValueCallBack}
                            stateSelect={stateSelect}
                            setSelectItemCallback={setSelectItemCallback}
                            setHoveredItem={setHoveredItem}
                  />
                  <div className={s.filter_button_block}>
                     <Button onClick={setAllHandler} className={s.filter_button}>All</Button>
                     <Button onClick={setHighHandler} className={s.filter_button}>High</Button>
                     <Button onClick={setMiddleHandler} className={s.filter_button}>Middle</Button>
                     <Button onClick={setLowHandler} className={s.filter_button}>Low</Button>
                  </div>
               </div>
            )
         })}
      </div>
   );
};

export default App;