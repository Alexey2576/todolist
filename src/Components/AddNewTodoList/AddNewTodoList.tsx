import React, {ChangeEvent} from 'react';
import {Grid, IconButton, TextField} from "@material-ui/core";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import {makeStyles} from "@material-ui/core/styles";

export type AddNewTodoListType = {
   value: string
   addTodoListCallback: () => void
   changeTextNewTodoListCallback: (value: string) => void
}

const useStyles = makeStyles({
   grid_container: {
      margin: "20px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
   }
})

const AddNewTodoList: React.FC<AddNewTodoListType> = (
   {
      value,
      addTodoListCallback,
      changeTextNewTodoListCallback
   }
) => {
   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ============================= HANDLERS ===========================================================================
   const addTodoListHandler = () => addTodoListCallback()
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTextNewTodoListCallback(e.currentTarget.value)

   return (
      <Grid container className={classes.grid_container}>
         <Grid item>
            <TextField
               id="outlined-textarea"
               label="Multiline Placeholder"
               placeholder="Placeholder"
               multiline
               variant="outlined"
               value={value}
               onChange={onChangeHandler}/>
            <IconButton onClick={addTodoListHandler}>
               <CreateNewFolderIcon/>
            </IconButton>
         </Grid>
      </Grid>
   );
};

export const MemoizedAddNewTodoList = React.memo(AddNewTodoList)