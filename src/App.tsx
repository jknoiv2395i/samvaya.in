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
const EarlyAccessModal = lazy(() => import("./components/EarlyAccessModal").then(m => ({ default: m.EarlyAccessModal })))

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"home" | "docs">(() => {
    return window.location.hash === "#docs" ? "docs" : "home"
  })
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false)
  const [modalInitialEmail, setModalInitialEmail] = useState("")
  const [modalAutoSendOtp, setModalAutoSendOtp] = useState(false)
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
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
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

  // Auto-open waitlist popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEarlyAccessOpen(true)
      setModalInitialEmail("")
      setModalAutoSendOtp(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenEarlyAccess = (email?: string) => {
    if (email) {
      setModalInitialEmail(email)
      setModalAutoSendOtp(true)
    } else {
      setModalInitialEmail("")
      setModalAutoSendOtp(false)
    }
    setIsEarlyAccessOpen(true)
  }

  const handleCloseEarlyAccess = () => {
    setIsEarlyAccessOpen(false)
    setModalInitialEmail("")
    setModalAutoSendOtp(false)
  }

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
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between overflow-x-hidden w-full">
      {/* Framer-Motion Scroll Progress Animation Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 origin-left z-[999] pointer-events-none"
      />

      <div>
        <Navbar onOpenEarlyAccess={() => handleOpenEarlyAccess()} />
        <main>
          <Hero onOpenEarlyAccess={handleOpenEarlyAccess} />
          {/* Mobile-only Stats section placed completely outside & below Hero section */}
          <div className="sm:hidden w-full bg-white pt-4 pb-0">
            <Stats />
          </div>
          <Features />
          <Suspense fallback={null}>
            <NaturalSpeech />
            <Pricing />
            <CtaBanner onOpenEarlyAccess={() => handleOpenEarlyAccess()} />
            <Footer onOpenLegal={(doc) => setActiveLegalDoc(doc)} />
          </Suspense>
        </main>
      </div>

      {/* Early Access Popup Modal */}
      <Suspense fallback={null}>
        <EarlyAccessModal 
          isOpen={isEarlyAccessOpen} 
          onClose={handleCloseEarlyAccess} 
          initialEmail={modalInitialEmail}
          autoSendOtp={modalAutoSendOtp}
        />
      </Suspense>

      {/* Trust & Legal Modal (Privacy Policy, Terms of Service, Security) */}
      <LegalModal 
        docType={activeLegalDoc} 
        onClose={() => setActiveLegalDoc(null)} 
      />
    </div>
  )
}

export default App
