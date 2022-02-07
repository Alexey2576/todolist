import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import {TextField, Typography} from "@material-ui/core";

type EditableSpanType = {
   value: string
   editMode: boolean
   onChangeTextTitle: (value: string) => void
   setEditModeCallback: (editMode: boolean) => void
   variant:
      | 'h1'
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
   const { value, onChangeTextTitle, variant, editMode, setEditModeCallback, } =  props

   // ============================= HANDLERS ===========================================================================
   const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setEditModeCallback(false), [setEditModeCallback])
   const onBlurHandler = useCallback(() => setEditModeCallback(false), [setEditModeCallback])
   const onDoubleClickHandler = useCallback(() => setEditModeCallback(true), [setEditModeCallback])
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
