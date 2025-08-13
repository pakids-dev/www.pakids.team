"use client"

import { useState } from "react"
import { useLanguage } from "./language-context"

const services = [
  {
    id: 1,
    titleKey: "product_design",
    description: "Creating innovative digital products that solve real business problems.",
    videoId: "product-design-video",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 2,
    titleKey: "ux_ui_design",
    description: "Crafting responsive, conversion-focused websites that put users first.",
    videoId: "ux-ui-design-video",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 3,
    titleKey: "mobile_applications",
    description: "Building custom mobile apps that solve real business problems.",
    videoId: "mobile-applications-video",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 4,
    titleKey: "development",
    description: "Full-stack development solutions with modern technologies.",
    videoId: "development-video",
    gridClass: "col-span-1 row-span-1",
  },
]

export function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const { t } = useLanguage()

  return (
    <section className="bg-black pt-0 px-6 max-w-7xl mx-auto">
    {/* Header */}
    <div className="flex justify-between items-center mb-16 pt-20">
      <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent">
        {t("our_services")}
      </h2>
    </div>

      <div className="grid grid-cols-2 gap-0 h-[600px] md:h-[700px]">
        {/* First Row: Product Design, UX/UI Design */}
        <div
          className="relative group border-r border-b border-gray-800 bg-black/50 backdrop-blur-sm hover:border-[#1a237e]/50 transition-all duration-500 overflow-hidden cursor-pointer p-8"
          onMouseEnter={() => setHoveredService(1)}
          onMouseLeave={() => setHoveredService(null)}
        >
          <div className="absolute top-6 left-6 w-3 h-3 rounded-full border border-gray-600 group-hover:border-[#1a237e] transition-colors duration-300" />
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-[#1a237e] transition-colors duration-300">
              {t("product_design")}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {t("product_design_description")}
            </p>
          </div>
          <div
            id="product-design-video"
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              hoveredService === 1 ? "opacity-30 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/product.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div
            className={`absolute top-6 right-6 transition-all duration-300 ${
              hoveredService === 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        <div
          className="relative group border-b border-gray-800 bg-black/50 backdrop-blur-sm hover:border-[#1a237e]/50 transition-all duration-500 overflow-hidden cursor-pointer p-8"
          onMouseEnter={() => setHoveredService(2)}
          onMouseLeave={() => setHoveredService(null)}
        >
          <div className="absolute top-6 left-6 w-3 h-3 rounded-full border border-gray-600 group-hover:border-[#1a237e] transition-colors duration-300" />
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-[#1a237e] transition-colors duration-300">
              {t("ux_ui_design")}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {t("ux_ui_design_description")}
            </p>
          </div>
          <div
            id="ux-ui-design-video"
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              hoveredService === 2 ? "opacity-30 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/uiux.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div
            className={`absolute top-6 right-6 transition-all duration-300 ${
              hoveredService === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Second Row: Mobile Applications, Development */}
        <div
          className="relative group border-r border-gray-800 bg-black/50 backdrop-blur-sm hover:border-[#1a237e]/50 transition-all duration-500 overflow-hidden cursor-pointer p-8"
          onMouseEnter={() => setHoveredService(3)}
          onMouseLeave={() => setHoveredService(null)}
        >
          <div className="absolute top-6 left-6 w-3 h-3 rounded-full border border-gray-600 group-hover:border-[#1a237e] transition-colors duration-300" />
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-[#1a237e] transition-colors duration-300">
              {t("mobile_applications")}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {t("mobile_applications_description")}
            </p>
          </div>
          <div
            id="mobile-applications-video"
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              hoveredService === 3 ? "opacity-30 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/mobileB.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div
            className={`absolute top-6 right-6 transition-all duration-300 ${
              hoveredService === 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        <div
          className="relative group bg-black/50 backdrop-blur-sm hover:border-[#1a237e]/50 transition-all duration-500 overflow-hidden cursor-pointer p-8"
          onMouseEnter={() => setHoveredService(4)}
          onMouseLeave={() => setHoveredService(null)}
        >
          <div className="absolute top-6 left-6 w-3 h-3 rounded-full border border-gray-600 group-hover:border-[#1a237e] transition-colors duration-300" />
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-[#1a237e] transition-colors duration-300">
              {t("development")}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {t("development_description")}
            </p>
          </div>
          <div
            id="development-video"
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              hoveredService === 4 ? "opacity-30 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/devVideo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          <div
            className={`absolute top-6 right-6 transition-all duration-300 ${
              hoveredService === 4 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}