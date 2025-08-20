import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Pakids",
  description: "Get in touch with Pakids. Let's make magic happen.",
  alternates: {
    canonical: "/en/contact",
    languages: {
      "en-US": "/en/contact",
      "ko-KR": "/contact",
    },
  },
}

export default function ContactPageEn() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 py-12 mt-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Let's make magic happen
              </h1>
              <div className="space-y-8">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-300 mb-2">Prefer a call?</h3>
                  <a href="tel:+821032554653" className="text-lg sm:text-xl hover:text-[#1a237e] transition-colors break-all">
                    +82 10 3255-4653
                  </a>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-300 mb-2">Drop us a line at</h3>
                  <a href="mailto:contact@pakids.team" className="text-lg sm:text-xl hover:text-[#1a237e] transition-colors break-all">
                    contact@pakids.team
                  </a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


