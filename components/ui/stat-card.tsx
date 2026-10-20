import * as React from "react"
import { cn } from "cn"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mic v0.1 · Figma "- Cards › StatCard" (38:344) — trend: up·down / Show Badge · Show Footer
// badge를 주면 오른쪽 위 배지가 보이고, summary·detail을 주면 아래 설명이 보인다.
function StatCard({
  label,
  value,
  badge,
  summary,
  detail,
  trend = "up",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Card>, "children"> & {
  label: React.ReactNode
  value: React.ReactNode
  badge?: React.ReactNode
  summary?: React.ReactNode
  detail?: React.ReactNode
  trend?: "up" | "down"
}) {
  const TrendIcon = trend === "up" ? TrendingUpIcon : TrendingDownIcon

  return (
    <Card data-slot="stat-card" data-trend={trend} className={cn("shadow-xs", className)} {...props}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">{value}</CardTitle>
        {badge && (
          <CardAction>
            <Badge variant="outline">
              <TrendIcon className="size-3" aria-hidden="true" />
              {badge}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      {(summary || detail) && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {summary && (
            <div className="flex items-center gap-2 font-medium text-card-foreground">
              {summary}
              <TrendIcon className="size-4" aria-hidden="true" />
            </div>
          )}
          {detail && <div className="text-muted-foreground">{detail}</div>}
        </CardFooter>
      )}
    </Card>
  )
}

// Mic v0.1 · Figma "- Cards › SectionCards" (38:345) — StatCard 여러 개를 한 줄에 (좁으면 줄바꿈)
function SectionCards({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-cards"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}
      {...props}
    />
  )
}

export { StatCard, SectionCards }
