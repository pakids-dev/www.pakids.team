import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pakids 관리자",
  description: "Pakids 관리자 페이지 - GA4 채널별 통계 대시보드",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}


