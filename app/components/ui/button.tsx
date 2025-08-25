import * as React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        "border border-black/10 hover:border-black/20 focus:outline-none focus:ring-2 focus:ring-black/30 " +
        className
      }
      {...props}
    />
  );
}
