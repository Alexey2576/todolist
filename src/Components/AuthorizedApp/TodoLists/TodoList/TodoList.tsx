import {Grid, Paper} from "@material-ui/core";
import {tasksActions} from "../../../../Redux";
import React, {FC, memo, useEffect} from "react";
import {useAppSelector} from "../../../../Redux/store";
import {useActions} from "../../../../Utils/useActions";
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {TitleTodoLists} from "./TitleTodoList/TitleTodoList";
import {FilterStatusTask} from "../../../../Redux/Tasks/Enums";
import {AddTaskTodoList} from "./AddTaskTodoList/AddTaskTodoList";
import {TodoListsStateType} from "../../../../Redux/TodoLists/Types";
import {ListTasksTodoList} from "./ListTasksTodoList/ListTasksTodoList";
import {selectTasks} from "../../../../Redux/Tasks/Selectors/selectTasks";
import {LinearProgressTasks} from "./LinearProgressTasks/LinearProgressTasks";
import {getFilteredCheckedTasksCallback} from "../../../../Utils/getFilteredCheckedTasks";

export const TodoList: FC<TodoListType> = memo(({todoList}) => {
   const tasks = useAppSelector(selectTasks)
   const {getTasks} = useActions(tasksActions)

   const filteredTasks = getFilteredCheckedTasksCallback(todoList.id, todoList.filterStatus, todoList.filterPriority, tasks)
   const numberOfAllTasks = tasks[todoList.id].length
   const numberOfCompletedTasks = tasks[todoList.id].filter(t => t.status === FilterStatusTask.Completed).length

   useEffect(() => {
      getTasks(todoList.id)
   }, [getTasks, todoList.id])

   return (
      <Grid item>
         <Paper elevation={7} style={{padding: "10px"}}>
            <TitleTodoLists
               title={todoList.title}
               todoList_ID={todoList.id}
            />
            <AddTaskTodoList
               todoList_ID={todoList.id}
               progressTodoList={todoList.progress}
               selectPriorityValue={todoList.selectPriorityValue}
            />
            {
               numberOfAllTasks !== 0 &&
               <LinearProgressTasks
                 numberOfAllTasks={numberOfAllTasks}
                 numberOfCompletedTasks={numberOfCompletedTasks}
               />
            }
            <ListTasksTodoList
               tasks={filteredTasks}
               todoList_ID={todoList.id}
            />
            <FilterButtons
               todoList_ID={todoList.id}
               filterStatus={todoList.filterStatus}
               filterPriority={todoList.filterPriority}
            />
         </Paper>
      </Grid>
   )
})

export type TodoListType = {
   todoList: TodoListsStateType
}