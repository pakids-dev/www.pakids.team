import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { LanguageInitializer } from "@/components/language-initializer"

const inter = Inter({ subsets: ["latin"] })

// Environment variables for SEO and GTM
const gtmId = process.env.NEXT_PUBLIC_GTM_ID
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const naverSiteVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
const yandexSiteVerification = process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
const facebookDomainVerification = process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
const pinterestSiteVerification = process.env.NEXT_PUBLIC_PINTEREST_SITE_VERIFICATION

const otherVerifications: Record<string, string> = {}
if (naverSiteVerification) otherVerifications["naver-site-verification"] = naverSiteVerification
if (bingSiteVerification) otherVerifications["msvalidate.01"] = bingSiteVerification
if (yandexSiteVerification) otherVerifications["yandex-verification"] = yandexSiteVerification
if (facebookDomainVerification) otherVerifications["facebook-domain-verification"] = facebookDomainVerification
if (pinterestSiteVerification) otherVerifications["p:domain_verify"] = pinterestSiteVerification

export const metadata: Metadata = {
  title: {
    default: "파키즈 | 당신의 비전을 현실로",
    template: "파키즈 | %s",
  },
  description: "파키즈는 혁신적인 크리에이티브 에이전시입니다. 파키즈(Pakids)와 함께 당신의 비전을 현실로 만들어보세요. Your Vision, Our Technology",
  keywords: "파키즈, 파키즈, 파키즈 에이전시, 파키즈 크리에이티브, pakids, pakids agency, 크리에이티브 에이전시, 디지털 마케팅, 웹 개발, 모바일 앱 개발, SI, 스타트업, 창업, 소프트웨어 개발, IT 솔루션, UX/UI 디자인, 브랜딩, 디지털 전환, 웹사이트 제작, 앱 개발, 프로덕트 디자인, 사용자 경험, 인터페이스 디자인, 반응형 웹, 프론트엔드 개발, 백엔드 개발, 풀스택 개발, 웹 에이전시, 앱 제작 회사, 개발 외주, 개발 용역, React, Next.js, TypeScript, Node.js, AWS, 클라우드 서비스, SEO 최적화, 성능 최적화, 데이터베이스 설계, API 개발, 마이크로서비스, DevOps, CI/CD, creative agency, digital marketing, web development, mobile app development, system integration, startup, entrepreneurship, UX/UI design, branding, digital transformation, website creation, app development, product design, user experience, interface design, responsive web, frontend development, backend development, fullstack development, cloud services, SEO optimization, performance optimization, database design, API development, microservices",
  authors: [{ name: "파키즈" }],
  creator: "파키즈",
  publisher: "파키즈",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: googleSiteVerification,
    other: otherVerifications,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.pakids.team"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
      "en-US": "/en",
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' }
    ],
    other: [
      { rel: 'icon', url: '/android-icon-36x36.png', sizes: '36x36', type: 'image/png' },
      { rel: 'msapplication-TileImage', url: '/ms-icon-144x144.png' },
      { rel: 'msapplication-square70x70logo', url: '/ms-icon-70x70.png' },
      { rel: 'msapplication-square150x150logo', url: '/ms-icon-150x150.png' },
      { rel: 'msapplication-wide310x150logo', url: '/ms-icon-310x310.png' }
    ]
  },
  openGraph: {
    title: "파키즈 | 당신의 비전을 현실로",
    description: "파키즈(Pakids) - 혁신적인 크리에이티브 에이전시 당신의 비전, 우리의 기술",
    url: "https://www.pakids.team",
    siteName: "파키즈 | Pakids",
    images: [
      {
        url: "https://s3.us-east-2.amazonaws.com/cdn.pakids.team/pakids-logo-navy-white.jpg",
        width: 1200,
        height: 630,
        alt: "파키즈 | 당신의 비전을 현실로",
      },
    ],
    locale: "ko_KR",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "파키즈 | 당신의 비전을 현실로",
    description: "파키즈(Pakids) - 혁신적인 크리에이티브 에이전시 당신의 비전, 우리의 기술",
    images: ["https://s3.us-east-2.amazonaws.com/cdn.pakids.team/pakids-logo-navy-white.jpg"],
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId ?? 'GTM-TZHB8MQD'}');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        <Script
          id="ld-json-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "파키즈",
                alternateName: ["Pakids", "파키즈 크리에이티브", "Pakids Creative", "파키즈 에이전시", "Pakids Agency"],
                url: "https://www.pakids.team",
                logo: "https://s3.us-east-2.amazonaws.com/cdn.pakids.team/pakids-logo-navy-white.jpg",
                sameAs: [],
                description: "파키즈(Pakids)는 혁신적인 크리에이티브 에이전시입니다.",
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+82-10-3255-4653",
                    contactType: "customer service",
                    areaServed: "KR",
                    availableLanguage: ["Korean", "English"],
                  },
                ],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "중산중앙로 21, 3층 302-337호(중화산동2가)",
                  addressLocality: "전주시 완산구",
                  addressRegion: "전북특별자치도",
                  postalCode: "",
                  addressCountry: "KR",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "파키즈",
                alternateName: ["Pakids", "파키즈 크리에이티브", "Pakids Creative"],
                url: "https://www.pakids.team",
                inLanguage: ["ko-KR", "en-US"],
                description: "파키즈(Pakids) 크리에이티브 에이전시 공식 웹사이트",
              },
            ]),
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId ?? 'GTM-TZHB8MQD'}`}
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LanguageInitializer>{children}</LanguageInitializer>
      </body>
    </html>
  )
}
