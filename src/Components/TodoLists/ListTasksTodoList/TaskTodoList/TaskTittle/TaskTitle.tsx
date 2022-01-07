import React, {useState} from 'react';
import {Typography} from "@material-ui/core";
import {FilterPriorityTaskType} from "../../../../../App";
import {EditableSpan} from "../../../../EditableSpan/EditableSpan";

export type TaskTitleType = {
   task_title: string
   task_priority: FilterPriorityTaskType
}

export const TaskTitle: React.FC<TaskTitleType> = (
   {
      task_title,
      task_priority
   }
) => {
   const [value, setValue] = useState<string>(task_title)

   const onChangeText = (value: string) => setValue(value)

   return (
      <span style={{
         padding: "0 10px",
         width: "100%",
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center"
      }}>
         <EditableSpan value={value} variant={"button"}
                       onChangeTextTitle={onChangeText}/>
         <Typography gutterBottom
                     variant={"button"}
                     style={{
                        width: "50px",
                        fontSize: "12px",
                        textAlign: "center"
                     }}>
            {task_priority}
         </Typography>
      </span>
   );
};