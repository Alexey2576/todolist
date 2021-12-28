import React, {useState} from 'react';
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {Grid, IconButton} from "@material-ui/core";
import ClearAllIcon from "@material-ui/icons/ClearAll";

export type TitleTodoListType = {
   todoList_ID: string
   title: string
   removeTodoListCallback: (todoList_ID: string) => void
}

export const TitleTodoList: React.FC<TitleTodoListType> = (
   {
      todoList_ID,
      title,
      removeTodoListCallback
   }
) => {
   const [valueTitle, setValueTitle] = useState<string>(title)
   const onChangeTextTitleHandler = (value: string) => setValueTitle(value)
   const onClickRemoveTodoListHandler = () => removeTodoListCallback(todoList_ID)

   return (
      <Grid container
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               marginBottom: "15px"
            }}>
         <EditableSpan value={valueTitle} variant={"h5"}
                       onChangeTextTitle={onChangeTextTitleHandler}/>
         <IconButton size="small" onClick={onClickRemoveTodoListHandler}>
            <ClearAllIcon/>
         </IconButton>
      </Grid>
   );
}