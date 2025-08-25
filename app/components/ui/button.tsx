import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium " +
        "hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " + className
      }
      {...props}
    />
  );
}

export default Button;
