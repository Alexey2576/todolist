import React from "react";
import {FilterPriorityTaskType} from "../../../App";
import {Grid, Paper} from "@material-ui/core";
import {TitleTodoList} from "./TitleTodoList/TitleTodoList";
import {AddTaskTodoList} from "./AddTaskTodoList/AddTaskTodoList";
import {ListTasksTodoList} from "./ListTasksTodoList/ListTasksTodoList";
import {TaskType} from "./ListTasksTodoList/TaskTodoList/TaskTodoList";

export type TodoListType = {
   todoList_ID: string
   title: string
   selectValue: FilterPriorityTaskType
   tasks: TaskType[]
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterPriorityTaskType) => void
   removeTodoListCallback: (todoList_ID: string) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterPriorityTaskType) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}

export const TodoList: React.FC<TodoListType> = (
   {
      todoList_ID,
      title,
      selectValue,
      tasks,
      addTaskCallback,
      removeTaskCallback,
      changeValueSelectCallback,
      changeCheckedTaskCallback,
      removeTodoListCallback
   }
) => {

   return (
      <Grid item spacing={6} md={4} xs={3}>
         <Paper elevation={7} style={{padding: "10px"}}>
            <Grid item>
               <TitleTodoList todoList_ID={todoList_ID}
                              title={title}
                              removeTodoListCallback={removeTodoListCallback}/>
               <AddTaskTodoList todoList_ID={todoList_ID}
                                selectValue={selectValue}
                                addTaskCallback={addTaskCallback}
                                changeValueSelectCallback={changeValueSelectCallback}/>
               <ListTasksTodoList todoList_ID={todoList_ID}
                                  tasks={tasks}
                                  changeCheckedTaskCallback={changeCheckedTaskCallback}
                                  removeTaskCallback={removeTaskCallback}/>
            </Grid>
         </Paper>
      </Grid>
   )
}