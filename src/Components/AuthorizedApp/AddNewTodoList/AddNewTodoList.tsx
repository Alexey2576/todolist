import React, {ChangeEvent, useState} from 'react';
import {CircularProgress, Grid, IconButton, TextField} from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../Redux/store";

export type AddNewTodoListType = {
   addTodoListCallback: (title: string) => void
}

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "center",
   },
   grid_item: {
      margin: "100px 0 40px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
})

export const AddNewTodoList: React.FC<AddNewTodoListType> = React.memo(({ addTodoListCallback, }) => {
   const isFetching = useSelector<RootStateType, boolean>(state => state.app.isFetching)

   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ============================= USE STATE ================================================================
   const [newTodoListTitle, setNewTodoListTitle] = useState("")

   // ============================= HANDLERS ===========================================================================
   const addTodoListHandler = () => {
      addTodoListCallback(newTodoListTitle)
      setNewTodoListTitle("")
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTodoListTitle(e.currentTarget.value)

   return (
      <Grid container className={classes.grid_container}>
         <Grid item className={classes.grid_item}>
            <TextField
               id="outlined-textarea"
               label="New Todo list"
               placeholder="Enter title"
               multiline
               variant="outlined"
               value={newTodoListTitle}
               onChange={onChangeHandler}
               size={"small"}
            />
            <IconButton onClick={addTodoListHandler} disabled={isFetching}>
               <CreateNewFolderIcon/>
            </IconButton>
         </Grid>
      </Grid>
   );
});