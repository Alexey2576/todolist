import React, {ChangeEvent} from 'react';
import {Grid, IconButton, TextField} from "@material-ui/core";
import s from "../../App.module.css";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

export type AddNewTodoListType = {
   value: string
   addTodoListCallback: () => void
   changeTextNewTodoListCallback: (value: string) => void
}

export const AddNewTodoList: React.FC<AddNewTodoListType> = (
   {
      value,
      addTodoListCallback,
      changeTextNewTodoListCallback
   }
) => {
   const addTodoListHandler = () => addTodoListCallback()
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTextNewTodoListCallback(e.currentTarget.value)
   console.log("AddNewTodoList")
   return (
      <Grid container
            style={{
               margin: "20px 0",
               display: "flex",
               justifyContent: "center",
               alignItems: "center"
            }}>
         <Grid item>
            <div className={s.add_todoList}>
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
            </div>
         </Grid>
      </Grid>
   );
};