import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { LegalDocType } from "./LegalModal"
import { trackCalBookingClick } from "../utils/analytics"

interface FooterProps {
  onOpenLegal?: (doc: LegalDocType) => void
  calLink: string
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, calLink }) => {
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
      className="w-full bg-[#EAE8E3] text-[#111111] font-['Inter'] border-t border-[#D5D2CB] mt-16 sm:mt-24 select-none"
    >
      <div className="w-full max-w-[1720px] mx-auto border-x border-[#D5D2CB]">
        {/* Top Section: Hero Statement + Navigation Columns + Isometric Logo Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#D5D2CB]">
          
          {/* Big Statement Tile */}
          <div className="lg:col-span-4 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#D5D2CB] flex flex-col justify-between">
            <h2 className="font-['Inter'] font-semibold text-2xl sm:text-3xl lg:text-[34px] leading-[1.12] tracking-[-0.03em] uppercase text-neutral-900">
              AI Voice Agents engineered for real conversations & high-converting sales
            </h2>
            <div className="mt-8 pt-6 border-t border-[#D5D2CB]/60">
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sub-120ms Latency &bull; BYOC Ready
              </span>
            </div>
          </div>

          {/* Nav Column 1: Company */}
          <div className="col-span-1 lg:col-span-2 p-6 sm:p-8 lg:p-10 border-b sm:border-b-0 border-r border-[#D5D2CB]">
            <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-6">
              Company
            </span>
            <ul className="space-y-3.5 text-sm sm:text-[14.5px]">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="text-[#FF3E00] font-medium hover:opacity-80 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleNavClick(e, "#features")} className="text-neutral-700 hover:text-black transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="mailto:ramyabrato@samvaya.in" className="text-neutral-700 hover:text-black transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <a 
                  href={calLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => trackCalBookingClick("footer_schedule_demo")}
                  className="text-neutral-700 hover:text-black transition-colors flex items-center gap-1 group"
                >
                  <span>Schedule demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Product */}
          <div className="col-span-1 lg:col-span-2 p-6 sm:p-8 lg:p-10 border-b sm:border-b-0 border-r border-[#D5D2CB]">
            <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-6">
              Product
            </span>
            <ul className="space-y-3.5 text-sm sm:text-[14.5px]">
              <li>
                <a href="#features" onClick={(e) => handleNavClick(e, "#features")} className="text-neutral-700 hover:text-black transition-colors">
                  Voice Dashboard
                </a>
              </li>
              <li>
                <a href="#voice" onClick={(e) => handleNavClick(e, "#voice")} className="text-neutral-700 hover:text-black transition-colors">
                  Natural Speech
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleNavClick(e, "#pricing")} className="text-neutral-700 hover:text-black transition-colors">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href="#docs" onClick={(e) => handleNavClick(e, "#docs")} className="text-neutral-700 hover:text-black transition-colors">
                  BYOC Telephony
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Resources */}
          <div className="col-span-1 lg:col-span-2 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 border-r border-[#D5D2CB]">
            <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-6">
              Resources
            </span>
            <ul className="space-y-3.5 text-sm sm:text-[14.5px]">
              <li>
                <a href="#docs" onClick={(e) => handleNavClick(e, "#docs")} className="text-neutral-700 hover:text-black transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleNavClick(e, "#features")} className="text-neutral-700 hover:text-black transition-colors">
                  AI Benchmarks
                </a>
              </li>
              <li>
                <a href="https://cal.com/samvaya/samvaya" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition-colors">
                  Client Case Studies
                </a>
              </li>
              <li>
                <a href="#docs" onClick={(e) => handleNavClick(e, "#docs")} className="text-neutral-700 hover:text-black transition-colors">
                  API & Webhooks
                </a>
              </li>
            </ul>
          </div>

          {/* Right Logo Block */}
          <div className="col-span-1 lg:col-span-2 p-6 sm:p-8 lg:p-10 flex items-center justify-center bg-[#E5E3DD]">
            <div className="w-full flex flex-col items-center justify-center p-4 gap-3 text-center">
              <img 
                src="/footer-logo.png" 
                alt="Samvaya Lotus" 
                className="w-20 sm:w-24 lg:w-28 h-auto object-contain select-none transition-transform duration-300 hover:scale-105" 
              />
              <span className="font-['Jersey_25'] font-normal text-3xl lg:text-[34px] leading-none text-neutral-900 tracking-tight lowercase">
                samvaya
              </span>
            </div>
          </div>

        </div>

        {/* Middle Grid: Newsletter, Address, Inquiries, Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 border-b border-[#D5D2CB]">
          
          {/* Subscribe box */}
          <div className="lg:col-span-4 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#D5D2CB] flex flex-col justify-between">
            <div>
              <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-2">
                Subscribe
              </span>
              <p className="text-xs sm:text-[13px] text-neutral-600 mb-6 leading-relaxed">
                Stay updated on sub-second Voice AI models, benchmarks, and sales automation insights.
              </p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing!"); }} className="w-full flex items-center border border-[#111111] bg-[#F1EFEA]">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-neutral-900 placeholder-neutral-500 outline-none font-normal"
              />
              <button 
                type="submit" 
                className="h-full px-4 py-2.5 border-l border-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Address */}
          <div className="lg:col-span-2 p-8 sm:p-10 border-b md:border-b-0 border-r border-[#D5D2CB] flex flex-col justify-between">
            <div>
              <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-3">
                Address
              </span>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                Indiranagar, Bangalore<br />
                Karnataka 560038, India
              </p>
            </div>
            <a 
              href="https://maps.google.com/?q=Indiranagar+Bangalore+India" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-neutral-900 font-medium hover:underline mt-4 inline-block"
            >
              Directions &rarr;
            </a>
          </div>

          {/* Inquiries */}
          <div className="lg:col-span-3 border-b md:border-b-0 border-r border-[#D5D2CB] flex flex-col">
            <div className="p-6 sm:p-7 border-b border-[#D5D2CB]">
              <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-1">
                New Business
              </span>
              <a href="mailto:ramyabrato@samvaya.in" className="text-xs sm:text-[13.5px] font-medium text-neutral-900 hover:text-[#FF3E00] transition-colors">
                ramyabrato@samvaya.in
              </a>
            </div>
            <div className="p-6 sm:p-7">
              <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-1">
                General Inquiries
              </span>
              <a href="mailto:rohit@samvaya.in" className="text-xs sm:text-[13.5px] font-medium text-neutral-900 hover:text-[#FF3E00] transition-colors">
                rohit@samvaya.in
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-between">
            <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500 mb-3">
              Social & Network
            </span>
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs sm:text-sm">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition-colors">
                Twitter / X
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition-colors">
                LinkedIn
              </a>
              <a href="https://cal.com/samvaya/samvaya" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition-colors">
                Cal.com
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-black transition-colors">
                GitHub
              </a>
            </div>
          </div>

        </div>

        {/* Technical Blueprint Massive Brand Showcase: SAMVAYA wireframe typography with crosshairs */}
        <div className="relative w-full overflow-hidden border-b border-[#D5D2CB] bg-[#E8E6E0] py-8 sm:py-14 md:py-16 px-4 sm:px-10">
          {/* Blueprint Corner Crosshairs */}
          <span className="absolute top-2 left-3 font-mono text-[14px] text-neutral-500 select-none">+</span>
          <span className="absolute top-2 right-3 font-mono text-[14px] text-neutral-500 select-none">+</span>
          <span className="absolute bottom-2 left-3 font-mono text-[14px] text-neutral-500 select-none">+</span>
          <span className="absolute bottom-2 right-3 font-mono text-[14px] text-neutral-500 select-none">+</span>

          {/* Top ruler marks */}
          <div className="absolute top-0 inset-x-8 h-2 flex justify-between items-center opacity-30 select-none pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} className={`w-[1px] bg-neutral-900 ${i % 4 === 0 ? "h-2" : "h-1"}`} />
            ))}
          </div>

          {/* Left / Right vertical ruler marks */}
          <div className="absolute top-4 bottom-4 left-1.5 w-1 flex flex-col justify-between opacity-30 select-none pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-[1px] w-2 bg-neutral-900" />
            ))}
          </div>
          <div className="absolute top-4 bottom-4 right-1.5 w-1 flex flex-col justify-between opacity-30 select-none pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-[1px] w-2 bg-neutral-900" />
            ))}
          </div>

          {/* Outlined Wireframe Architectural Typography SVG matching Heron AI reference */}
          <div className="w-full flex items-center justify-center">
            <svg 
              viewBox="0 0 1000 170" 
              className="w-full h-auto max-h-[160px] md:max-h-[220px] select-none"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Draft crosshairs in background */}
              <line x1="0" y1="85" x2="1000" y2="85" stroke="#111111" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
              <line x1="500" y1="0" x2="500" y2="170" stroke="#111111" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
              
              {/* Construction Guides & Cad Marks */}
              <circle cx="100" cy="85" r="3" stroke="#111111" strokeWidth="0.7" opacity="0.4" />
              <circle cx="900" cy="85" r="3" stroke="#111111" strokeWidth="0.7" opacity="0.4" />

              {/* Wireframe Architectural Text 'SAMVAYA' */}
              <text 
                x="50%" 
                y="62%" 
                textAnchor="middle" 
                dominantBaseline="middle"
                fill="none" 
                stroke="#111111" 
                strokeWidth="1.2"
                letterSpacing="0.16em"
                className="font-['Inter'] font-normal text-[115px] sm:text-[132px] md:text-[146px] select-none"
                style={{
                  strokeDasharray: "none",
                  paintOrder: "stroke fill",
                }}
              >
                SAMVAYA
              </text>
            </svg>
          </div>

          {/* Bottom ruler marks */}
          <div className="absolute bottom-0 inset-x-8 h-2 flex justify-between items-center opacity-30 select-none pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} className={`w-[1px] bg-neutral-900 ${i % 4 === 0 ? "h-2" : "h-1"}`} />
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright on left, Legal policies on right with boxed dividers */}
        <div className="grid grid-cols-1 md:grid-cols-12 text-xs text-neutral-600">
          {/* Copyright notice */}
          <div className="md:col-span-7 lg:col-span-8 p-4 sm:p-5 flex items-center border-b md:border-b-0 md:border-r border-[#D5D2CB] text-[11.5px] uppercase tracking-wider font-mono">
            &copy; {new Date().getFullYear()} SAMVAYA AI. ALL RIGHTS RESERVED. CRAFTED FOR HIGH-CONVERTING VOICE AI.
          </div>

          {/* Legal policy links */}
          <div className="md:col-span-5 lg:col-span-4 grid grid-cols-3 text-center text-xs font-normal">
            <button
              type="button"
              onClick={() => onOpenLegal?.("privacy")}
              className="p-4 border-r border-[#D5D2CB] hover:bg-[#E2DFD8] hover:text-black transition-colors cursor-pointer text-[12px]"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.("terms")}
              className="p-4 border-r border-[#D5D2CB] hover:bg-[#E2DFD8] hover:text-black transition-colors cursor-pointer text-[12px]"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.("security")}
              className="p-4 hover:bg-[#E2DFD8] hover:text-black transition-colors cursor-pointer text-[12px]"
            >
              Security
            </button>
          </div>
        </div>

      </div>
    </motion.footer>
  )
}
