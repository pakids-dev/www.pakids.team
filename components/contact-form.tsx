"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-context"

export function ContactForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    privacyPolicy: false,
    termsConditions: false,
  })

  const translations = {
    ko: {
      title: "연락처 정보를 입력해주세요",
      fields: {
        name: "회사명/담당자명",
        email: "이메일",
        phone: "연락처",
        service: "만들고 싶은 서비스",
      },
      placeholders: {
        name: "ex)pakids/홍길동",
        email: "ex)contact@pakids.team",
        phone: "ex)010-1234-1234",
        service: "ex)일정 계획 플랫폼을 만들고 싶어요",
      },
      privacy: "개인정보 수집 및 이용에 동의합니다.",
      submit: "문의하기->",
      footer: {
        startProject: "프로젝트 시작",
        partnerWithUs: "파트너십 문의",
      },
    },
    en: {
      title: "Enter your contact details",
      fields: {
        name: "Company/Name",
        email: "Email",
        phone: "Phone",
        service: "Service you want to create",
      },
      placeholders: {
        name: "ex)pakids/John Doe",
        email: "ex)contact@pakids.team",
        phone: "ex)010-1234-1234",
        service: "ex)I want to create a schedule planning platform",
      },
      privacy: "I agree to the collection and use of personal information.",
      submit: "Send message->",
      footer: {
        startProject: "Start a project",
        partnerWithUs: "Partner with us",
      },
    },
  }

  const t = translations[language]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="bg-gradient-to-br from-black/95 via-black/85 to-[#0a0f0a]/90 backdrop-blur-xl rounded-2xl p-8 border border-[#1a237e]/20 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-8">{t.title}</h2>

      <form 
        action="https://formspree.io/f/mnnzrjpz"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.fields.name} <span className="text-[#1a237e]">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gradient-to-r from-black/90 via-[#0a0f0a]/70 to-black/90 border border-[#1a237e]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1a237e] focus:shadow-[0_0_25px_rgba(26,35,126,0.2)] transition-all duration-300"
            placeholder={t.placeholders.name}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t.fields.email} <span className="text-[#1a237e]">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gradient-to-r from-black/90 via-[#0a0f0a]/70 to-black/90 border border-[#1a237e]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1a237e] focus:shadow-[0_0_25px_rgba(26,35,126,0.2)] transition-all duration-300"
              placeholder={t.placeholders.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t.fields.phone} <span className="text-[#1a237e]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gradient-to-r from-black/90 via-[#0a0f0a]/70 to-black/90 border border-[#1a237e]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1a237e] focus:shadow-[0_0_25px_rgba(26,35,126,0.2)] transition-all duration-300"
              placeholder={t.placeholders.phone}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">{t.fields.service}</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-gradient-to-r from-black/90 via-[#0a0f0a]/70 to-black/90 border border-[#1a237e]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1a237e] focus:shadow-[0_0_25px_rgba(26,35,126,0.2)] transition-all duration-300"
            placeholder={t.placeholders.service}
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 text-[#1a237e] bg-black border-[#1a237e]/50 rounded focus:ring-[#1a237e] focus:ring-2"
            />
            <span className="text-sm text-gray-300">{t.privacy}</span>
          </label>
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-black/80 via-[#1a237e]/15 to-black/80 border border-[#1a237e] text-[#1a237e] hover:bg-gradient-to-r hover:from-[#1a237e]/30 hover:via-[#1a237e]/40 hover:to-[#1a237e]/30 hover:text-white hover:shadow-[0_0_35px_rgba(26,35,126,0.4)] transition-all duration-300 py-3 px-8 rounded-full font-medium inline-flex items-center gap-2"
        >
          {t.submit}
        </Button>
      </form>

      <div className="mt-12 pt-8 border-t border-[#1a237e]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-sm text-gray-400 mb-2">{t.footer.startProject}</p>
            <a href="mailto:contact@pakids.team" className="text-white hover:text-[#1a237e] transition-colors">
              contact@pakids.team
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">{t.footer.partnerWithUs}</p>
            <a href="mailto:contact@pakids.team" className="text-white hover:text-[#1a237e] transition-colors">
              contact@pakids.team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}