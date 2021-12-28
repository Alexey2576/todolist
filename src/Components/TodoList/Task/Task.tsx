import React, {useState} from 'react';
import {FilterType} from "../../../App";
import {EditableSpan} from "../../MyComponents/MyEditableSpan/MyEditableSpan";
import {Typography} from "@material-ui/core";

export type TaskType = {
   task_ID: string,
   checked: boolean
   task_title: string
   task_priority: FilterType
}
export const Task: React.FC<TaskType> = (
   {
      task_title,
      task_priority
   }
) => {
   const [value, setValue] = useState<string>(task_title)

   const onChangeText = (value: string) => setValue(value)
   return (
      <>
         <EditableSpan value={value} variant={"button"}
                       onChangeTextTitle={onChangeText}/>
         <Typography gutterBottom
                     variant={"button"} style={{fontSize: "12px"}}>{task_priority}</Typography>
      </>
   );
};