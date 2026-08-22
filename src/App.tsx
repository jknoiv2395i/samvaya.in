import React, { useState, useEffect } from "react"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { NaturalSpeech } from "./components/NaturalSpeech"
import { Pricing } from "./components/Pricing"
import { CtaBanner } from "./components/CtaBanner"
import { Footer } from "./components/Footer"
import { EarlyAccessModal } from "./components/EarlyAccessModal"

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
          <NaturalSpeech />
          <Pricing />
          <CtaBanner onOpenEarlyAccess={handleOpenEarlyAccess} />
          <Footer />
        </main>
      </div>

      {/* Early Access Popup Modal */}
      <EarlyAccessModal 
        isOpen={isEarlyAccessOpen} 
        onClose={handleCloseEarlyAccess} 
      />
    </div>
  )
}

export default App
