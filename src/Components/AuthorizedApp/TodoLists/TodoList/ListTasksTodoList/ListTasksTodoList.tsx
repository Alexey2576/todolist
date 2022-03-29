import React, {FC, memo} from 'react';
import {List} from "@material-ui/core";
import {TaskTodoList} from "./TaskTodoList/TaskTodoList";
import {TaskType} from "../../../../../Redux/Tasks/Types";

export const ListTasksTodoList: FC<ListTasksTodoListType> = memo(({tasks, todoList_ID}) => {
   return (
      <List component="nav"
            aria-label="mailbox folders">
         {tasks.map(task => (
            <TaskTodoList
               task={task}
               key={task.id}
               todoList_ID={todoList_ID}
            />
         ))}
      </List>
   );
});

export type ListTasksTodoListType = {
   tasks: TaskType[]
   todoList_ID: string
}