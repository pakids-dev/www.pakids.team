import Link from "next/link"
import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 py-20 mt-24" aria-labelledby="not-found-title">
          <h1 id="not-found-title" className="text-3xl sm:text-5xl font-bold mb-6">
            페이지를 찾을 수 없어요
          </h1>
          <p className="text-gray-300 max-w-2xl">
            요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다. 아래 유용한 링크를 통해 원하는 정보를 찾아보세요.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-xl">
            <Link href="/" className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-md px-4 py-3 text-center">
              홈으로 가기
            </Link>
            <Link href="/contact" className="bg-[#1a237e] hover:opacity-90 transition-colors rounded-md px-4 py-3 text-center">
              프로젝트/문의하기
            </Link>
          </div>

          <section className="mt-16" aria-labelledby="popular-links">
            <h2 id="popular-links" className="text-xl font-semibold mb-4">자주 찾는 링크</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>
                <Link className="hover:text-white" href="/">메인 페이지</Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/contact">문의하기</Link>
              </li>
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}


