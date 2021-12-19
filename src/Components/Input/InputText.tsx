import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string
   errorInputClassName?: string
   errorSpanClassName?: string
   label?: string
}

const InputText: React.FC<InputTextPropsType> = (
   {
      type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
      onChange, onChangeText,
      onKeyPress, onEnter,
      error,
      className,
      spanClassName,
      errorInputClassName,
      errorSpanClassName,
      label,

      ...restProps
   }
) => {
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange
      && onChange(e)

      onChangeText
      && onChangeText(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress(e);

      onEnter
      && e.key === 'Enter'
      && onEnter()
   }

   const finalSpanClassName = error ? `${errorSpanClassName} ${spanClassName}` : spanClassName
   const finalInputClassName = error ? `${errorInputClassName} ${className}` : className

   return (
      <div>
         <input
            type={'text'}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={finalInputClassName}
            required
            {...restProps}
         />
         {error && <span className={finalSpanClassName}>{error}</span>}
      </div>
   )
}

export default InputText
