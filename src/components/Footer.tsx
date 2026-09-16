import React from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowUpRight } from "lucide-react"
import { LegalDocType } from "./LegalModal"

interface FooterProps {
  onOpenLegal?: (doc: LegalDocType) => void
  onOpenEarlyAccess?: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenEarlyAccess }) => {
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
      className="w-full border-t border-neutral-200/70 bg-gradient-to-b from-white to-neutral-50/50 mt-12 sm:mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 sm:pb-16 border-b border-neutral-200/70">
          
          {/* Brand & Mission Column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-5 flex flex-col items-start gap-4">
            {/* Logo + Wordmark */}
            <div 
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <img 
                src="/footer-logo.png" 
                alt="Samvaya Lotus" 
                className="w-8 h-auto object-contain transition-transform duration-200 group-hover:scale-105" 
              />
              <span className="font-['Jersey_25'] font-normal text-3xl sm:text-[34px] leading-none text-neutral-900 tracking-tight lowercase">
                samvaya
              </span>
            </div>

            <p className="font-['Inter'] text-xs sm:text-[13.5px] leading-relaxed text-neutral-500 max-w-sm">
              Sub-second Voice AI agents engineered for real-time conversation, lead qualification, and automated inbound scheduling.
            </p>

            {/* Live Status Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/80 border border-neutral-200/80 text-[11px] font-['Inter'] text-neutral-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>120ms latency &bull; Systems active</span>
            </div>
          </div>

          {/* Product Column */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-3 font-['Inter']">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-900">
              Product
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-neutral-500">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => handleNavClick(e, "#features")} 
                  className="hover:text-neutral-900 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#voice" 
                  onClick={(e) => handleNavClick(e, "#voice")} 
                  className="hover:text-neutral-900 transition-colors"
                >
                  Natural Speech
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => handleNavClick(e, "#pricing")} 
                  className="hover:text-neutral-900 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#docs" 
                  onClick={(e) => handleNavClick(e, "#docs")} 
                  className="hover:text-neutral-900 transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-3 font-['Inter']">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-900">
              Trust
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-neutral-500">
              <li>
                <button 
                  type="button" 
                  onClick={() => onOpenLegal?.("privacy")} 
                  className="hover:text-neutral-900 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onOpenLegal?.("terms")} 
                  className="hover:text-neutral-900 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onOpenLegal?.("security")} 
                  className="hover:text-neutral-900 transition-colors cursor-pointer text-left"
                >
                  Security & Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact / Connect Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-3 flex flex-col gap-3 font-['Inter']">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-900">
              Connect
            </h4>
            <ul className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-neutral-500">
              <li>
                <a 
                  href="mailto:ramyabrato@samvaya.in" 
                  className="hover:text-neutral-900 transition-colors flex items-center gap-1 group"
                >
                  <span>ramyabrato@samvaya.in</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:ronit@samvaya.in" 
                  className="hover:text-neutral-900 transition-colors flex items-center gap-1 group"
                >
                  <span>ronit@samvaya.in</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
              {onOpenEarlyAccess && (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenEarlyAccess}
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer text-xs"
                  >
                    Request Early Access &rarr;
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-['Inter'] text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Samvaya AI Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer group select-none"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
