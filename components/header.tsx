"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-context"

export function Header() {
  const { language, t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <meta name="naver-site-verification" content="72af39a02a8630ae797d64eb1f88d67f251a0489" />
  <div className="flex items-center">
    <Link href="/">
      <div className="cursor-pointer">
        <Image
          src="/pakids-symbol-logo.png"
          alt="파키즈 로고 - Pakids"
          width={150}
          height={100}
          className="transition-transform duration-300 hover:scale-125"
        />
      </div>
    </Link>
  </div>

      <nav className="hidden md:flex items-center space-x-8"></nav>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/"
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "ko" ? "bg-[#1a237e] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            KR
          </Link>
          <Link
            href="/en"
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "en" ? "bg-[#1a237e] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            EN
          </Link>
        </div>
        <Link href="/contact">
          <Button className="bg-transparent hover:bg-gray-800 text-white px-6">
            {t("contact")} →
          </Button>
        </Link>
      </div>
    </header>
  )
}