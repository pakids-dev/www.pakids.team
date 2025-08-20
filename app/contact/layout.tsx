import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/contact",
    languages: {
      "ko-KR": "/contact",
      "en-US": "/en/contact",
    },
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}


