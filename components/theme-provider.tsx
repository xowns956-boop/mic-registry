"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Mic v0.1 · 라이트·다크 두 모드 (Figma 2_Semantic · Color: Light | Dark)
// 기본값은 시스템 설정을 따른다. 다크는 <html class="dark">.
function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
