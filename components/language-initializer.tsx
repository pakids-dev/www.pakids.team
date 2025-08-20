"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { LanguageProvider } from "./language-context"

export function LanguageInitializer({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const defaultLanguage = pathname && pathname.startsWith("/en") ? "en" : "ko"
  return (
    <div key={pathname}>
      <LanguageProvider defaultLanguage={defaultLanguage}>{children}</LanguageProvider>
    </div>
  )
}


