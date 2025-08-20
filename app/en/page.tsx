import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnimatedBackground } from "@/components/animated-background"
import { ServicesSection } from "@/components/services-section"
import { CollaborateSection } from "@/components/collaborate-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pakids - Creative Agency",
  description: "파키즈: 당신의 비전, 우리의 기술 | Pakids: Your Vision, Our Technology",
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "ko-KR": "/",
    },
  },
  openGraph: {
    title: "파키즈 | Pakids - Creative Agency",
    description: "Pakids: Your Vision, Our Technology | 파키즈: 당신의 비전, 우리의 기술",
    url: "https://www.pakids.team/en",
    siteName: "Pakids",
    images: [
      {
        url: "https://s3.us-east-2.amazonaws.com/cdn.pakids.team/pakids-logo-navy-white.jpg",
        width: 1200,
        height: 630,
        alt: "파키즈 | Pakids - Creative Agency",
      },
    ],
    locale: "en_US",
    alternateLocale: "ko_KR",
    type: "website",
  },
}

export default function HomeEn() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ServicesSection />
        <CollaborateSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}


