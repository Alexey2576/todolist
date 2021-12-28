import React, {ChangeEvent} from 'react';
import s from "../../App.module.css";
import {IconButton, TextField} from "@material-ui/core";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

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
   return (
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
   );
};

