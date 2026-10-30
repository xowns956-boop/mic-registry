"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import { cn } from "cn"
import * as ResizablePrimitive from "react-resizable-panels"

// Mic · Resizable — ResizablePanelGroup direction: horizontal·vertical / ResizableHandle withHandle
// direction=horizontal은 좌우 칸 사이 세로 막대, vertical은 위아래 칸 사이 가로 막대 (막대 방향은 묶음을 따라감)
function ResizablePanelGroup({
  className,
  direction = "horizontal",
  ...props
}: Omit<ResizablePrimitive.GroupProps, "orientation"> & {
  direction?: "horizontal" | "vertical"
}) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      data-direction={direction}
      orientation={direction}
      className={cn(
        "flex h-full w-full data-[direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-3 focus-visible:ring-alpha-ring-50 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border border-border bg-border">
          <GripVerticalIcon className="size-2.5 text-foreground" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
