import React from "react"
import { Shield, Mail, ArrowUpRight } from "lucide-react"
import { LegalDocType } from "./LegalModal"

interface FooterProps {
  onOpenLegal?: (doc: LegalDocType) => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 overflow-hidden">
      {/* Footer Card — connected directly to the bottom with top rounded corners */}
      <div className="bg-neutral-50/90 backdrop-blur-md border-t border-x border-neutral-200/80 rounded-t-[32px] sm:rounded-t-[48px] rounded-b-none p-8 sm:p-12 md:p-14 pb-8 sm:pb-10 shadow-sm flex flex-col justify-between">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-10 border-b border-neutral-200/70">
          
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="cursor-pointer select-none mb-1 group inline-flex items-center" onClick={scrollToTop}>
              <img
                src="/footer-logo.png"
                alt="samvaya"
                className="w-20 h-20 sm:w-24 sm:h-24 -ml-1 object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <p className="font-['Inter'] text-sm sm:text-base text-neutral-500 max-w-sm leading-relaxed text-left -mt-1 sm:-mt-2">
              Sub-second natural voice agents built for real-time lead qualification, automated appointment bookings, and zero-dropoff customer conversations.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 border border-neutral-300/60 text-xs font-['Inter'] text-neutral-700">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enterprise Telecom &amp; DPDP Compliant</span>
            </div>
          </div>

          {/* Navigation Links Col */}
          <div className="md:col-span-2 md:col-start-6 flex flex-col gap-3">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1">
              Platform
            </h4>
            <a href="#features" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Features
            </a>
            <a href="#voice" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Voice Engine
            </a>
            <a href="#pricing" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Pricing &amp; Plans
            </a>
            <a href="https://samvaya.in" className="font-['Inter'] text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Early Access
            </a>
          </div>

          {/* Trust & Legal Col */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1">
              Trust &amp; Legal
            </h4>
            <button 
              type="button"
              onClick={() => onOpenLegal?.("privacy")}
              className="font-['Inter'] text-sm text-left text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal?.("terms")}
              className="font-['Inter'] text-sm text-left text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal?.("security")}
              className="font-['Inter'] text-sm text-left text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              Security Architecture
            </button>
          </div>

          {/* Direct Founder Contacts Col */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-['Inter'] font-semibold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase mb-1">
              Leadership &amp; Support
            </h4>
            <a 
              href="mailto:ramyabrato@samvaya.in" 
              className="font-['Inter'] text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5 group"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
              <span>ramyabrato@samvaya.in</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900" />
            </a>
            <a 
              href="mailto:rohit@samvaya.in" 
              className="font-['Inter'] text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5 group"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700" />
              <span>rohit@samvaya.in</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900" />
            </a>
            <p className="font-['Inter'] text-xs text-neutral-400 mt-1">
              Registered Domain: <span className="text-neutral-600 font-medium">samvaya.in</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Compliance Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-['Inter'] text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Samvaya AI, Inc. All rights reserved.</p>
            <span className="hidden sm:inline text-neutral-300">&bull;</span>
            <p className="text-neutral-400 text-xs">Official Inquiries: <a href="mailto:ramyabrato@samvaya.in" className="underline hover:text-neutral-700">ramyabrato@samvaya.in</a></p>
          </div>
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
