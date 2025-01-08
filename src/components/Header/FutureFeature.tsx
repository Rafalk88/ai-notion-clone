import React from "react";
import { cn } from "@/lib/utils";

export const FutureFeature: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <span
      className={cn(
        "px-2 rounded-full bg-slate-200 text-xs text-gray-600",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
