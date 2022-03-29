import {Typography} from "@material-ui/core";
import React, {useCallback, useState} from 'react';
import {tasksActions} from "../../../../../../../Redux";
import {useActions} from "../../../../../../../Utils/useActions";
import {FilterPriorityTask} from "../../../../../../../Redux/Tasks/Enums";
import {EditableSpan} from "../../../../../../Commons/EditableSpan/EditableSpan";

export const TaskTitle: React.FC<TaskTitleType> = React.memo((props) => {
   const {task_title, task_priority, task_ID, todoList_ID} = props

   const {updateTask} = useActions(tasksActions)
   const [value, setValue] = useState<string>(task_title)
   const [editMode, setEditMode] = useState<boolean>(false)

   const onChangeTextTitle = useCallback((value: string) => setValue(value), [setValue])
   const setEditModeCallback = useCallback((editMode: boolean) => {
      setEditMode(editMode)
      !editMode &&
      updateTask({todoList_ID, task_ID, updateTaskBody: {title: value}})
   }, [task_ID, todoList_ID, updateTask, value])

   return (
      <span style={{
         width: "100%",
         display: "flex",
         padding: "0 10px",
         alignItems: "center",
         justifyContent: "space-between",
      }}>
         <EditableSpan
            value={value}
            variant={"button"}
            editMode={editMode}
            onChangeTextTitle={onChangeTextTitle}
            setEditModeCallback={setEditModeCallback}
         />
         <Typography
            gutterBottom
            variant={"button"}
            style={{
               width: "50px",
               fontSize: "12px",
               textAlign: "center",
            }}
         >
            {task_priority}
         </Typography>
      </span>
   );
});

export type TaskTitleType = {
   task_ID: string
   task_title: string
   todoList_ID: string
   task_priority: FilterPriorityTask
}