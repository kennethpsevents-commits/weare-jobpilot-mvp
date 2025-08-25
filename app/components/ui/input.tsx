import * as React from "react";
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={
        "block w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/30 " +
        className
      }
      {...props}
    />
  );
}
