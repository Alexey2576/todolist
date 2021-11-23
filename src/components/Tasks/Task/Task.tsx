import React from "react";

export type TasksType = {
   id: string
   text: string
   isChecked: boolean
   removeTaskCallback: (id: string) => void
}

const Task: React.FC<TasksType> = ({id, text, isChecked, removeTaskCallback}) => {
   const removeTask = () => {removeTaskCallback(id)}

   return (
      <div>
         <span>{text}</span>
         <button onClick={removeTask}>X</button>
      </div>
   )
}

export default Task;