import React, {useState} from 'react';
import s from './Task.module.css'
import {FilterType} from "../../../App";
import EditableSpan from "../../EditableSpan/EditableSpan";

export type TaskType = {
   task_ID: string,
   task_title: string
   task_priority: FilterType
}
const Task: React.FC<TaskType> = (
   {
      task_ID,
      task_title,
      task_priority
   }
) => {
   const [value, setValue] = useState<string>(task_title)

   const onChangeText = (value: string) => setValue(value)
   return (
      <div className={s.task}>
         <div className={s.task_title}>
            <EditableSpan value={value} onChangeText={onChangeText}/>
         </div>
         <div className={s.task_priority}>
            <span>{task_priority}</span>
         </div>
      </div>
   );
};

export default Task;