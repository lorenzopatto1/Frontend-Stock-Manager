import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: string;
  error?: FieldError | null;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({name, children, error = null, ...rest}, ref) => {

  return (
    <div className="transition-all group focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 p-3 relative flex-col">
      {children && <label htmlFor={name} className="font-bold rounded-md absolute group-focus-within:text-indigo-500 -top-4 px-2 bg-gray-900">{children}</label>}
      <input className="bg-gray-900 p-4 rounded-md ring-1 transition-all focus:ring-indigo-500 group-focus-within:ring-indigo-500 ring-zinc-500" name={name} id={name} placeholder={children} autoCorrect="off" autoComplete="new-password" ref={ref} {...rest} />

      {!!error && <span className="text-red-600 font-bold" >*{error.message}*</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase);