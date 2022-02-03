import React, {useCallback, useState} from 'react';
import {Typography} from "@material-ui/core";
import {EditableSpan} from "../../../../../EditableSpan/EditableSpan";
import {FilterPriorityTask} from "../../../../../../API/tasks-api";

export type TaskTitleType = {
   task_title: string
   task_priority: FilterPriorityTask
}

export const TaskTitle: React.FC<TaskTitleType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const {task_title, task_priority,} = props

   // ============================= USE STATE ==========================================================================
   const [value, setValue] = useState<string>(task_title)

   // ============================= CALLBACK ===========================================================================
   const onChangeTextTitle = useCallback((value: string) => setValue(value), [setValue])

   return (
      <span style={{
         padding: "0 10px",
         width: "100%",
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
      }}>
         <EditableSpan value={value}
                       variant={"button"}
                       onChangeTextTitle={onChangeTextTitle}/>
         <Typography gutterBottom
                     variant={"button"}
                     style={{
                        width: "50px",
                        fontSize: "12px",
                        textAlign: "center",
                     }}>{task_priority}</Typography>
      </span>
   );
});