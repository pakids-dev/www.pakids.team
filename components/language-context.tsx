"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "ko" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ko: {
    // Header
    contact: "문의하기",

    // Hero Section
    ux_ui_dev: "UX/UI & DEV",
    creative_agency: "Your Vision, Our Technology",
    hero_description:"파키즈는 혁신적인 솔루션으로 아이디어를 현실로 이끄는 당신의 든든한 파트너가 되겠습니다.\n작은 아이디어부터 큰 꿈까지, 디지털 세상에서 당신만의 특별한 이야기를 만들어가겠습니다.",
    start_project: "Start a project",

    // Services Section
    our_services: "Our Services",
    learn_more: "Learn more",
    product_design: "Product Design",
    ux_ui_design: "UX/UI Design",
    mobile_applications: "Mobile Applications",
    development: "Development",

    // Collaborate Section
    lets_collaborate: "LET'S COLLABORATE",
    start_project_email: "Start a project",
    partner_with_us: "Partner with us",
    work_with_us: "Work with us",

    // Contact Page
    lets_make_magic: "Let's make magic happen",
    prefer_call: "Prefer a call?",
    drop_line: "Drop us a line at",
    drop_office: "Drop by our office",
    enter_contact_details: "Enter your contact details",
    your_name: "Your name",
    your_email: "Your email",
    your_phone: "Your phone",
    company_project_name: "Company name / project name",
    privacy_policy_agree: "I have read & I agree with the privacy policy",
    terms_conditions_agree: "I have read & I agree with the terms & conditions",
    send_message: "Send message",

    // Contact Section
    email: "Email",
    phone: "Phone",
    address: "Address",
  },
  en: {
    // Header
    contact: "Contact Us",

    // Hero Section
    ux_ui_dev: "UX/UI & DEV",
    creative_agency: "Your Vision, Our Technology",
    hero_description:
      "Pakids crafts innovative web and mobile solutions that transform brands and captivate audiences. We're the strategic partner that brings your digital vision to life.",
    start_project: "Start a project",

    // Services Section
    our_services: "Our Services",
    learn_more: "Learn more",
    product_design: "Product Design",
    ux_ui_design: "UX/UI Design",
    mobile_applications: "Mobile Applications",
    development: "Development",

    // Collaborate Section
    lets_collaborate: "LET'S COLLABORATE",
    start_project_email: "Start a project",
    partner_with_us: "Partner with us",
    work_with_us: "Work with us",

    // Contact Page
    lets_make_magic: "Let's make magic happen",
    prefer_call: "Prefer a call?",
    drop_line: "Drop us a line at",
    drop_office: "Drop by our office",
    enter_contact_details: "Enter your contact details",
    your_name: "Your name",
    your_email: "Your email",
    your_phone: "Your phone",
    company_project_name: "Company name / project name",
    privacy_policy_agree: "I have read & I agree with the privacy policy",
    terms_conditions_agree: "I have read & I agree with the terms & conditions",
    send_message: "Send message",

    // Contact Section
    email: "Email",
    phone: "Phone",
    address: "Address",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["ko"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
