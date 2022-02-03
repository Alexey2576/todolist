import React from 'react';
import {List} from "@material-ui/core";
import {TaskTodoList} from "./TaskTodoList/TaskTodoList";
import {FilterStatusTask, TaskType} from "../../../../API/tasks-api";

export type ListTasksTodoListType = {
   todoList_ID: string
   tasks: TaskType[]
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: FilterStatusTask) => void
}

export const ListTasksTodoList: React.FC<ListTasksTodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const { tasks, } = props
   return (
      <List component="nav"
            aria-label="mailbox folders">
         { tasks.map(task => <TaskTodoList key={task.id} task={task} {...props}/>) }
      </List>
   );
});