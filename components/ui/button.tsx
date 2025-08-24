import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"outline" };

export function Button({ className, variant="outline", ...props }: Props) {
  const base = "btn";
  const map = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    outline: "btn-outline"
  } as const;
  return <button className={clsx(base, map[variant], className)} {...props} />;
}
I 
