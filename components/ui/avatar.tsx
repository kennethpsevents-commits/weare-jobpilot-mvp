import Image from "next/image";
import { HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Avatar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("h-12 w-12 rounded-full overflow-hidden", className)} {...props} />;
}
export function AvatarImage({ src, alt }: { src: string; alt?: string }) {
  return <Image src={src} alt={alt || ""} width={48} height={48} />;
}
