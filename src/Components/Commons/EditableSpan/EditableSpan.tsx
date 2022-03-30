import {TextField, Typography} from "@material-ui/core";
import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback} from 'react'


export const EditableSpan: FC<EditableSpanType> = memo((props) => {
   const {value, onChangeTextTitle, variant, editMode, setEditModeCallback,} = props

   const onBlurHandler = useCallback(() =>
      setEditModeCallback(false), [setEditModeCallback])
   const onDoubleClickHandler = useCallback(() =>
      setEditModeCallback(true), [setEditModeCallback])
   const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
      onChangeTextTitle(e.currentTarget.value), [onChangeTextTitle])
   const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) =>
   e.key === "Enter" && setEditModeCallback(false), [setEditModeCallback])

   return (
      <div>
         {
            editMode
               ? <TextField
                  autoFocus
                  value={value}
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  onKeyPress={onKeyPressHandler}
                  id="standard-basic" size={"small"}
               />
               : <Typography
                  gutterBottom
                  variant={variant}
                  onDoubleClick={onDoubleClickHandler}
               >
                  {value}
               </Typography>
         }
      </div>
   )
})

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

