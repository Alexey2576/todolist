import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState} from 'react'
import MyInputText from "../MyInput/MyInputText";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type EditableSpanType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string

   spanProps?: DefaultSpanPropsType // пропсы для спана
}

const MyEditableSpan: React.FC<EditableSpanType> = (
   {
      autoFocus, // игнорировать изменение этого пропса
      onBlur,
      onEnter,
      spanProps,

      ...restProps// все остальные пропсы попадут в объект restProps
   }
) => {
   const [editMode, setEditMode] = useState<boolean>(false)
   const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

   const onEnterCallback = () => {
      setEditMode(false)

      onEnter && onEnter()
   }
   const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setEditMode(false)

      onBlur && onBlur(e)
   }
   const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setEditMode(true)

      onDoubleClick && onDoubleClick(e)
   }

   const spanClassName = `${restProps.className} ${className}`

   return (
      <>
         {editMode
            ? (
               <MyInputText autoFocus
                            onBlur={onBlurHandler}
                            onEnter={onEnterCallback}
                            className={restProps.className}
                            spanClassName={restProps.spanClassName}
                            {...restProps}/>)
            : (
               <span onDoubleClick={onDoubleClickCallBack}
                     className={spanClassName}

                     {...restSpanProps} >
                  {children}
                  {/*если нет захадкодженного текста для спана, то значение инпута*/}
                  {children || restProps.value}
                    </span>)
         }
      </>
   )
}

export default MyEditableSpan
