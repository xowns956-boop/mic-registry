"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MoonIcon, SearchIcon, SparklesIcon, SunIcon } from "lucide-react"

import { PageHeading } from "@/components/blocks/page-heading"
import { SiteHeader } from "@/components/blocks/site-header"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import pkg from "../package.json"
import { BatchAdded } from "./_preview/batch-added"
import { BatchDisplay } from "./_preview/batch-display"
import { BatchForms } from "./_preview/batch-forms"
import { BatchRest } from "./_preview/batch-rest"
import { PreviewSearch, PreviewSidebar } from "./_preview/preview-nav"

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  // 페이지 안의 Command 예시(cmdk)가 마운트될 때 첫 항목을 보이려고 창을 끌어내린다(cmdk 기본 동작).
  // cmdk가 스크롤을 마친 다음 프레임에 맨 위(또는 주소의 #부품)로 되돌린다.
  React.useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    const t = setTimeout(() => {
      const el = id ? document.getElementById(id) : null
      if (el) el.scrollIntoView({ block: "start" })
      else window.scrollTo(0, 0)
    }, 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <SidebarProvider>
      <PreviewSidebar version={pkg.version} />
      <SidebarInset className="bg-page-background">
        <SiteHeader
          className="sticky top-0 z-10"
          showHome={false}
          crumbs={[{ label: "부품 미리보기" }]}
          searchPlaceholder="부품 검색"
          onSearchSubmit={(q) => {
            setQuery(q)
            setSearchOpen(true)
          }}
          actions={
            <>
              <Button variant="ghost" asChild>
                <Link href="/docs/changelog">변경 기록</Link>
              </Button>
              <Button asChild>
                <Link href="/docs/ai">
                  <SparklesIcon aria-hidden />
                  AI로 설치하기
                </Link>
              </Button>
            </>
          }
          iconButtons={
            <>
              {/* 좁은 화면에서는 검색칸이 숨으므로 아이콘으로 연다 */}
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="부품 검색" onClick={() => setSearchOpen(true)}>
                <SearchIcon aria-hidden />
              </Button>
              <Button variant="ghost" size="icon" aria-label="테마 전환" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
                <SunIcon className="dark:hidden" aria-hidden />
                <MoonIcon className="hidden dark:block" aria-hidden />
              </Button>
            </>
          }
        />
        <div className="mx-auto flex w-full max-w-layout flex-col gap-6 p-6">
          <PageHeading title={`Mic Design System ${pkg.version}`} description="Figma Mic v0.1 부품을 코드로 옮긴 미리보기" />
          <BatchForms />
          <BatchDisplay />
          <BatchRest />
          <BatchAdded />
        </div>
      </SidebarInset>
      <PreviewSearch open={searchOpen} onOpenChange={setSearchOpen} query={query} onQueryChange={setQuery} />
    </SidebarProvider>
  )
}
