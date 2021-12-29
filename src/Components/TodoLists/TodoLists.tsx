import React from 'react';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {Grid, Paper} from "@material-ui/core";
import {FilterCheckedTaskType, FilterPriorityTaskType, TodoListStateType} from "../../App";
import {AddTaskTodoList} from "./AddTaskTodoList/AddTaskTodoList";
import {LinearProgressTasks} from "./LinearProgressTasks/LinearProgressTasks";
import {TitleTodoList} from "./TitleTodoList/TitleTodoList";
import {ListTasksTodoList} from "./ListTasksTodoList/ListTasksTodoList";
import {TaskType} from "./ListTasksTodoList/TaskTodoList/TaskTodoList";

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
               <Grid item spacing={6} md={4} xs={3}>
                  <Paper elevation={7} style={{padding: "10px"}}>
                     <TitleTodoList todoList_ID={tl.todoList_ID}
                                    title={tl.title}
                                    removeTodoListCallback={removeTodoListCallback}/>
                     <AddTaskTodoList todoList_ID={tl.todoList_ID}
                                      selectValue={tl.selectValue}
                                      addTaskCallback={addTaskCallback}
                                      changeValueSelectCallback={changeValueSelectCallback}/>
                     <LinearProgressTasks numberOfAllTasks={state.tasks[tl.todoList_ID].length}
                                          numberOfCompletedTasks={state.tasks[tl.todoList_ID].filter(t => t.checked).length}/>
                     <ListTasksTodoList todoList_ID={tl.todoList_ID}
                                        tasks={getFilteredCheckedTasks(tl.todoList_ID, tl.filterChecked, tl.filterPriority)}
                                        changeCheckedTaskCallback={changeCheckedTaskCallback}
                                        removeTaskCallback={removeTaskCallback}/>
                     <FilterButtons todoList_ID={tl.todoList_ID}
                                    filterChecked={tl.filterChecked}
                                    filterPriority={tl.filterPriority}
                                    changeFilterPriorityTodoList={changeFilterPriorityTodoList}
                                    changeFilterCheckedTodoList={changeFilterCheckedTodoList}/>
                  </Paper>
               </Grid>
            )
         })}
      </Grid>
   );
};