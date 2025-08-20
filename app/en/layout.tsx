import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pakids.team"),
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "ko-KR": "/",
    },
  },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children
}


