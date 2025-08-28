import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnimatedBackground } from "@/components/animated-background"
import { ServicesSection } from "@/components/services-section"
import { CollaborateSection } from "@/components/collaborate-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import Script from "next/script"

export default function Home() {
  return (
    <>
      <Script
        id="homepage-website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "파키즈",
            "url": "https://www.pakids.team/"
          })
        }}
      />
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
    </>
  )
}
