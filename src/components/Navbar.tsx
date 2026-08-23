import React, { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Voice", href: "#voice" },
  { label: "Pricing", href: "#pricing" },
]

interface NavbarProps {
  onOpenEarlyAccess?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEarlyAccess }) => {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      const offset = 80 // account for sticky navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  // Highlight active section on scroll
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="w-full pt-3 md:pt-4 px-3 sm:px-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto bg-white/70 sm:bg-white/20 backdrop-blur-xl border border-white/40 sm:border-white/30 rounded-full px-3 xs:px-4 sm:px-5 py-0.5 flex items-center justify-between shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] transition-all">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault()
            setIsMobileMenuOpen(false)
            window.scrollTo({ top: 0, behavior: "smooth" }) 
          }} 
          className="flex items-center cursor-pointer select-none shrink-0"
        >
          <img
            src="/logo.svg"
            alt="samvaya"
            className="w-10 h-10 xs:w-12 xs:h-12 -mr-2 translate-y-[0.5px] object-contain"
          />
          <span className="font-['Jersey_25'] font-normal text-[24px] xs:text-[28px] leading-none tracking-[-1.5px] text-neutral-900 lowercase inline-block">
            samvaya
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.replace("#", "")
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-150 ${
                  isActive ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-950"
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* Right Controls: CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              if (onOpenEarlyAccess) onOpenEarlyAccess()
            }}
            style={{ backgroundImage: "url('/btn-bg.png')" }}
            className="bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[13px] xs:text-[15px] leading-[24px] tracking-[0px] min-w-[125px] xs:min-w-[155px] h-[38px] xs:h-[44px] px-3.5 xs:px-5 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:opacity-90 active:scale-[0.98] cursor-pointer flex items-center justify-center whitespace-nowrap"
          >
            Get Early Access
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-neutral-200/60 text-neutral-700 flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer ml-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphic Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl p-5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-3 duration-200 flex flex-col gap-4">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.replace("#", "")
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`px-4 py-3 rounded-2xl text-xs font-semibold tracking-[0.16em] uppercase transition-all flex items-center justify-between ${
                    isActive 
                      ? "bg-blue-50/80 text-blue-600 font-bold" 
                      : "text-neutral-700 hover:bg-neutral-100/70 hover:text-neutral-950"
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-neutral-400 text-xs">→</span>
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
