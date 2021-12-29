import React from 'react';
import {List} from "@material-ui/core";
import {MemoizedTaskTodoList, TaskType} from "./TaskTodoList/TaskTodoList";

export type ListTasksTodoListType = {
   todoList_ID: string
   tasks: TaskType[]
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeCheckedTaskCallback: (todoList_ID: string, task_ID: string, checked: boolean) => void
}

export const ListTasksTodoList: React.FC<ListTasksTodoListType> = (
   {
      todoList_ID,
      tasks,
      removeTaskCallback,
      changeCheckedTaskCallback
   }
) => {
   return (
      <List component="nav"
            aria-label="mailbox folders">
         {tasks.map(task => <MemoizedTaskTodoList todoList_ID={todoList_ID}
                                                  task={task}
                                                  removeTaskCallback={removeTaskCallback}
                                                  changeCheckedTaskCallback={changeCheckedTaskCallback}/>)}
      </List>
   );
};