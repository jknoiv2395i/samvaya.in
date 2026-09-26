import React, { useState, useEffect, lazy, Suspense } from "react"
import Lenis from "lenis"
import { motion, useScroll, useSpring } from "framer-motion"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { Stats } from "./components/Stats"
import { LegalModal, LegalDocType } from "./components/LegalModal"
import { DocsLayout } from "./components/DocsLayout"

const NaturalSpeech = lazy(() => import("./components/NaturalSpeech").then(m => ({ default: m.NaturalSpeech })))
const Pricing = lazy(() => import("./components/Pricing").then(m => ({ default: m.Pricing })))
const CtaBanner = lazy(() => import("./components/CtaBanner").then(m => ({ default: m.CtaBanner })))
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })))

const CAL_LINK = "https://cal.com/samvaya/samvaya?overlayCalendar=true"

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"home" | "docs">(() => {
    return window.location.hash === "#docs" ? "docs" : "home"
  })
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null)

  // Framer-motion scroll progress animation with smooth spring dampening
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Initialize luxury momentum smooth scrolling via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      syncTouch: true,
      autoResize: true,
    })

    // Expose on window for components
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#docs") {
        setCurrentView("docs")
      } else if (currentView === "docs") {
        setCurrentView("home")
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [currentView])

  if (currentView === "docs") {
    return (
      <DocsLayout 
        onBackToHome={() => {
          window.location.hash = ""
          setCurrentView("home")
        }} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between overflow-x-clip w-full">
      {/* Framer-Motion Scroll Progress Animation Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 origin-left z-[999] pointer-events-none shadow-sm"
      />

      <div>
        <Navbar calLink={CAL_LINK} />
        <main>
          <Hero calLink={CAL_LINK} />
          {/* Mobile-only Stats section placed completely outside & below Hero section */}
          <div className="sm:hidden w-full bg-white pt-4 pb-0">
            <Stats />
          </div>
          <Features />
          <Suspense fallback={null}>
            <NaturalSpeech />
            <Pricing />
            <CtaBanner calLink={CAL_LINK} />
            <Footer 
              onOpenLegal={(doc) => setActiveLegalDoc(doc)} 
              calLink={CAL_LINK}
            />
          </Suspense>
        </main>
      </div>

      {/* Trust & Legal Modal (Privacy Policy, Terms of Service, Security) */}
      <LegalModal 
        docType={activeLegalDoc} 
        onClose={() => setActiveLegalDoc(null)} 
      />
    </div>
  )
}

export default App
