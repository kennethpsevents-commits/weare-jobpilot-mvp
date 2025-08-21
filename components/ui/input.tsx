import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props }, ref
){
  return (
    <input
      ref={ref}
      className={clsx("w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand", className)}
      {...props}
    />
  );
});
