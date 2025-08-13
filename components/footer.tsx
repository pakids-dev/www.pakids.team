import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="inline-block leading-5">
              <Image src="/pakids-symbol-logo.png" alt="Pakids" width={200} height={100} className="h-8 w-auto" />
            </Link>
            <span className="text-2xl font-bold">{""}</span>
          </div>
        </div>

        <div className="mb-8 text-sm text-gray-300 leading-relaxed space-y-2">
          <div className="flex flex-wrap items-center gap-1">
            <span>대표자: 김대표</span>
            <span className="mx-2">|</span>
            <span>사업자등록번호: 123-45-67890</span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <span>HQ 오피스: 서울 강남구 테헤란로 123, 10층</span>
            <span className="mx-2">|</span>
            <span>기업부설연구소: 서울 금천구 디지털로10길 37, 3105</span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <span>고객상담: 1555-2440 (평일 10시~18시)</span>
            <span className="mx-2">|</span>
            <span>이메일: contact@pakids.team</span>
          </div>
          <div>산업디자인전문회사 신고 제 18330호</div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Pakids Co., Ltd. All right reserved.</div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              홈
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
              소개
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
