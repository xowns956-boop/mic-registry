"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BatchDisplay } from "./_preview/batch-display"
import { BatchForms } from "./_preview/batch-forms"

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <main className="mx-auto flex w-full max-w-layout flex-col gap-6 px-4 py-10 sm:px-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Mic Design System v0.1</h1>
          <p className="text-sm text-muted-foreground">Figma 부품을 코드로 옮긴 미리보기</p>
        </div>
        <Button variant="outline" size="icon" aria-label="테마 전환" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
          <SunIcon className="dark:hidden" aria-hidden />
          <MoonIcon className="hidden dark:block" aria-hidden />
        </Button>
      </header>
      <BatchForms />
      <BatchDisplay />
    </main>
  )
}
