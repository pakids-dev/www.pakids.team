"use client"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>


      {/* Wave Shape Animations */}
      <div className="wave-shape absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#1a237e]/20 via-[#2196f3]/10 to-transparent rounded-full blur-2xl"></div>
      <div className="wave-shape absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-l from-gray-400/15 via-slate-500/10 to-transparent rounded-full blur-xl delay-1000"></div>
      <div className="wave-shape absolute bottom-1/3 left-1/2 w-72 h-72 bg-gradient-to-t from-[#2196f3]/15 via-[#1a237e]/8 to-transparent rounded-full blur-3xl delay-2000"></div>
      <div className="wave-shape absolute top-1/6 right-1/2 w-64 h-64 bg-gradient-to-br from-slate-600/12 via-gray-500/8 to-transparent rounded-full blur-2xl delay-3000"></div>
      <div className="wave-shape absolute bottom-1/4 right-1/6 w-88 h-88 bg-gradient-to-tl from-[#1a237e]/18 via-[#2196f3]/12 to-transparent rounded-full blur-xl delay-4000"></div>

      {/* Additional Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#1a237e]/10 via-[#2196f3]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-gray-400/5 via-slate-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  )
}
