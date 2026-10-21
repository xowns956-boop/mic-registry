"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { MoonIcon, SparklesIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import pkg from "../package.json"
import { BatchAdded } from "./_preview/batch-added"
import { BatchDisplay } from "./_preview/batch-display"
import { BatchForms } from "./_preview/batch-forms"
import { BatchRest } from "./_preview/batch-rest"

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <main className="mx-auto flex w-full max-w-layout flex-col gap-6 px-4 py-10 sm:px-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Mic Design System {pkg.version}</h1>
          <p className="text-sm text-muted-foreground">Figma Mic v0.1 부품을 코드로 옮긴 미리보기</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/docs/changelog">변경 기록</Link>
          </Button>
          <Button asChild>
            <Link href="/docs/ai">
              <SparklesIcon aria-hidden />
              AI로 설치하기
            </Link>
          </Button>
          <Button variant="outline" size="icon" aria-label="테마 전환" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            <SunIcon className="dark:hidden" aria-hidden />
            <MoonIcon className="hidden dark:block" aria-hidden />
          </Button>
        </div>
      </header>
      <BatchForms />
      <BatchDisplay />
      <BatchRest />
      <BatchAdded />
    </main>
  )
}
