import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import Task from "./Tasks/Task/Task";
import {FilterType, TaskType} from "../App";

export type TodoListType = {
   titleTasks: string
   tasks: TaskType[]
   addTasksCallback: (value: string) => void
   setFilter: (filter: FilterType) => void
   removeTaskCallback: (e: MouseEvent<HTMLButtonElement>) => void
}

const TodoList: React.FC<TodoListType> = ({titleTasks, tasks, setFilter, addTasksCallback, removeTaskCallback}) => {
   const [value, setValue] = useState<string>("")
   const [error, setError] = useState<string>("")
   const [isDisabled, setIsDisabled] = useState<boolean>(true)

   const onKeyPressValue = (e: KeyboardEvent<HTMLInputElement>) => {
      console.log(e)
      if (e.charCode !== 32) {
         setIsDisabled(false)
         setError("")
      } else {
         setError("error")
      }
   }
   const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      if(error !== "error")
         setValue(e.currentTarget.value)
      if (e.currentTarget.value.length === 0)
         setIsDisabled(true)

   }
   const addTasks = () => {
      if (value.length !== 0) {
         addTasksCallback(value)
         setValue("")
      }
   }
   const filterAll = () => setFilter("all")
   const filterActive = () => setFilter("active")
   const filterDone = () => setFilter("done")

   return (
      <div>
         {/* === Title === */}
         <div>
            <h3>{titleTasks}</h3>
         </div>

         {/* === Input and add button === */}
         <div>
            <input type="text" value={value} onChange={onChangeValue} onKeyPress={onKeyPressValue}/>
            <button onClick={addTasks} disabled={isDisabled}>Add</button>
         </div>

         {/* === Array tasks === */}
         {tasks.map(t => <Task key={t.id}
                               id={t.id}
                               text={t.text}
                               isChecked={t.isChecked}
                               removeTaskCallback={removeTaskCallback}
         />)}

         {/* === Filter buttons === */}
         <div>
            <button onClick={filterAll}>All</button>
            <button onClick={filterActive}>Active</button>
            <button onClick={filterDone}>Done</button>
         </div>
      </div>
   )
}

export default TodoList;

