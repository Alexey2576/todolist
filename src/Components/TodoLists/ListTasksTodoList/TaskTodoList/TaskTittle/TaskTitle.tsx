import React, {useState} from 'react';
import {ListItem, Typography} from "@material-ui/core";
import {FilterPriorityTaskType} from "../../../../../App";
import {EditableSpan} from "../../../../EditableSpan/EditableSpan";

export type TaskTitleType = {
   checked: boolean
   task_title: string
   task_priority: FilterPriorityTaskType
}

export const TaskTitle: React.FC<TaskTitleType> = (
   {
      task_title,
      task_priority,
      checked
   }
) => {
   const [value, setValue] = useState<string>(task_title)

   const onChangeText = (value: string) => setValue(value)
   const opacityTask = !checked ? "100%" : "40%"

   return (
      <ListItem button divider
                style={{
                   display: "flex",
                   justifyContent: "space-between",
                   opacity: opacityTask}}>
         <EditableSpan value={value} variant={"button"}
                       onChangeTextTitle={onChangeText}/>
         <Typography gutterBottom
                     variant={"button"}
                     style={{fontSize: "12px"}}>
            {task_priority}
         </Typography>
      </ListItem>
   );
};