import React, {memo} from 'react';
import {Grid} from "@material-ui/core";
import {TodoList} from "./TodoList/TodoList";
import {useAppSelector} from "../../../Redux/store";
import {selectTodoLists} from "../../../Redux/TodoLists/Selectors/selectTodoLists";

export const TodoLists = memo(()  => {
   const todoLists = useAppSelector(selectTodoLists)
   return (
      <Grid container spacing={3}>
         { todoLists.map(tl => <TodoList key={tl.id} todoList={tl} />) }
      </Grid>
   );
});

