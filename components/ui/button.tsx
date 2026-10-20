import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Mic v0.1 · Figma "- Buttons › Button" (9:458)
// variant: default·destructive·outline·secondary·ghost·link / size: default·sm·lg·icon
// xs·icon-sm은 Figma에 없는 크기 — 다른 부품(입력 그룹·대화상자 닫기 등) 안에서만 쓴다.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-alpha-destructive-20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-alpha-primary-90",
        destructive:
          "bg-alpha-destructive-solid text-destructive-foreground shadow-xs hover:bg-alpha-destructive-90",
        outline:
          "border-border bg-alpha-outline text-foreground shadow-xs hover:bg-alpha-outline-hover hover:text-accent-foreground focus-visible:border-ring aria-expanded:bg-alpha-outline-hover",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-alpha-secondary-80",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent",
        link: "text-primary-text underline-offset-4",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        xs: "h-6 gap-1 rounded-xs px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
