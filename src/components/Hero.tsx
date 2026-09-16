import React, { useState } from "react"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Stats } from "./Stats"

interface HeroProps {
  onOpenEarlyAccess?: (email?: string) => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && onOpenEarlyAccess) {
      onOpenEarlyAccess(email)
    } else if (onOpenEarlyAccess) {
      onOpenEarlyAccess()
    }
  }

  return (
    <section className="relative w-full overflow-hidden pt-20 sm:pt-28 md:pt-32 lg:pt-36 min-h-0 flex flex-col justify-between pb-12 sm:pb-16 md:pb-20">
      {/* Background Foliage Graphic Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 w-full h-full flex items-end sm:items-center justify-center overflow-hidden">
        <img
          src="/hero-bg.png"
          alt="Hero background foliage"
          className="w-full h-full object-contain sm:object-cover object-bottom sm:object-center"
        />
        {/* Soft top blend gradient on mobile into the sky */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/80 to-transparent" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 text-center">
        {/* Main Headline with Flying Golden Birds */}
        <div className="relative inline-block max-w-full mx-auto px-2 text-center">
          {/* Left Bird Illustration */}
          <img
            src="/bird-left.png"
            alt="Golden bird left"
            className="absolute -left-3 xs:-left-5 sm:-left-14 md:-left-24 lg:-left-34 xl:-left-42 -top-6 xs:-top-8 sm:-top-2 md:top-0 w-11 xs:w-15 sm:w-28 md:w-36 h-auto pointer-events-none select-none z-20"
          />

          <h1 className="font-['Inter'] font-[300] text-[26px] min-[350px]:text-[29px] min-[380px]:text-[33px] xs:text-[40px] sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[108px] leading-[1.1] sm:leading-[1] md:leading-[88px] lg:leading-[90px] xl:leading-[96px] tracking-[-0.5px] min-[360px]:tracking-[-0.8px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] xl:tracking-[-6px] text-neutral-900 text-center">
            <span className="block whitespace-nowrap">
              You&apos;re Paying for Clicks
            </span>
            <span 
              style={{
                backgroundImage: "url('/text-texture.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="block whitespace-nowrap bg-clip-text text-transparent"
            >
              Not Conversions.
            </span>
          </h1>

          {/* Right Bird Illustration - Desktop Only */}
          <img
            src="/bird-right.png"
            alt="Golden bird right"
            className="hidden sm:block absolute sm:-right-14 md:-right-22 lg:-right-32 xl:-right-40 sm:top-8 md:top-10 lg:top-14 sm:w-28 md:w-36 h-auto pointer-events-none select-none z-20"
          />
        </div>

        {/* Subtitle Copy */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="sm:hidden mt-2 mb-4 text-[11px] min-[360px]:text-[12px] min-[390px]:text-[13px] text-neutral-600 max-w-[340px] xs:max-w-md mx-auto leading-normal font-normal text-center px-2">
            AI voice agents that call, qualify, book, and follow up across WhatsApp and email.
          </p>
          <p className="hidden sm:block mt-5 text-base md:text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal text-center">
            <span className="block">AI voice agents that call every lead in seconds, qualify live on the phone, book appointments,</span>
            <span className="block">and follow up across WhatsApp and email so no lead dies in a spreadsheet.</span>
          </p>
        </motion.div>

        {/* Early Access Email Form */}
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="mt-3 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto"
        >
          {/* Email Input Field - Desktop Only */}
          <div className="hidden sm:flex items-center gap-2.5 w-[410px] h-[52px] bg-white border border-neutral-300/80 rounded-full px-5 py-2.5 shadow-xs focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-200 transition-all">
            <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              className="w-full bg-transparent font-['Inter'] text-sm text-neutral-800 placeholder-neutral-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{ backgroundImage: "url('/btn-bg.png')" }}
            className="w-auto min-w-[160px] xs:min-w-[175px] sm:min-w-[173px] h-[44px] xs:h-[46px] sm:h-[52px] bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[14px] xs:text-[15px] sm:text-[16.9px] leading-none tracking-[0px] px-6 sm:px-7 py-2 rounded-full shadow-xs hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center mx-auto sm:mx-0"
          >
            Get Early Access
          </button>
        </motion.form>

        {/* Chat Bar Image */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.95, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-full xs:max-w-[440px] sm:max-w-4xl lg:max-w-[1040px] xl:max-w-[1140px] mx-auto mt-3 sm:mt-10 mb-6 sm:mb-12 px-1 xs:px-2 sm:px-4"
        >
          <img
            src="/chat-bar.png"
            alt="AI Voice Agent Prompt Interface"
            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-105 sm:scale-105 md:scale-110"
          />
        </motion.div>

        {/* Key Metrics / Stats Section - Desktop inside Hero */}
        <div className="hidden sm:block">
          <Stats />
        </div>
      </div>
    </section>
  )
}
