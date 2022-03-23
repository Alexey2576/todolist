import React, {useCallback, useState} from 'react';
import {Typography} from "@material-ui/core";
import {EditableSpan} from "../../../../../Commons/EditableSpan/EditableSpan";
import {FilterPriorityTask} from "../../../../../../Redux/Tasks/tasksReducer";

export type TaskTitleType = {
   task_title: string
   task_priority: FilterPriorityTask
   task_ID: string
   todoList_ID: string
   changeTitleTaskCallback: (todoList_ID: string, task_ID: string, title: string) => void
}

export const TaskTitle: React.FC<TaskTitleType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const {task_title, task_priority, task_ID, todoList_ID, changeTitleTaskCallback,} = props

   // ============================= USE STATE ==========================================================================
   const [value, setValue] = useState<string>(task_title)
   const [editMode, setEditMode] = useState<boolean>(false)

   // ============================= CALLBACK ===========================================================================
   const onChangeTextTitle = useCallback((value: string) => setValue(value), [setValue])
   const setEditModeCallback = useCallback((editMode: boolean) => {
      setEditMode(editMode)
      !editMode && changeTitleTaskCallback(todoList_ID, task_ID, value)
   }, [changeTitleTaskCallback, task_ID, todoList_ID, value])

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
                       editMode={editMode}
                       setEditModeCallback={setEditModeCallback}
                       onChangeTextTitle={onChangeTextTitle}
         />
         <Typography gutterBottom
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