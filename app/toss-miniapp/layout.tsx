import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '토스 미니앱 제작 | 파키즈',
  description: '3,000만 유저에게 내 서비스 출시하기',
  openGraph: {
    title: '토스 미니앱 제작 | 파키즈',
    description: '3,000만 유저에게 내 서비스 출시하기',
    url: 'https://www.pakids.team/toss-miniapp',
    siteName: '파키즈 | Pakids',
    images: [
      {
        url: 'https://file.pakids.cloud/toss-miniapp-banner.png',
        width: 1200,
        height: 630,
        alt: '토스 미니앱 | 파키즈',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '토스 미니앱 제작 | 파키즈',
    description: '3,000만 유저에게 내 서비스 출시하기',
    images: ['https://file.pakids.cloud/toss-miniapp-banner.png'],
  },
  alternates: {
    canonical: '/toss-miniapp',
  },
}

export default function TossMiniAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

