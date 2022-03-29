import React, {FC, memo, useCallback} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {FilterPriorityTask, FilterStatusTask} from "../../../../../Redux/Tasks/Enums";
import {Button, ButtonGroup, Grid, IconButton, Menu, MenuItem} from "@material-ui/core";
import {useActions} from "../../../../../Utils/useActions";
import {todoListsActions} from "../../../../../Redux";

export const FilterButtons: FC<FilterButtonsType> = memo(({todoList_ID, filterStatus}) => {
   const {changeFilterCheckedTodoList, changeFilterPriorityTodoList} = useActions(todoListsActions)
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   // ==== Button Group ===
   const setAllHandler = useCallback(() =>
      changeFilterCheckedTodoList({todoList_ID, filterStatus: FilterStatusTask.All}), [todoList_ID])
   const setActiveHandler = useCallback(() =>
      changeFilterCheckedTodoList({todoList_ID, filterStatus: FilterStatusTask.New}), [todoList_ID])
   const setCompletedHandler = useCallback(() =>
      changeFilterCheckedTodoList({todoList_ID, filterStatus: FilterStatusTask.Completed}), [todoList_ID])

   // ==== Menu (DOTS) ===
   const handleClickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), [setAnchorEl])
   const handleCloseHandler = useCallback(() => setAnchorEl(null), [setAnchorEl])

   // ==== Menu ===
   const handleCloseAllHandler = useCallback(() => {
      changeFilterPriorityTodoList({todoList_ID, filterPriority: FilterPriorityTask.All})
      setAnchorEl(null);
   }, [setAnchorEl, todoList_ID]);
   const handleCloseHighHandler = useCallback(() => {
      changeFilterPriorityTodoList({todoList_ID, filterPriority: FilterPriorityTask.High})
      setAnchorEl(null);
   }, [setAnchorEl, todoList_ID]);
   const handleCloseMiddleHandler = useCallback(() => {
      changeFilterPriorityTodoList({todoList_ID, filterPriority: FilterPriorityTask.Middle})
      setAnchorEl(null);
   }, [setAnchorEl, todoList_ID]);
   const handleCloseLowHandler = useCallback(() => {
      changeFilterPriorityTodoList({todoList_ID, filterPriority: FilterPriorityTask.Low})
      setAnchorEl(null);
   }, [setAnchorEl, todoList_ID]);

   return (
      <Grid item className={classes.grid_item}>
         <ButtonGroup fullWidth color={"primary"}>
            <Button
               onClick={setAllHandler}
               variant={filterStatus === FilterStatusTask.All ? "contained" : "outlined"}
            >
               All
            </Button>
            <Button
               onClick={setActiveHandler}
               variant={filterStatus === FilterStatusTask.New ? "contained" : "outlined"}
            >
               Active
            </Button>
            <Button onClick={setCompletedHandler}
                    variant={filterStatus === FilterStatusTask.Completed ? "contained" : "outlined"}
            >
               Completed
            </Button>
         </ButtonGroup>
         <IconButton aria-controls="simple-menu"
                     aria-haspopup="true"
                     onClick={handleClickHandler}>
            <MoreVertIcon/>
         </IconButton>
         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseHandler}
         >
            <MenuItem onClick={handleCloseAllHandler}>All</MenuItem>
            <MenuItem onClick={handleCloseHighHandler}>High</MenuItem>
            <MenuItem onClick={handleCloseMiddleHandler}>Middle</MenuItem>
            <MenuItem onClick={handleCloseLowHandler}>Low</MenuItem>
         </Menu>
      </Grid>
   );
});

export type FilterButtonsType = {
   todoList_ID: string
   filterStatus: FilterStatusTask
   filterPriority: FilterPriorityTask
}

const useStyles = makeStyles({
   grid_item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
})