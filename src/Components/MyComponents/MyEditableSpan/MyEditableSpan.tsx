import React, {ChangeEvent, KeyboardEvent, useState} from 'react'


type EditableSpanType = {
   value: string
   onChangeTextTitle: (value: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = (
   {
      value,
      onChangeTextTitle
   }
) => {
   const [editMode, setEditMode] = useState<boolean>(false)

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && setEditMode(false)
   const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => setEditMode(false)
   const onDoubleClickHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => setEditMode(true)
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => onChangeTextTitle(e.currentTarget.value)
   return (
      <>
         {editMode
            ? <input type="text"
                     autoFocus
                     value={value}
                     onChange={onChangeHandler}
                     onBlur={onBlurHandler}
                     onKeyPress={onKeyPressHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{value}</span>
         }
      </>
   )
}
