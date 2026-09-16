import React from "react"
import { LegalDocType } from "./LegalModal"

interface FooterProps {
  onOpenLegal?: (doc: LegalDocType) => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full overflow-hidden pt-4 sm:pt-8 pb-4 sm:pb-8">
      {/* Outer Card with subtle sky-to-clean-white aura matching Samvaya's brand art */}
      <div className="relative mx-3 sm:mx-6 lg:mx-8 rounded-[32px] sm:rounded-[44px] overflow-hidden border border-[#d6eef8]/80 bg-gradient-to-b from-[#e8f6fc] via-[#f7fbfd] to-white shadow-[0_10px_35px_-15px_rgba(40,120,180,0.12)]">
        
        {/* Top Floating Glass Navigation Bar */}
        <div className="px-6 sm:px-10 md:px-14 pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/80">
          
          {/* Logo Brand */}
          <div 
            onClick={scrollToTop}
            className="cursor-pointer select-none flex items-center gap-2 group transition-transform active:scale-95"
          >
            <span className="font-['Jersey_25'] font-normal text-3xl sm:text-4xl leading-none tracking-tight text-neutral-900 lowercase">
              samvaya
            </span>
          </div>

          {/* Minimal clean links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-[13px] font-['Inter'] text-neutral-600">
            <a href="#features" className="hover:text-neutral-900 transition-colors">Features</a>
            <a href="#voice" className="hover:text-neutral-900 transition-colors">Voice</a>
            <a href="#pricing" className="hover:text-neutral-900 transition-colors">Pricing</a>
            <button 
              type="button" 
              onClick={() => onOpenLegal?.("privacy")} 
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button 
              type="button" 
              onClick={() => onOpenLegal?.("terms")} 
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <a 
              href="mailto:ramyabrato@samvaya.in" 
              className="hover:text-neutral-900 transition-colors font-medium text-neutral-800"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Centerpiece: Signature Artistic SAMVAYA Giant Text Mask with Nature Stripes */}
        <div className="w-full flex items-end justify-center overflow-hidden select-none pointer-events-none pt-4 sm:pt-6">
          <h1
            className="font-['Jersey_25'] font-normal leading-none tracking-wide text-center"
            style={{
              fontSize: "clamp(80px, 20vw, 320px)",
              backgroundImage: "url('/samvaya-stripes.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "-0.08em",
            }}
          >
            SAMVAYA
          </h1>
        </div>

        {/* Sub-footer copyright strip */}
        <div className="px-6 sm:px-12 py-3.5 bg-white/70 backdrop-blur-xs border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs font-['Inter'] text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Samvaya AI &bull; Sub-second voice agents</p>
          <div className="flex items-center gap-4">
            <a href="mailto:ramyabrato@samvaya.in" className="hover:text-neutral-600 transition-colors">
              ramyabrato@samvaya.in
            </a>
            <span>&bull;</span>
            <a href="mailto:rohit@samvaya.in" className="hover:text-neutral-600 transition-colors">
              rohit@samvaya.in
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
