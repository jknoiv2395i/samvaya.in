import React from "react"

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 overflow-hidden">
      {/* Footer Card — connected directly to the bottom with top rounded corners */}
      <div className="bg-neutral-50/80 backdrop-blur-md border-t border-x border-neutral-200/80 rounded-t-[32px] sm:rounded-t-[48px] rounded-b-none p-8 sm:p-12 md:p-14 pb-8 sm:pb-10 shadow-sm flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-10 border-b border-neutral-200/70">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="cursor-pointer select-none mb-1 group inline-flex items-center" onClick={scrollToTop}>
              <img
                src="/footer-logo.png"
                alt="samvaya"
                className="w-20 h-20 sm:w-24 sm:h-24 -ml-1 object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-neutral-500 max-w-sm leading-relaxed text-left -mt-1 sm:-mt-2">
              Sub-second natural voice agents built for real-time lead qualification, seamless bookings, and automated multi-channel follow-ups.
            </p>
          </div>

          {/* Navigation Links Col */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-3">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1">
              Product
            </h4>
            <a href="#features" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#voice" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Voice Engine
            </a>
            <a href="#pricing" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Pricing & Plans
            </a>
            <a href="https://samvaya.in" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Early Access
            </a>
          </div>

          {/* Resources / Contact Col */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1">
              Connect
            </h4>
            <a href="mailto:contact@samvaya.in" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              contact@samvaya.in
            </a>
          </div>
        </div>
        </div>

        {/* Bottom Navigation & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-['Inter'] text-neutral-500">
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

      </div>
    </footer>
  )
}
