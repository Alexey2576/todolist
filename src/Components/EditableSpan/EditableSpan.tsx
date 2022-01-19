import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {TextField, Typography} from "@material-ui/core";

type EditableSpanType = {
   value: string
   onChangeTextTitle: (value: string) => void
   variant: 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'subtitle1'
      | 'subtitle2'
      | 'body1'
      | 'body2'
      | 'caption'
      | 'button'
      | 'overline'
      | 'srOnly'
      | 'inherit'
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo((props) => {
   // ============================= DESTRUCTURING PROPS  ===============================================================
   const { value, onChangeTextTitle, variant, } =  props

   // ============================= USE STATE ==========================================================================
   const [editMode, setEditMode] = useState<boolean>(false)

   // ============================= HANDLERS ===========================================================================
   const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setEditMode(false), [setEditMode])
   const onBlurHandler = useCallback(() => setEditMode(false), [setEditMode])
   const onDoubleClickHandler = useCallback(() => setEditMode(true), [setEditMode])
   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => onChangeTextTitle(e.currentTarget.value), [onChangeTextTitle])
   return (
      <div>
         {editMode
            ? <TextField autoFocus
                         id="standard-basic" size={"small"}
                         value={value}
                         onChange={onChangeHandler}
                         onBlur={onBlurHandler}
                         onKeyPress={onKeyPressHandler}/>
            : <Typography gutterBottom
                          variant={variant}
                          onDoubleClick={onDoubleClickHandler}>{value}</Typography>
         }
      </div>
   )
})
