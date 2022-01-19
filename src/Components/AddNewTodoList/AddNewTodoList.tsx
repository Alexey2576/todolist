import React, {ChangeEvent, useState} from 'react';
import {Grid, IconButton, TextField} from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import {makeStyles} from "@material-ui/core/styles";

export type AddNewTodoListType = {
   addTodoListCallback: (title: string) => void
}

const useStyles = makeStyles({
   grid_container: {
      margin: "100px 0 40px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
})

export const AddNewTodoList: React.FC<AddNewTodoListType> = React.memo(({ addTodoListCallback, }) => {
   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ============================= USE STATE ================================================================
   const [newTodoListTitle, setNewTodoListTitle] = useState("")

   // ============================= HANDLERS ===========================================================================
   const addTodoListHandler = () => addTodoListCallback(newTodoListTitle)
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTodoListTitle(e.currentTarget.value)

   return (
      <Grid container className={classes.grid_container}>
         <Grid item>
            <TextField
               id="outlined-textarea"
               label="Multiline Placeholder"
               placeholder="Placeholder"
               multiline
               variant="outlined"
               value={newTodoListTitle}
               onChange={onChangeHandler}/>
            <IconButton onClick={addTodoListHandler}>
               <CreateNewFolderIcon/>
            </IconButton>
         </Grid>
      </Grid>
   );
});