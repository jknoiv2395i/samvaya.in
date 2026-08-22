import React, { useState, useEffect } from "react"

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

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
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
    <header className="w-full pt-3 md:pt-4 px-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 sm:px-5 py-0.5 flex items-center justify-between shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] transition-all">
        {/* Brand Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }} className="flex items-center cursor-pointer select-none">
          <img
            src="/logo.svg"
            alt="samvaya"
            className="w-12 h-12 -mr-2 translate-y-[0.5px] object-contain"
          />
          <span className="font-['Jersey_25'] font-normal text-[28px] leading-none tracking-[-1.5px] text-neutral-900 lowercase inline-block">
            samvaya
          </span>
        </a>

        {/* Navigation Links */}
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

        {/* Right CTA */}
        <div>
          <button
            type="button"
            onClick={onOpenEarlyAccess}
            style={{ backgroundImage: "url('/btn-bg.png')" }}
            className="bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[15px] leading-[24px] tracking-[0px] min-w-[155px] h-[44px] px-5 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:opacity-90 active:scale-[0.98] cursor-pointer flex items-center justify-center"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </header>
  )
}
