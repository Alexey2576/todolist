import React from 'react';
import s from "../../App.module.css";
import MyButton from "../MyComponents/MyButton/MyButton";
import {FilterType} from "../../App";
export type FilterButtonsType ={
   todoList_ID: string
   changeFilterTodoList: (todoList_ID: string, filter: FilterType) => void
}
export const FilterButtons: React.FC<FilterButtonsType> = (
   {
      todoList_ID,
      changeFilterTodoList
   }
) => {

   const setAllHandler = () => changeFilterTodoList(todoList_ID, "All")
   const setHighHandler = () => changeFilterTodoList(todoList_ID, "High")
   const setMiddleHandler = () => changeFilterTodoList(todoList_ID, "Middle")
   const setLowHandler = () => changeFilterTodoList(todoList_ID, "Low")

   return (
      <div className={s.filter_button_block}>
         <MyButton onClick={setAllHandler} className={s.filter_button}>All</MyButton>
         <MyButton onClick={setHighHandler} className={s.filter_button}>High</MyButton>
         <MyButton onClick={setMiddleHandler} className={s.filter_button}>Middle</MyButton>
         <MyButton onClick={setLowHandler} className={s.filter_button}>Low</MyButton>
      </div>
   );
};

