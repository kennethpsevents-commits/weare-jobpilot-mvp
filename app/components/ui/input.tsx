import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={
        "block w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 " + className
      }
      {...props}
    />
  );
}

export default Input;
