import { cn } from "@/lib/utils";

export function OutlinedIcon(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...rest } = props

  return (
  <div
    className={cn(
      "select-none p-1 no-underline rounded-md border-1 bg-white",
      className
    )}
    aria-roledescription="Icon container"
    {...rest}
  >
    {children}
  </div>
  )
}
OutlinedIcon.displayName = "OutlinedIcon"