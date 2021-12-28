import React from 'react';
import {FilterType} from "../../App";
import {Button, ButtonGroup} from "@material-ui/core";

export type FilterButtonsType ={
   todoList_ID: string
   filter: FilterType
   changeFilterTodoList: (todoList_ID: string, filter: FilterType) => void
}
export const FilterButtons: React.FC<FilterButtonsType> = (
   {
      todoList_ID,
      filter,
      changeFilterTodoList
   }
) => {
   const setAllHandler = () => changeFilterTodoList(todoList_ID, "All")
   const setHighHandler = () => changeFilterTodoList(todoList_ID, "High")
   const setMiddleHandler = () => changeFilterTodoList(todoList_ID, "Middle")
   const setLowHandler = () => changeFilterTodoList(todoList_ID, "Low")

   return (
      <ButtonGroup fullWidth color={"primary"}>
         <Button onClick={setAllHandler} variant={filter === "All" ? "contained" : "outlined"}>All</Button>
         <Button onClick={setHighHandler} variant={filter === "High" ? "contained" : "outlined"}>High</Button>
         <Button onClick={setMiddleHandler} variant={filter === "Middle" ? "contained" : "outlined"}>Middle</Button>
         <Button onClick={setLowHandler} variant={filter === "Low" ? "contained" : "outlined"}>Low</Button>
      </ButtonGroup>
   );
};

