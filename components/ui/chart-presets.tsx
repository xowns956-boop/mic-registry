"use client"

import * as React from "react"
import { cn } from "cn"
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, RadialBar, RadialBarChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// Mic · 예시 차트 (Bar · Line · Pie · BarGradient · BarItem · BarLabeled · Combo · Radial)
// 색은 config의 color에 var(--chart-1) 같은 토큰을 넣는다. 눈금 글자는 text-xs muted-foreground, 격자선은 border.

type Row = Record<string, string | number>

const axisTick = { fontSize: 12, fill: "var(--muted-foreground)" }

function ChartBar({ data, config, xKey, className }: { data: Row[]; config: ChartConfig; xKey: string; className?: string }) {
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-63 w-full", className)}>
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisTick} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(config).map((k) => (
          <Bar key={k} dataKey={k} fill={`var(--color-${k})`} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

function ChartLine({ data, config, xKey, className }: { data: Row[]; config: ChartConfig; xKey: string; className?: string }) {
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-63 w-full", className)}>
      <LineChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisTick} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(config).map((k) => (
          <Line key={k} dataKey={k} type="monotone" stroke={`var(--color-${k})`} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ChartContainer>
  )
}

function ChartPie({
  data,
  config,
  nameKey = "name",
  valueKey = "value",
  className,
}: {
  data: Row[]
  config: ChartConfig
  nameKey?: string
  valueKey?: string
  className?: string
}) {
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-47 w-42", className)}>
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey={nameKey} />} />
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} outerRadius={80} stroke="var(--card)" strokeWidth={2}>
          {data.map((d) => (
            <Cell key={String(d[nameKey])} fill={`var(--color-${d[nameKey]})`} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
      </PieChart>
    </ChartContainer>
  )
}

// 막대 그라데이션: 위 chart-1-bold → 아래 chart-1-subtler
function ChartBarGradient({
  data,
  xKey,
  yKey,
  label = yKey,
  className,
}: {
  data: Row[]
  xKey: string
  yKey: string
  label?: string
  className?: string
}) {
  const id = React.useId().replace(/:/g, "")
  const config = { [yKey]: { label, color: "var(--chart-1-bold)" } } satisfies ChartConfig
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-48 w-full", className)}>
      <BarChart data={data} accessibilityLayer>
        <defs>
          <linearGradient id={`bar-gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1-bold)" />
            <stop offset="100%" stopColor="var(--chart-1-subtler)" />
          </linearGradient>
        </defs>
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisTick} />
        <YAxis tickLine={false} axisLine={false} width={36} tick={axisTick} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={yKey} fill={`url(#bar-gradient-${id})`} radius={[4, 4, 0, 0]} maxBarSize={38} />
      </BarChart>
    </ChartContainer>
  )
}

// 막대 하나: 위 값(primary-text) · 막대(chart-1, 72px 폭, 위 둥글기 md) · 아래 이름
function ChartBarItem({
  label,
  valueText,
  ratio,
  className,
}: {
  label: React.ReactNode
  valueText: React.ReactNode
  /** 0~1, 가장 큰 값 대비 높이 */
  ratio: number
  className?: string
}) {
  return (
    <div data-slot="chart-bar-item" className={cn("flex w-24 flex-col items-center gap-2", className)}>
      <span className="text-sm font-semibold text-primary-text tabular-nums">{valueText}</span>
      <div className="flex h-30 w-18 items-end">
        <div
          className="h-(--bar-h) w-full rounded-t-md bg-chart-1"
          style={{ "--bar-h": `${Math.max(0, Math.min(1, ratio)) * 100}%` } as React.CSSProperties}
        />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}

function ChartBarLabeled({
  items,
  formatValue = (v) => v.toLocaleString("ko-KR"),
  className,
}: {
  items: { label: string; value: number; valueText?: React.ReactNode }[]
  formatValue?: (v: number) => React.ReactNode
  className?: string
}) {
  const max = Math.max(1, ...items.map((i) => i.value))
  return (
    <div data-slot="chart-bar-labeled" role="img" aria-label={items.map((i) => `${i.label} ${i.value}`).join(", ")} className={cn("flex items-end gap-4", className)}>
      {items.map((i) => (
        <ChartBarItem key={i.label} label={i.label} valueText={i.valueText ?? formatValue(i.value)} ratio={i.value / max} />
      ))}
    </div>
  )
}

// 막대(chart-1, 48px, 위 둥글기 10) + 점선(chart-3, 흰 속 점 12px, 값 라벨 chart-3-bolder)
function ChartCombo({
  data,
  xKey,
  barKey,
  lineKey,
  barLabel = barKey,
  lineLabel = lineKey,
  formatLine = (v: number) => `${v}%`,
  className,
}: {
  data: Row[]
  xKey: string
  barKey: string
  lineKey: string
  barLabel?: string
  lineLabel?: string
  formatLine?: (v: number) => string
  className?: string
}) {
  const config = {
    [barKey]: { label: barLabel, color: "var(--chart-1)" },
    [lineKey]: { label: lineLabel, color: "var(--chart-3)" },
  } satisfies ChartConfig
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-57 w-full", className)}>
      <ComposedChart data={data} accessibilityLayer margin={{ top: 24 }}>
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 14, fontWeight: 500, fill: "var(--foreground)" }} />
        <YAxis yAxisId="bar" hide />
        <YAxis yAxisId="line" orientation="right" hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="bar" dataKey={barKey} fill={`var(--color-${barKey})`} radius={[10, 10, 0, 0]} maxBarSize={48} />
        <Line
          yAxisId="line"
          dataKey={lineKey}
          stroke={`var(--color-${lineKey})`}
          strokeWidth={2}
          dot={{ r: 5, fill: "var(--card)", stroke: `var(--color-${lineKey})`, strokeWidth: 2 }}
        >
          <LabelList dataKey={lineKey} position="top" offset={10} formatter={(v) => formatLine(Number(v))} className="fill-chart-3-bolder text-xs font-semibold" />
        </Line>
      </ComposedChart>
    </ChartContainer>
  )
}

// 링 도넛(달성률): 바깥→안 링, 12시에서 시계 방향, 바탕 링 secondary. 값은 0~100(%)
// size=default: 160, 링 3개까지(두께 12 · 간격 4) + 가운데 caption·value / sm: 72, 링 1개(두께 7) + 가운데 value
// tone=default: chart-1·2·3 / metric: chart-operation·performance·quality (sm은 chart-production)
// legend: 오른쪽 세로 범례(색 8px + "이름 : 값%")
const radialTones = {
  default: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"],
  metric: ["var(--chart-operation)", "var(--chart-performance)", "var(--chart-quality)"],
}

function ChartRadial({
  data,
  tone = "default",
  size = "default",
  caption,
  valueText,
  legend = false,
  formatValue = (v) => `${v}%`,
  className,
}: {
  /** 바깥 링부터. value는 0~100 */
  data: { label: string; value: number }[]
  tone?: "default" | "metric"
  size?: "default" | "sm"
  caption?: React.ReactNode
  valueText?: React.ReactNode
  legend?: boolean
  formatValue?: (v: number) => React.ReactNode
  className?: string
}) {
  const sm = size === "sm"
  const rings = data.slice(0, sm ? 1 : 3)
  const colors = sm && tone === "metric" ? ["var(--chart-production)"] : radialTones[tone]
  const box = sm ? 72 : 160
  const thick = sm ? 7 : 12
  const band = thick + 4
  // recharts는 첫 줄을 가장 안쪽에 그리므로 뒤집어 넣는다. 링 하나당 band 칸, 막대는 칸 가운데 thick 두께
  const rows = rings.map((r, i) => ({ ...r, fill: colors[i] })).reverse()
  const outer = box / 2 + (band - thick) / 2
  const inner = outer - band * rows.length
  const config = Object.fromEntries(rings.map((r, i) => [r.label, { label: r.label, color: colors[i] }])) satisfies ChartConfig

  const chart = (
    <div className={cn("relative shrink-0", sm ? "size-18" : "size-40")}>
      <ChartContainer config={config} className="aspect-square size-full">
        <RadialBarChart
          data={rows}
          startAngle={90}
          endAngle={-270}
          innerRadius={inner}
          outerRadius={outer}
          barSize={thick}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          accessibilityLayer
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="label" />} />
          {/* 처음 그릴 때 0에서 값까지 링이 차오른다(원형 차트와 같게 0.4초 뒤 1.5초 ease). 움직임 줄이기 설정이면 바로 그린다 */}
          <RadialBar dataKey="value" background={{ fill: "var(--secondary)" }} isAnimationActive="auto" animationBegin={400} animationDuration={1500} animationEasing="ease" />
        </RadialBarChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center whitespace-nowrap">
        {!sm && caption != null && <span className="text-xs font-medium text-muted-foreground">{caption}</span>}
        {valueText != null && (
          <span
            className={cn(
              "font-semibold tabular-nums",
              sm ? "text-sm" : "text-xl text-primary-text",
              sm && (tone === "metric" ? "text-chart-production" : "text-chart-1")
            )}
          >
            {valueText}
          </span>
        )}
      </div>
    </div>
  )

  if (!legend) return <div data-slot="chart-radial" className={className}>{chart}</div>
  return (
    <div data-slot="chart-radial" className={cn("flex items-center justify-between gap-4", className)}>
      {chart}
      <ul className="flex flex-col gap-3">
        {rings.map((r, i) => (
          <li key={r.label} className="flex items-center gap-1.5 text-sm text-foreground">
            <span className="size-2 shrink-0 rounded-[2px] bg-(--legend-color)" style={{ "--legend-color": colors[i] } as React.CSSProperties} />
            {r.label} : {formatValue(r.value)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ChartBar, ChartLine, ChartPie, ChartBarGradient, ChartBarItem, ChartBarLabeled, ChartCombo, ChartRadial }
