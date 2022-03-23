import React from 'react';
import {List} from "@material-ui/core";
import {TaskTodoList} from "./TaskTodoList/TaskTodoList";
import {FilterStatusTask, ProgressTaskType, TaskType} from "../../../../Redux/Tasks/tasksReducer";

export type ListTasksTodoListType = {
   todoList_ID: string
   tasks: TaskType[]
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   changeStatusTaskCallback: (todoList_ID: string, task_ID: string, checked: FilterStatusTask) => void
   changeTitleTaskCallback: (todoList_ID: string, task_ID: string, title: string) => void
}

export const ListTasksTodoList: React.FC<ListTasksTodoListType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const {tasks,} = props
   return (
      <List component="nav"
            aria-label="mailbox folders">
         {tasks.map(task => {
            return (
               <>
                  <TaskTodoList key={task.id} task={task} {...props}/>
               </>
            )
         })}
      </List>
   );
});