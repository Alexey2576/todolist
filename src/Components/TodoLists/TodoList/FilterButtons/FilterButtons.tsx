import React, {useCallback} from 'react';
import {Button, ButtonGroup, Grid, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from "@material-ui/core/styles";
import {FilterPriorityTask, FilterStatusTask} from "../../../../API/tasks-api";

export type FilterButtonsType = {
   todoList_ID: string
   filterPriority: FilterPriorityTask
   filterStatus: FilterStatusTask
   changeFilterStatusTodoListCallback: (todoList_ID: string, filterStatus: FilterStatusTask) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTask) => void
}

const useStyles = makeStyles({
   grid_item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
});

export const FilterButtons: React.FC<FilterButtonsType> = React.memo((props) => {
   const { todoList_ID, filterStatus, changeFilterStatusTodoListCallback, changeFilterPriorityTodoList, } = props

   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // =================================== USE STATE ====================================================================
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   // =================================== HANDLERS =====================================================================
   // ==== Button Group ===
   const setAllHandler = useCallback(() => changeFilterStatusTodoListCallback(todoList_ID, FilterStatusTask.All), [changeFilterStatusTodoListCallback, todoList_ID])
   const setActiveHandler = useCallback(() => changeFilterStatusTodoListCallback(todoList_ID, FilterStatusTask.New), [changeFilterStatusTodoListCallback, todoList_ID])
   const setCompletedHandler = useCallback(() => changeFilterStatusTodoListCallback(todoList_ID, FilterStatusTask.Completed), [changeFilterStatusTodoListCallback, todoList_ID])

   // ==== Menu (DOTS) ===
   const handleClickHandler = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), [setAnchorEl])
   const handleCloseHandler = useCallback(() => setAnchorEl(null), [setAnchorEl])

   // ==== Menu ===
   const handleCloseAllHandler = useCallback(() => {
      changeFilterPriorityTodoList(todoList_ID, FilterPriorityTask.All)
      setAnchorEl(null);
   }, [changeFilterPriorityTodoList, setAnchorEl, todoList_ID]);
   const handleCloseHighHandler = useCallback(() => {
      changeFilterPriorityTodoList(todoList_ID, FilterPriorityTask.High)
      setAnchorEl(null);
   }, [changeFilterPriorityTodoList, setAnchorEl, todoList_ID]);
   const handleCloseMiddleHandler = useCallback(() => {
      changeFilterPriorityTodoList(todoList_ID, FilterPriorityTask.Middle)
      setAnchorEl(null);
   }, [changeFilterPriorityTodoList, setAnchorEl, todoList_ID]);
   const handleCloseLowHandler = useCallback(() => {
      changeFilterPriorityTodoList(todoList_ID, FilterPriorityTask.Low)
      setAnchorEl(null);
   }, [changeFilterPriorityTodoList, setAnchorEl, todoList_ID]);

   return (
      <Grid item className={classes.grid_item}>
         <ButtonGroup fullWidth color={"primary"}>
            <Button onClick={setAllHandler}
                    variant={filterStatus === FilterStatusTask.All ? "contained" : "outlined"}>All</Button>
            <Button onClick={setActiveHandler}
                    variant={filterStatus === FilterStatusTask.New ? "contained" : "outlined"}>Active</Button>
            <Button onClick={setCompletedHandler}
                    variant={filterStatus === FilterStatusTask.Completed ? "contained" : "outlined"}>Completed</Button>
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

