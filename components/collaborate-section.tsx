"use client"
import { useRouter } from "next/navigation"
import { useLanguage } from "./language-context"

export function CollaborateSection() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleCollaborateClick = () => {
    router.push("/contact")
  }

  return (
    <section className="pt-48 pb-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16 overflow-hidden rounded-md">
          {/* Left and right fade masks */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

          <div
            className="bg-black/30 backdrop-blur-xl rounded-full py-8 px-12 border border-white/10 shadow-2xl relative cursor-pointer hover:bg-black/40 transition-all duration-300 overflow-hidden"
            onClick={handleCollaborateClick}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/10 via-transparent to-[#1a237e]/10 border-0 rounded-full"></div>
            <div className="flex whitespace-nowrap animate-scroll relative z-10" style={{ width: "200%" }}>
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent mr-8">
                {t("lets_collaborate")} •
              </span>
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent mr-8">
                {t("lets_collaborate")} •
              </span>
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent mr-8">
                {t("lets_collaborate")} •
              </span>
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent mr-8">
                {t("lets_collaborate")} •
              </span>
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent mr-8">
                {t("lets_collaborate")} •
              </span>
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#1a237e] via-white to-[#1a237e] bg-clip-text text-transparent mr-8">
                {t("lets_collaborate")} •
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32">
          <div className="text-center"></div>

          <div className="text-center">
            <h3 className="text-lg text-gray-400 mb-4">{t("work_with_us")}</h3>
            <a
              href="mailto:hr@pakids.com"
              className="text-xl md:text-2xl text-white hover:text-[#1a237e] transition-colors duration-300"
            >
              contact@pakids.team
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
