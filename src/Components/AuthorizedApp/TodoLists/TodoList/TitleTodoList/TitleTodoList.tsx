import {Grid, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {todoListsActions} from "../../../../../Redux";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import {useActions} from "../../../../../Utils/useActions";
import React, {FC, memo, useCallback, useState} from 'react';
import {EditableSpan} from "../../../../Commons/EditableSpan/EditableSpan";

export const TitleTodoLists: FC<TitleTodoListType> = memo(({todoList_ID, title}) => {
   const classes = useStyles();
   const [valueTitle, setValueTitle] = useState(title)
   const [editMode, setEditMode] = useState(false)
   const {changeTitleTodoList, removeTodoList} = useActions(todoListsActions)

   // ============================= CALLBACKS ==========================================================================
   const setEditModeCallback = useCallback((editMode: boolean) => {
      setEditMode(editMode)
      !editMode && changeTitleTodoList({todoList_ID, newTitle: valueTitle})
   }, [changeTitleTodoList, todoList_ID, valueTitle])

   const onClickRemoveTodoListHandler = useCallback(() => removeTodoList(todoList_ID), [removeTodoList, todoList_ID])
   const onChangeTextTitleHandler = useCallback((value: string) => setValueTitle(value), [setValueTitle])

   return (
      <Grid container className={classes.grid_container}>
         <EditableSpan
            variant={"h5"}
            value={valueTitle}
            editMode={editMode}
            setEditModeCallback={setEditModeCallback}
            onChangeTextTitle={onChangeTextTitleHandler}
         />
         <IconButton
            size="small"
            onClick={onClickRemoveTodoListHandler}
         >
            <ClearAllIcon/>
         </IconButton>
      </Grid>
   );
});

const useStyles = makeStyles({
   grid_container: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
      justifyContent: "center",
   },
});

type TitleTodoListType = {
   title: string
   todoList_ID: string
}

