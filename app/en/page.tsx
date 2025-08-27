import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnimatedBackground } from "@/components/animated-background"
import { ServicesSection } from "@/components/services-section"
import { CollaborateSection } from "@/components/collaborate-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "파키즈 - Creative Agency | Pakids",
  description: "Pakids (파키즈) - Innovative Creative Agency. Your Vision, Our Technology | 혁신적인 크리에이티브 에이전시",
  keywords: "Pakids, 파키즈, pakids agency, 파키즈 에이전시, creative agency, 크리에이티브 에이전시, digital marketing, web development, mobile app, startup, UX/UI design, branding",
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "ko-KR": "/",
    },
  },
  openGraph: {
    title: "Pakids | 파키즈 - Creative Agency",
    description: "Pakids (파키즈) - Innovative Creative Agency. Your Vision, Our Technology | 혁신적인 크리에이티브 에이전시",
    url: "https://www.pakids.team/en",
    siteName: "Pakids | 파키즈",
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


