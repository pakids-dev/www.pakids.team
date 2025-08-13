"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-context"
import { useState } from "react"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
      <div className="flex items-center">
        <Link href="/">
          <div
            className="cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src="/pakids-symbol-logo.png"
              alt="Pakids"
              width={150}
              height={100}
              className={`transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/pakids-text-logo.png"
              alt="Pakids"
              width={150}
              height={100}
              className={`absolute top-0 left-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-8"></nav>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => setLanguage("ko")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "ko" ? "bg-[#1a237e] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            KO
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === "en" ? "bg-[#1a237e] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            EN
          </button>
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