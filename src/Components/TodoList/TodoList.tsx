import React, {ChangeEvent, useState} from "react";
import s from './TodoList.module.css'
import Task, {TaskType} from "./Task/Task";
import {EditableSpan} from "../MyComponents/MyEditableSpan/MyEditableSpan";
import MyButton from "../MyComponents/MyButton/MyButton";
import {FilterType} from "../../App";

export type TodoListType = {
   todoList_ID: string
   title: string
   selectValue: FilterType
   tasks: TaskType[]
   addTaskCallback: (todoList_ID: string, value: string, selectValue: FilterType) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void
   changeValueSelectCallback: (todoList_ID: string, selectValue: FilterType) => void
}

export const TodoList: React.FC<TodoListType> = (
   {
      todoList_ID,
      title,
      selectValue,
      tasks,
      addTaskCallback,
      removeTaskCallback,
      removeTodoListCallback,
      changeValueSelectCallback
   }
) => {

   const [valueTitle, setValueTitle] = useState<string>(title)
   const [valueTask, setValueTask] = useState<string>("")

   const onChangeTextTitle = (value: string) => setValueTitle(value)
   const onChangeTextTask = (value: string) => setValueTask(value)
   const onClickAddTask = () => {
      addTaskCallback(todoList_ID, valueTask, selectValue)
      setValueTask("")
   }
   const onClickRemoveTodoList = () => removeTodoListCallback(todoList_ID)
   const changeValueSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      changeValueSelectCallback(todoList_ID, e.target.value as FilterType)
   }
   return (
      <div className={s.todoList}>
         <div className={s.todoList_title_block}>
            <EditableSpan value={valueTitle}
                          onChangeTextTitle={onChangeTextTitle}/>
            <MyButton className={s.title_btn}
                      onClick={onClickRemoveTodoList}>X</MyButton>
         </div>
         <input type="text" value={valueTask} onChange={(e) => {onChangeTextTask(e.currentTarget.value)}}/>
         <select value={selectValue} onChange={changeValueSelectHandler}>
            <option value="High">High</option>
            <option value="Middle">Middle</option>
            <option value="Low">Low</option>
         </select>

         <MyButton onClick={onClickAddTask}
                   className={s.add_task_button}>Add</MyButton>
         {tasks.map(t => {

            const onClickRemoveTask = () => removeTaskCallback(todoList_ID, t.task_ID)

            return (
               <div className={s.task_block}>
                  <Task key={t.task_ID}
                        task_ID={t.task_ID}
                        task_title={t.task_title}
                        task_priority={t.task_priority}/>
                  <MyButton className={s.task_button}
                            onClick={onClickRemoveTask}>X</MyButton>
               </div>
            )
         })}
      </div>
   )
}