import React from 'react';
import {TodoList} from "./TodoList/TodoList";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {Grid} from "@material-ui/core";
import {FilterCheckedTaskType, FilterPriorityTaskType, TodoListStateType} from "../../App";
import {TaskType} from "./TodoList/ListTasksTodoList/TaskTodoList/TaskTodoList";

export type TodoListsType = {
   state: TodoListStateType
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeFilterCheckedTodoList: (todoList_ID: string, filterChecked: FilterCheckedTaskType) => void
   changeFilterPriorityTodoList: (todoList_ID: string, filterPriority: FilterPriorityTaskType) => void
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterPriorityTaskType) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
   getFilteredCheckedTasks: (todoList_ID: string, filterChecked: FilterCheckedTaskType, filterPriority: FilterPriorityTaskType) => TaskType[]
}

export const TodoLists: React.FC<TodoListsType> = (
   {
      state,
      changeCheckedTaskCallback,
      removeTaskCallback,
      changeFilterPriorityTodoList,
      removeTodoListCallback,
      changeValueSelectCallback,
      changeFilterCheckedTodoList,
      addTaskCallback,
      getFilteredCheckedTasks
   }
) => {
   return (
      <Grid container spacing={3}>
         {state.todoLists.map(tl => {
            return (
               <><TodoList key={tl.todoList_ID}
                           todoList_ID={tl.todoList_ID}
                           title={tl.title}
                           selectValue={tl.selectValue}
                           addTaskCallback={addTaskCallback}
                           removeTaskCallback={removeTaskCallback}
                           removeTodoListCallback={removeTodoListCallback}
                           changeValueSelectCallback={changeValueSelectCallback}
                           changeCheckedTaskCallback={changeCheckedTaskCallback}
                           tasks={getFilteredCheckedTasks(tl.todoList_ID, tl.filterChecked, tl.filterPriority)}/>
                  {/* ============================ FILTER BUTTON BLOCK ===============================*/}
                  <FilterButtons todoList_ID={tl.todoList_ID}
                                 filterChecked={tl.filterChecked}
                                 filterPriority={tl.filterPriority}
                                 changeFilterPriorityTodoList={changeFilterPriorityTodoList}
                                 changeFilterCheckedTodoList={changeFilterCheckedTodoList}/></>
            )
         })}
      </Grid>
   );
};