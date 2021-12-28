import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
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

export const EditableSpan: React.FC<EditableSpanType> = (
   {
      value,
      onChangeTextTitle,
      variant
   }
) => {
   const [editMode, setEditMode] = useState<boolean>(false)

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setEditMode(false)
   const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => setEditMode(false)
   const onDoubleClickHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => setEditMode(true)
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onChangeTextTitle(e.currentTarget.value)
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
}
