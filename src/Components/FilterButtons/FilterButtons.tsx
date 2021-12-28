import React from 'react';
import {FilterCheckedTaskType, FilterPriorityTaskType} from "../../App";
import {Button, ButtonGroup, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

export type FilterButtonsType ={
   todoList_ID: string
   filterPriority: FilterPriorityTaskType
   filterChecked: FilterCheckedTaskType
   changeFilterCheckedTodoList: (todoList_ID: string, filterChecked: FilterCheckedTaskType) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTaskType) => void
}
export const FilterButtons: React.FC<FilterButtonsType> = (
   {
      todoList_ID,
      filterPriority,
      filterChecked,
      changeFilterCheckedTodoList,
      changeFilterPriorityTodoList
   }
) => {
   const setAllHandler = () => changeFilterCheckedTodoList(todoList_ID, "All")
   const setActiveHandler = () => changeFilterCheckedTodoList(todoList_ID, "Active")
   const setCompletedHandler = () => changeFilterCheckedTodoList(todoList_ID, "Completed")

   // Menu
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

   const handleCloseAll = () => {
      changeFilterPriorityTodoList(todoList_ID, "All")
      setAnchorEl(null);
   };
   const handleCloseHigh = () => {
      changeFilterPriorityTodoList(todoList_ID, "High")
      setAnchorEl(null);
   };
   const handleCloseMiddle = () => {
      changeFilterPriorityTodoList(todoList_ID, "Middle")
      setAnchorEl(null);
   };
   const handleCloseLow = () => {
      changeFilterPriorityTodoList(todoList_ID, "Low")
      setAnchorEl(null);
   };
   const handleClose = () => setAnchorEl(null)


   return (
      <>
         <ButtonGroup fullWidth color={"primary"}>
            <Button onClick={setAllHandler} variant={filterChecked === "All" ? "contained" : "outlined"}>All</Button>
            <Button onClick={setActiveHandler} variant={filterChecked === "Active" ? "contained" : "outlined"}>Active</Button>
            <Button onClick={setCompletedHandler} variant={filterChecked === "Completed" ? "contained" : "outlined"}>Completed</Button>
         </ButtonGroup>
         <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreVertIcon/>
         </IconButton>
         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <MenuItem onClick={handleCloseAll}>All</MenuItem>
            <MenuItem onClick={handleCloseHigh}>High</MenuItem>
            <MenuItem onClick={handleCloseMiddle}>Middle</MenuItem>
            <MenuItem onClick={handleCloseLow}>Low</MenuItem>
         </Menu>
      </>

   );
};

