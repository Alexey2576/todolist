import React, {useCallback, useState} from 'react';
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {Grid, IconButton} from "@material-ui/core";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import {makeStyles} from "@material-ui/core/styles";

export type TitleTodoListType = {
   todoList_ID: string
   title: string
   removeTodoListCallback: (todoList_ID: string) => void
}

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "15px",
   },
});

export const TitleTodoLists: React.FC<TitleTodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const { todoList_ID, title, removeTodoListCallback, } = props

   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ============================= USE STATE ==========================================================================
   const [valueTitle, setValueTitle] = useState(title)

   // ============================= HANDLERS ===========================================================================
   const onChangeTextTitleHandler = useCallback((value: string) => setValueTitle(value), [setValueTitle])
   const onClickRemoveTodoListHandler = useCallback(() => removeTodoListCallback(todoList_ID), [removeTodoListCallback, todoList_ID])

   return (
      <Grid container className={classes.grid_container}>
         <EditableSpan value={valueTitle}
                       variant={"h5"}
                       onChangeTextTitle={onChangeTextTitleHandler}/>
         <IconButton size="small"
                     onClick={onClickRemoveTodoListHandler}>
            <ClearAllIcon/>
         </IconButton>
      </Grid>
   );
});

