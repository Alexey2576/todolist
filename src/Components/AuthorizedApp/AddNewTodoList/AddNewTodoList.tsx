import {useSelector} from "react-redux";
import {todoListsActions} from "../../../Redux";
import {makeStyles} from "@material-ui/core/styles";
import {useActions} from "../../../Utils/useActions";
import React, {ChangeEvent, memo, useState} from 'react';
import {Grid, IconButton, TextField} from "@material-ui/core";
import {selectIsFetching} from "../../../Redux/App/Selectors";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

export const AddNewTodoList = memo(() => {
   const classes = useStyles();
   const isFetching = useSelector(selectIsFetching)
   const {addTodoList} = useActions(todoListsActions)
   const [newTodoListTitle, setNewTodoListTitle] = useState("")

   const addTodoListHandler = () => {
      addTodoList(newTodoListTitle)
      setNewTodoListTitle("")
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      setNewTodoListTitle(e.currentTarget.value)

   return (
      <Grid container className={classes.grid_container}>
         <Grid item className={classes.grid_item}>
            <TextField
               multiline
               size={"small"}
               variant="outlined"
               label="New Todo list"
               id="outlined-textarea"
               value={newTodoListTitle}
               placeholder="Enter title"
               onChange={onChangeHandler}
            />
            <IconButton onClick={addTodoListHandler} disabled={isFetching}>
               <CreateNewFolderIcon/>
            </IconButton>
         </Grid>
      </Grid>
   );
});

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "center",
   },
   grid_item: {
      display: "flex",
      alignItems: "center",
      margin: "100px 0 40px 0",
      justifyContent: "center",
   },
})