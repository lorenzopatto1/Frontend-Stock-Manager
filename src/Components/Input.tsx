import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: string;
  error?: FieldError | null;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({name, children, error = null, ...rest}, ref) => {

  return (
    <>
      {children && <label htmlFor={name} className="block text-sm font-bold leading-6">{children}</label>}
      <input className="block w-full rounded-md bg-zinc-300 dark:bg-[#09090A] p-4 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-black dark:placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 hover:ring-indigo-600 sm:text-sm sm:leading-6 selection:bg-indigo-600" name={name} id={name} autoCorrect="off" autoComplete="off" ref={ref} {...rest} />

      {!!error && <span className="text-red-600 font-bold" >*{error.message}*</span>}
    </>
  )
}

export const Input = forwardRef(InputBase);