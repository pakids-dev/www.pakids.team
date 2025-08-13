"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "./language-context"

export function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative flex flex-col items-center justify-center h-screen px-6 text-center">
    <div className="absolute inset-0 z-0">
      <div
        id="hero-video-container"
        className="w-full h-full"
      >
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/backGround.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* 하단으로 갈수록 검은색으로 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black"></div>
      </div>
    </div>
          <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-sm md:text-base text-gray-400 mb-4 tracking-wider uppercase">{t("ux_ui_dev")}</p>

        <h1
          className="break-normal font-bold text-center max-sm:text-[80px] max-xl:text-[110px] text-[150px] bg-clip-text text-transparent max-xl:leading-[0.9] max-sm:leading-[1.15em] max-sm:mt-5 leading-tight mb-8"
          aria-label="Creative Agency"
        >
          <span aria-hidden="true">
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{ display: "inline-block", backgroundSize: "1400% 100%", backgroundPosition: "0% 0%" }}
              >
                C
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "7.69% 0%",
                  animationDelay: "0.1s",
                }}
              >
                r
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "15.38% 0%",
                  animationDelay: "0.2s",
                }}
              >
                e
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "23.08% 0%",
                  animationDelay: "0.3s",
                }}
              >
                a
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "30.77% 0%",
                  animationDelay: "0.4s",
                }}
              >
                t
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "38.46% 0%",
                  animationDelay: "0.5s",
                }}
              >
                i
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "46.15% 0%",
                  animationDelay: "0.6s",
                }}
              >
                v
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "53.85% 0%",
                  animationDelay: "0.7s",
                }}
              >
                e
              </span>
            </span>
            <span> </span>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "61.54% 0%",
                  animationDelay: "0.8s",
                }}
              >
                A
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "69.23% 0%",
                  animationDelay: "0.9s",
                }}
              >
                g
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "76.92% 0%",
                  animationDelay: "1.0s",
                }}
              >
                e
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "84.62% 0%",
                  animationDelay: "1.1s",
                }}
              >
                n
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "92.31% 0%",
                  animationDelay: "1.2s",
                }}
              >
                c
              </span>
              <span
                className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                style={{
                  display: "inline-block",
                  backgroundSize: "1400% 100%",
                  backgroundPosition: "100% 0%",
                  animationDelay: "1.3s",
                }}
              >
                y
              </span>
            </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t("hero_description")}
        </p>

        <Link href="/contact">
          <Button
            size="lg"
            className="bg-transparent border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 text-lg"
          >
            {t("start_project")} →
          </Button>
        </Link>
      </div>
    </section>
  )
}
