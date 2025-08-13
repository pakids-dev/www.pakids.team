"use client"

import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { ContactForm } from "@/components/contact-form"
import { useLanguage } from "@/components/language-context"

export default function ContactPage() {
  const { language } = useLanguage()

  const translations = {
    ko: {
      breadcrumb: {
        home: "HOME",
        contact: "CONTACT",
      },
      title: {
        lets: ["L", "e", "t", "'", "s", " ", "m", "a", "k", "e", " ", "m", "a", "g", "i", "c"],
        happen: ["h", "a", "p", "p", "e", "n"],
      },
      contact: {
        preferCall: "전화를 원하시나요?",
        dropLine: "이메일로 연락주세요",
        dropOffice: "오피스 방문",
        address: "123 Innovation Street\nSeoul, South Korea 12345",
      },
      footer: {
        startProject: "프로젝트 시작",
        partnerWithUs: "파트너십 문의",
      },
    },
    en: {
      breadcrumb: {
        home: "HOME",
        contact: "CONTACT",
      },
      title: {
        lets: ["L", "e", "t", "'", "s", " ", "m", "a", "k", "e", " ", "m", "a", "g", "i", "c"],
        happen: ["h", "a", "p", "p", "e", "n"],
      },
      contact: {
        preferCall: "Prefer a call?",
        dropLine: "Drop us a line at",
        dropOffice: "Drop by our office",
        address: "123 Innovation Street\nSeoul, South Korea 12345",
      },
      footer: {
        startProject: "Start a project",
        partnerWithUs: "Partner with us",
      },
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-6 py-12">
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-16">
            <a href="/" className="hover:text-white transition-colors">
              {t.breadcrumb.home}
            </a>
            <span>{">"}</span>
            <span className="text-white">{t.breadcrumb.contact}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <div className="overflow-hidden">
                  <div className="flex flex-wrap">
                    {t.title.lets.map((char, index) => (
                      <span
                        key={index}
                        className={`inline-block bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal ${
                          char === " " ? "w-4" : ""
                        }`}
                        style={{
                          backgroundSize: "200% 100%",
                          backgroundPosition: `${index * 10}% 0%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>
                <br />
                <div className="overflow-hidden">
                  <div className="flex flex-wrap">
                    {t.title.happen.map((char, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                        style={{
                          backgroundSize: "200% 100%",
                          backgroundPosition: `${(index + 16) * 10}% 0%`,
                          animationDelay: `${(index + 16) * 0.1}s`,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </h1>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">{t.contact.preferCall}</h3>
                  <a href="tel:+821012345678" className="text-xl hover:text-[#1a237e] transition-colors">
                    +82 10 3255-4653
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">{t.contact.dropLine}</h3>
                  <a href="mailto:hello@pakids.com" className="text-xl hover:text-[#1a237e] transition-colors">
                    contact@pakids.team
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">{t.contact.dropOffice}</h3>
                  <p className="text-xl text-gray-300">
                    {t.contact.address.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index === 0 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="mt-24 flex flex-wrap gap-8 justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">{t.footer.startProject}</p>
              <a
                href="mailto:hello@pakids.com"
                className="text-sm bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                contact@pakids.team
              </a>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">{t.footer.partnerWithUs}</p>
              <a
                href="mailto:partner@pakids.com"
                className="text-sm bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                contact@pakids.team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
