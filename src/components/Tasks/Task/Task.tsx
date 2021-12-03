import React, {MouseEvent} from "react";

export type TasksType = {
   id: string
   text: string
   isChecked: boolean
   removeTaskCallback: (e: MouseEvent<HTMLButtonElement>) => void
}

const Task: React.FC<TasksType> = ({id, text, isChecked, removeTaskCallback}) => {
   return (
      <div>
         <span>{text}</span>
         <button onClick={removeTaskCallback} id={id}>X</button>
      </div>
   )
}

export default Task;