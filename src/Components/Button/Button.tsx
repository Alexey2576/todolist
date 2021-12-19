import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
   error?: boolean
   errorButton?: string
}

const Button: React.FC<ButtonPropsType> = (
   {
      error,
      className,
      errorButton,
      ...restProps
   }
) => {
   const finalClassName = error ? `${className} ${errorButton}` : className

   return (
      <button
         className={finalClassName}
         {...restProps}
      />
   )
}

export default Button