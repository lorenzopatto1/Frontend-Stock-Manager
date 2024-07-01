import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({name, children, ...rest}, ref) => {

  return (
    <div className="flex-1 text-xs md:text-base transition-all group hover:ring-indigo-700 dark:hover:ring-indigo-500 focus-within:ring-indigo-700 dark:focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-700 dark:ring-zinc-500 p-3 relative flex-col">
      {children && <label htmlFor={name} className="font-bold rounded-md absolute group-hover:text-indigo-700 dark:group-hover:text-indigo-500 group-focus-within:text-indigo-700 dark:group-focus-within:text-indigo-500 -top-4 px-2 bg-white dark:bg-gray-900">{children}</label>}
      <input className="font-bold dark:bg-gray-900 w-full p-4 rounded-md ring-1 transition-all group-hover:ring-indigo-700 dark:group-hover:ring-indigo-500 group-hover:text-indigo-700 dark:group-hover:text-indigo-500 focus:ring-indigo-700 dark:focus:ring-indigo-500 group-focus-within:ring-indigo-700 dark:group-focus-within:ring-indigo-500 ring-zinc-700 dark:ring-zinc-500" name={name} id={name} placeholder={children} autoCorrect="off" autoComplete="new-password" ref={ref} {...rest} />
    </div>
  )
}

export const Input = forwardRef(InputBase);