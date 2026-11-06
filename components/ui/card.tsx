import * as React from "react"
import { cn } from "cn"

// Mic · Card — 테두리 + shadow-sm, 둥글기 xl(16), 안쪽 여백 24
// state: default(바탕 card) · selected(바탕 accent, 고른 카드 표시)
// interactive: 카드 전체를 누르는 경우만 켬 → hover(테두리 ring) · pressed(바탕 accent-active) · focus(테두리 ring + 링 3px)
function Card({
  className,
  size = "default",
  state = "default",
  interactive = false,
  onKeyDown,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  state?: "default" | "selected"
  interactive?: boolean
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-state={state}
      data-interactive={interactive || undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              onKeyDown?.(e)
              if (!e.defaultPrevented && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault()
                e.currentTarget.click()
              }
            }
          : onKeyDown
      }
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground shadow-sm [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] data-[state=selected]:bg-accent *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        "data-interactive:cursor-pointer data-interactive:transition-colors data-interactive:outline-none data-interactive:hover:border-ring data-interactive:active:bg-accent-active data-interactive:focus-visible:border-ring data-interactive:focus-visible:ring-3 data-interactive:focus-visible:ring-alpha-ring-50",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base font-semibold text-card-foreground group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
