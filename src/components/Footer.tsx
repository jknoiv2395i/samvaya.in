import React from "react"
import { motion } from "framer-motion"
import { LegalDocType } from "./LegalModal"

interface FooterProps {
  onOpenLegal?: (doc: LegalDocType) => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    const lenisInstance = (window as unknown as { lenis?: { scrollTo: (target: number | string, options?: { duration?: number }) => void } }).lenis
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const id = href.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        const offset = 80
        const lenisInstance = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number; duration?: number }) => void } }).lenis
        if (lenisInstance) {
          lenisInstance.scrollTo(el, { offset: -offset, duration: 1.4 })
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: "smooth" })
        }
      }
    }
  }

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="w-full border-t border-neutral-200/80 bg-white mt-8 sm:mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Main Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-neutral-100">
          {/* Brand Info */}
          <div className="flex flex-col items-start gap-2">
            <button 
              type="button"
              onClick={scrollToTop}
              className="font-['Jersey_25'] font-normal text-3xl sm:text-4xl leading-none tracking-tight text-neutral-900 lowercase cursor-pointer select-none hover:opacity-80 transition-opacity"
            >
              samvaya
            </button>
            <p className="font-['Inter'] text-xs sm:text-sm text-neutral-500 max-w-sm">
              Sub-second Voice AI agents engineered for real-time conversation.
            </p>
          </div>

          {/* Minimal Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 font-['Inter'] text-xs sm:text-sm text-neutral-600">
            <a 
              href="#features" 
              onClick={(e) => handleNavClick(e, "#features")} 
              className="hover:text-neutral-900 transition-colors"
            >
              Features
            </a>
            <a 
              href="#voice" 
              onClick={(e) => handleNavClick(e, "#voice")} 
              className="hover:text-neutral-900 transition-colors"
            >
              Voice
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleNavClick(e, "#pricing")} 
              className="hover:text-neutral-900 transition-colors"
            >
              Pricing
            </a>
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
              className="hover:text-neutral-900 font-medium text-neutral-800 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-['Inter'] text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Samvaya AI. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-neutral-500">
            <a href="mailto:ramyabrato@samvaya.in" className="hover:text-neutral-800 transition-colors">
              ramyabrato@samvaya.in
            </a>
            <span className="text-neutral-300">&bull;</span>
            <a href="mailto:ronit@samvaya.in" className="hover:text-neutral-800 transition-colors">
              ronit@samvaya.in
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
