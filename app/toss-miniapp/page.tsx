'use client'

import { useEffect } from 'react'

export default function TossMiniAppRedirect() {
  useEffect(() => {
    // 즉시 외부 URL로 리다이렉트
    window.location.replace('https://pakids-toss-miniapp.channel.io')
  }, [])

  // 리다이렉트 중 표시할 로딩 메시지
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  )
}

