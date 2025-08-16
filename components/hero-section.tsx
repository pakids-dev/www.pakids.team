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
          className="break-normal font-bold text-center text-[40px] sm:text-[60px] md:text-[80px] lg:text-[110px] xl:text-[150px] bg-clip-text text-transparent leading-[1.1] sm:leading-[1.0] md:leading-[0.95] lg:leading-[0.9] mb-8"
          aria-label="Your Vision, Our Technology"
        >
          <span aria-hidden="true">
            {/*  Added flex flex-col items-center to ensure proper centering */}
            <div className="flex flex-col items-center">
              {/* First line: "Your Vision" - forced to stay on one line */}
              <div className="whitespace-nowrap" style={{ marginBottom: "0.2em" }}>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{ display: "inline-block", backgroundSize: "1400% 100%", backgroundPosition: "0% 0%" }}
                >
                  Y
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
                  o
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
                  u
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
                  r
                </span>
                <span> </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "30.77% 0%",
                    animationDelay: "0.4s",
                  }}
                >
                  V
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
                  s
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
                  i
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "61.54% 0%",
                    animationDelay: "0.8s",
                  }}
                >
                  o
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
                  n
                </span>
              </div>

              {/* Second line: "Our Technology" - forced to stay on one line */}
              <div className="whitespace-nowrap">
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "76.92% 0%",
                    animationDelay: "1.0s",
                  }}
                >
                  O
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
                  u
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
                  r
                </span>
                <span> </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "0% 0%",
                    animationDelay: "1.3s",
                  }}
                >
                  T
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "7.69% 0%",
                    animationDelay: "1.4s",
                  }}
                >
                  e
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "15.38% 0%",
                    animationDelay: "1.5s",
                  }}
                >
                  c
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "23.08% 0%",
                    animationDelay: "1.6s",
                  }}
                >
                  h
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "30.77% 0%",
                    animationDelay: "1.7s",
                  }}
                >
                  n
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "38.46% 0%",
                    animationDelay: "1.8s",
                  }}
                >
                  o
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "46.15% 0%",
                    animationDelay: "1.9s",
                  }}
                >
                  l
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "53.85% 0%",
                    animationDelay: "2.0s",
                  }}
                >
                  o
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "61.54% 0%",
                    animationDelay: "2.1s",
                  }}
                >
                  g
                </span>
                <span
                  className="bg-gradient-to-r from-[#1a237e] via-[#F5F5F8] to-[#1a237e] bg-clip-text text-transparent animate-text-reveal"
                  style={{
                    display: "inline-block",
                    backgroundSize: "1400% 100%",
                    backgroundPosition: "69.23% 0%",
                    animationDelay: "2.2s",
                  }}
                >
                  y
                </span>
              </div>
            </div>
          </span>
        </h1>


        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
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
