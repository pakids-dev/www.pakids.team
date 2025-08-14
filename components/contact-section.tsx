"use client"

import { useLanguage } from "./language-context"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section className="text-white py-12 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">{t("email")}:</span>
            <a href="mailto:contact@pakids.team" className="text-white hover:text-[#1a237e] transition-colors">
              contact@pakids.team
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">{t("phone")}:</span>
            <a href="tel:+82-3255-4653" className="text-white hover:text-[#1a237e] transition-colors">
              +82 010-3255-4653
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">{t("address")}:</span>
            <span className="text-white">전북특별자치도 전주시 완산구 중산중앙로 21, 3층 302-337호(중화산동2가)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
