import React from "react"

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
      {/* Top Divider & Navigation Grid Card */}
      <div className="bg-neutral-50/80 backdrop-blur-md border border-neutral-200/80 rounded-[36px] sm:rounded-[48px] p-10 sm:p-14 md:p-20 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-16 border-b border-neutral-200/70">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 cursor-pointer select-none mb-5" onClick={scrollToTop}>
              <img
                src="/logo.svg"
                alt="samvaya"
                className="w-12 h-12 -ml-1 object-contain"
              />
              <span className="font-['Jersey_25'] font-normal text-[38px] leading-none tracking-[-1.5px] text-neutral-900 lowercase">
                samvaya
              </span>
            </div>
            <p className="font-['Inter'] text-sm sm:text-base md:text-[17px] text-neutral-500 max-w-md leading-relaxed">
              Sub-second natural voice agents built for real-time lead qualification, seamless bookings, and automated multi-channel follow-ups.
            </p>
          </div>

          {/* Navigation Links Col */}
          <div className="md:col-span-2 md:col-start-7 flex flex-col gap-3.5">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1.5">
              Product
            </h4>
            <a href="#features" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#voice" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              Voice Engine
            </a>
            <a href="#pricing" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              Pricing & Plans
            </a>
            <a href="https://samvaya.in" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              Early Access
            </a>
          </div>

          {/* Resources Col */}
          <div className="md:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1.5">
              Connect
            </h4>
            <a href="mailto:contact@samvaya.in" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              contact@samvaya.in
            </a>
            <a href="https://github.com/jknoiv2395i/samvaya.in" target="_blank" rel="noreferrer" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              GitHub Repository
            </a>
            <a href="#pricing" className="font-['Inter'] text-sm sm:text-base text-neutral-500 hover:text-neutral-900 transition-colors">
              Support & FAQs
            </a>
          </div>

          {/* Legal / Company */}
          <div className="md:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1.5">
              Company
            </h4>
            <span className="font-['Inter'] text-sm sm:text-base text-neutral-400 cursor-not-allowed">
              Privacy Policy
            </span>
            <span className="font-['Inter'] text-sm sm:text-base text-neutral-400 cursor-not-allowed">
              Terms of Service
            </span>
            <span className="font-['Inter'] text-sm sm:text-base text-neutral-400 cursor-not-allowed">
              Security Overview
            </span>
          </div>

        </div>

        {/* Bottom Navigation & Copyright Bar */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-['Inter'] text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Samvaya AI, Inc. All rights reserved.</p>
          <button 
            type="button" 
            onClick={scrollToTop}
            className="hover:text-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
          >
            <span>Back to top</span>
            <span>&uarr;</span>
          </button>
        </div>

        {/* Signature Large Textured Brand Element — cropped so only top half emerges at the bottom edge */}
        <div className="w-full h-[110px] sm:h-[150px] md:h-[190px] flex items-start justify-center overflow-hidden border-t border-neutral-200/60 mt-6 select-none relative">
          <h1
            className="font-['Jersey_25'] font-normal select-none leading-none tracking-wide text-center absolute top-2 sm:top-3"
            style={{
              fontSize: "clamp(120px, 24vw, 360px)",
              backgroundImage: "url('/samvaya-stripes.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.95,
            }}
          >
            SAMVAYA
          </h1>
        </div>

      </div>
    </footer>
  )
}
