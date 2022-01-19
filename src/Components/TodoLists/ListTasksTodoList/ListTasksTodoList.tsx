import React from 'react';
import {List} from "@material-ui/core";
import {TaskTodoList, TaskType} from "./TaskTodoList/TaskTodoList";

export type ListTasksTodoListType = {
   todoList_ID: string
   tasks: TaskType[]
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}

export const ListTasksTodoList: React.FC<ListTasksTodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const { tasks, } = props
   return (
      <List component="nav"
            aria-label="mailbox folders">
         { tasks.map(task => <TaskTodoList task={task} {...props}/>) }
      </List>
   );
});