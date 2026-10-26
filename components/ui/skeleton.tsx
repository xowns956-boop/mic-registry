import { cn } from "cn"

// Mic · Skeleton
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-secondary-hover", className)}
      {...props}
    />
  )
}

export { Skeleton }
