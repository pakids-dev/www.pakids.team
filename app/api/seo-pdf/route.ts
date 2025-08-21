import PDFDocument from "pdfkit"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

function writeWrappedText(doc: PDFKit.PDFDocument, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(/\s+/)
  let line = ""
  let cursorY = y
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word
    const { width } = doc.widthOfString(testLine)
    if (width > maxWidth && line) {
      doc.text(line, x, cursorY, { lineBreak: false })
      cursorY += lineHeight
      line = word
    } else {
      line = testLine
    }
  }
  if (line) {
    doc.text(line, x, cursorY, { lineBreak: false })
    cursorY += lineHeight
  }
  return cursorY
}

export async function GET() {
  const fontPath = path.join(process.cwd(), "public", "fonts", "NotoSansKR-Regular.otf")
  const title = "Pakids SEO 체크리스트 (Google·Naver)"
  const sections: Array<{ heading: string; items: string[] }> = [
    {
      heading: "핵심 진단",
      items: [
        "인덱싱 기술 상태: robots 허용, sitemap 제공, index/follow 메타 정상.",
        "가능한 원인: 소유권 인증(구글/네이버) 미완료, 메인 가시 텍스트의 ‘파키즈’ 노출 약함.",
        "사이트맵: 현재 4개 URL 포함. 페이지 확장 시 노출면 확대 가능.",
      ],
    },
    {
      heading: "꼭 해야 할 4가지",
      items: [
        "Google Search Console 등록: 도메인 속성(DNS TXT) + URL Prefix 추가. 사이트맵 제출(https://www.pakids.team/sitemap.xml), 주요 URL 인덱싱 요청.",
        "Google 메타 인증키 배포: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google_제공_코드",
        "Naver 서치어드바이저 등록: 메타태그 인증 후 사이트맵 제출 및 수집 요청.",
        "Naver 메타 인증키 배포: NEXT_PUBLIC_NAVER_SITE_VERIFICATION=naver_제공_코드",
      ],
    },
    {
      heading: "브랜드 키워드 노출 강화",
      items: [
        "메인 상단 보조 H2 추가: ‘파키즈 | Pakids 크리에이티브 에이전시’ 등 브랜드가 보이는 헤딩.",
        "본문 상단에 한국어 ‘파키즈’가 명확히 노출되도록 조정.",
      ],
    },
    {
      heading: "운영 체크리스트",
      items: [
        "www/non-www 301 한쪽 고정(현재 canonical 기준은 https://www.pakids.team).",
        "백링크 확보: GitHub/LinkedIn/네이버 블로그/브런치/노션 등에서 홈페이지 링크.",
        "구조화 데이터 보강: Organization 외 WebSite(SearchAction) 추가, sameAs 채우기.",
      ],
    },
    {
      heading: "선택 개선",
      items: [
        "hreflang에 x-default 추가.",
        "국문 페이지 확장: /about, /work 등 추가 후 사이트맵 포함.",
        "Naver Place, Google Business Profile 등록.",
      ],
    },
    {
      heading: "반영 속도 가이드",
      items: [
        "Google: 보통 수시간~3일.",
        "Naver: 수일~2주(네이버 생태계 활동·백링크 있으면 단축).",
      ],
    },
  ]

  const stream = new (require("stream").PassThrough)()
  const doc = new PDFDocument({ size: "A4", margin: 56 })
  doc.pipe(stream)

  if (fs.existsSync(fontPath)) {
    doc.font(fontPath)
  }

  // Title
  doc.fillColor("#000000").fontSize(20).text(title, { align: "left" })
  doc.moveDown(0.5)

  doc.fontSize(11)
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right
  let cursorY = doc.y

  for (const section of sections) {
    // Heading
    doc.fillColor("#111111").fontSize(14).text(section.heading)
    cursorY = doc.y + 6

    // Items
    doc.fontSize(11).fillColor("#222222")
    for (const item of section.items) {
      const bullet = "• "
      const startX = doc.page.margins.left
      const startY = cursorY

      doc.text(bullet, startX, startY, { continued: false })
      const textX = startX + doc.widthOfString(bullet)
      const lineHeight = 16
      cursorY = writeWrappedText(doc, item, textX, startY, pageWidth - doc.widthOfString(bullet), lineHeight)

      // Page break if needed
      if (cursorY > doc.page.height - doc.page.margins.bottom - 40) {
        doc.addPage()
        if (fs.existsSync(fontPath)) doc.font(fontPath)
        cursorY = doc.y
      }
    }

    doc.moveDown(0.5)
    cursorY = doc.y
  }

  doc.end()

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=pakids-seo-checklist.pdf`,
    "Cache-Control": "no-store",
  })

  return new NextResponse(stream as any, { headers })
}

