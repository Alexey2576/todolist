import React from 'react';
import {Grid} from "@material-ui/core";
import {FilterCheckedTaskType, FilterPriorityTaskType} from "../../App";
import {TasksStateType} from "../Reducer/TasksReducer/tasksReducer";
import {TodoListsStateType} from "../Reducer/TodoListsReducer/todoListsReducer";
import {TodoList} from "./TodoList/TodoList";

export type TodoListsType = {
   tasksState: TasksStateType
   todoListsState: TodoListsStateType[]
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeFilterCheckedTodoList: (todoList_ID: string, filterChecked: FilterCheckedTaskType) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTaskType) => void
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterPriorityTaskType) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}

export const TodoLists: React.FC<TodoListsType> = React.memo((props)  => {
   return (
      <Grid container spacing={3}>
         { props.todoListsState.map(tl => <TodoList todoList={tl} {...props}/>) }
      </Grid>
   );
});

