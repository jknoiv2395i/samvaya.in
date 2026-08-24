import React, { useState } from "react"
import { Mail } from "lucide-react"
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
    <section className="relative w-full overflow-hidden pt-20 sm:pt-28 md:pt-32 lg:pt-36 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Background Foliage Graphic Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 w-full h-full flex items-end sm:items-center justify-center overflow-hidden">
        <img
          src="/hero-bg.png"
          alt="Hero background foliage"
          className="w-full h-[45%] xs:h-[52%] sm:h-full object-cover object-bottom sm:object-center"
        />
        {/* Soft top blend gradient on mobile into the sky */}
        <div className="absolute inset-x-0 bottom-[35%] xs:bottom-[42%] h-32 sm:hidden bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 text-center">
        {/* Main Headline with Flying Golden Birds */}
        <div className="relative max-w-5xl xl:max-w-6xl mx-auto">
          {/* Left Bird Illustration */}
          <img
            src="/bird-left.png"
            alt="Golden bird left"
            className="absolute -left-6 sm:-left-14 md:-left-24 lg:-left-34 xl:-left-42 -top-6 sm:-top-2 md:top-0 w-20 sm:w-28 md:w-36 h-auto pointer-events-none select-none animate-float-slow"
          />

          <h1 className="font-['Inter'] font-[300] text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] leading-[1.08] sm:leading-[1] md:leading-[84px] lg:leading-[80px] xl:leading-[76px] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] xl:tracking-[-6px] text-neutral-900">
            <span className="block whitespace-normal sm:whitespace-nowrap">You&apos;re Paying for Clicks</span>
            <span 
              style={{
                backgroundImage: "url('/text-texture.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="block whitespace-normal sm:whitespace-nowrap bg-clip-text text-transparent"
            >
              Not Conversations.
            </span>
          </h1>

          {/* Right Bird Illustration */}
          <img
            src="/bird-right.png"
            alt="Golden bird right"
            className="absolute -right-6 sm:-right-14 md:-right-22 lg:-right-32 xl:-right-40 top-4 sm:top-8 md:top-10 lg:top-14 w-20 sm:w-28 md:w-36 h-auto pointer-events-none select-none animate-float-reverse"
          />
        </div>

        {/* Subtitle Copy */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[15px] text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal text-center">
          <span className="block">AI voice agents that call every lead in seconds, qualify live on the phone, book appointments,</span>
          <span className="block">and follow up across WhatsApp and email so no lead dies in a spreadsheet.</span>
        </p>

        {/* Early Access Email Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto"
        >
          {/* Email Input Field - Width 410px */}
          <div className="flex items-center gap-2.5 w-full sm:w-[410px] h-[52px] bg-white border border-neutral-300/80 rounded-full px-5 py-2.5 shadow-xs focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-200 transition-all">
            <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              required
              className="w-full bg-transparent font-['Inter'] text-sm text-neutral-800 placeholder-neutral-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{ backgroundImage: "url('/btn-bg.png')" }}
            className="w-full sm:w-auto min-w-[173px] h-[52px] bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[16.9px] leading-[28px] tracking-[0px] px-7 py-2 rounded-full shadow-xs hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center"
          >
            Get Early Access
          </button>
        </form>

        {/* Chat Bar Image */}
        <div className="w-full max-w-4xl lg:max-w-[960px] xl:max-w-[1060px] mx-auto mt-5 sm:mt-6 px-2 sm:px-4">
          <img
            src="/chat-bar.png"
            alt="AI Voice Agent Prompt Interface"
            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-100 md:scale-105"
          />
        </div>

        {/* Key Metrics / Stats Section */}
        <Stats />

        {/* Bottom Scroll / Indicator Handle */}
        <div className="w-10 h-1 bg-neutral-400/50 rounded-full mx-auto -mt-10 mb-8" />
      </div>
    </section>
  )
}

