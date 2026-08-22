import React, { useState, useEffect, lazy, Suspense } from "react"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"

const NaturalSpeech = lazy(() => import("./components/NaturalSpeech").then(m => ({ default: m.NaturalSpeech })))
const Pricing = lazy(() => import("./components/Pricing").then(m => ({ default: m.Pricing })))
const CtaBanner = lazy(() => import("./components/CtaBanner").then(m => ({ default: m.CtaBanner })))
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })))
const EarlyAccessModal = lazy(() => import("./components/EarlyAccessModal").then(m => ({ default: m.EarlyAccessModal })))

export const App: React.FC = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false)

  // Auto-open waitlist popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEarlyAccessOpen(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenEarlyAccess = () => {
    setIsEarlyAccessOpen(true)
  }

  const handleCloseEarlyAccess = () => {
    setIsEarlyAccessOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between">
      <div>
        <Navbar onOpenEarlyAccess={handleOpenEarlyAccess} />
        <main>
          <Hero onOpenEarlyAccess={handleOpenEarlyAccess} />
          <Features />
          <Suspense fallback={null}>
            <NaturalSpeech />
            <Pricing />
            <CtaBanner onOpenEarlyAccess={handleOpenEarlyAccess} />
            <Footer />
          </Suspense>
        </main>
      </div>

      {/* Early Access Popup Modal */}
      <Suspense fallback={null}>
        <EarlyAccessModal 
          isOpen={isEarlyAccessOpen} 
          onClose={handleCloseEarlyAccess} 
        />
      </Suspense>
    </div>
  )
}

export default App
