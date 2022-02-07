import React from 'react';
import {Grid} from "@material-ui/core";
import {FilterPriorityTask, FilterStatusTask, TasksStateType} from "../../Reducers/TasksReducer/tasksReducer";
import {TodoList} from "./TodoList/TodoList";
import {TodoListsStateType} from "../../Reducers/TodoListsReducer/todoListsReducer";

export type TodoListsType = {
   tasksState: TasksStateType
   todoListsState: TodoListsStateType[]
   addTaskCallback: (todoList_ID: string, value: string, selectPriorityValue: FilterPriorityTask) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeFilterStatusTodoListCallback: (todoList_ID: string, filterStatus: FilterStatusTask) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTask) => void
   changeValueSelectCallback: (todoList_ID: string, selectPriorityValue: FilterPriorityTask) => void
   changeStatusTaskCallback: (todoList_ID: string, task_ID: string, checked: FilterStatusTask) => void
   changeTitleTodoListCallback: (todoList_ID: string, valueTitle: string) => void
   changeTitleTaskCallback: (todoList_ID: string, task_ID: string, title: string) => void
}

export const TodoLists: React.FC<TodoListsType> = React.memo((props)  => {
   return (
      <Grid container spacing={3}>
         { props.todoListsState.map(tl => <TodoList key={tl.id} todoList={tl} {...props}/>) }
      </Grid>
   );
});

