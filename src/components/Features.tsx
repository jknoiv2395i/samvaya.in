import React from "react"
import { Plus, Check, ArrowRight } from "lucide-react"

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative w-full pt-8 sm:pt-20 pb-12 sm:pb-20 px-3 sm:px-6 max-w-[1560px] mx-auto overflow-visible">
      {/* Header Section */}
      <div className="text-center relative max-w-5xl mx-auto mb-10 sm:mb-16 pt-3 sm:pt-0">

        <div className="relative inline-block mx-auto max-w-full px-2">
          {/* Mobile Heading */}
          <h2 className="sm:hidden font-['Playfair_Display'] font-normal text-3xl xs:text-4xl leading-[1.15] tracking-[-0.03em] text-neutral-900 whitespace-normal">
            Set the rules. We handle calls.
          </h2>
          {/* Desktop Heading */}
          <h2 className="hidden sm:block font-['Playfair_Display'] font-normal text-4xl md:text-5xl lg:text-[64px] leading-[1.1] sm:leading-[1.15] lg:leading-[48.6px] tracking-[-0.05em] text-neutral-900 whitespace-nowrap">
            Set the rules. We handle the calls.
          </h2>

          {/* Golden bird illustration top-right of the headline */}
          <img
            src="/features-bird-right.png"
            alt="Golden bird"
            className="absolute -right-2 xs:right-0 sm:-right-14 md:-right-16 lg:-right-20 -top-5 sm:-top-10 md:-top-12 lg:-top-14 w-12 sm:w-20 md:w-24 lg:w-28 h-auto pointer-events-none select-none z-10"
          />
        </div>

        {/* Mobile Subtitle */}
        <p className="sm:hidden mt-1 xs:mt-1.5 font-['Inter'] font-normal text-xs xs:text-sm leading-snug text-[#666666] max-w-md mx-auto text-center px-2">
          Define your criteria. Launch calls at scale. Track conversations, bookings, and recovery in real time.
        </p>
        {/* Desktop Subtitle */}
        <p className="hidden sm:block mt-2 font-['Inter'] font-normal text-base md:text-[20px] leading-relaxed md:leading-[27.9px] tracking-[0px] text-[#666666] max-w-4xl mx-auto text-center">
          <span className="block whitespace-nowrap">Define your qualification criteria, launch outbound calling at scale, and monitor live transcripts,</span>
          <span className="block whitespace-nowrap">bookings, and recovery telemetry in real time.</span>
        </p>
      </div>

      {/* Grid of 4 Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Card 1: Deploy in minutes (Blue Gradient, col-span-8) */}
        <div className="lg:col-span-8 w-full relative">
          {/* Top-Left Artistic Flower Badge Accent (outside overflow-hidden) */}
          <img
            src="/flower-badge.png"
            alt="Artistic flower badge"
            className="absolute -top-5 -left-3 sm:-top-8 sm:-left-12 md:-top-9 md:-left-14 lg:-left-16 w-14 sm:w-22 md:w-26 lg:w-28 h-auto pointer-events-none select-none z-30 drop-shadow-md"
          />

          <div 
            style={{ 
              backgroundImage: "url('/card-bg-1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            className="w-full h-auto lg:h-[540px] rounded-3xl pt-8 sm:pt-12 px-0 pb-0 relative overflow-hidden shadow-md flex flex-col justify-between"
          >
            <div className="w-full text-center px-3 sm:px-4">
              <h3 className="font-['Figtree'] italic font-medium text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[114px] leading-tight sm:leading-none tracking-[0px] text-white whitespace-normal sm:whitespace-nowrap text-center">
                Deploy in minutes
              </h3>
            </div>

            {/* Inner Prompt Input Mockup Image extending flush to the right edge */}
            <div className="w-full flex justify-end pl-3 sm:pl-10 -mt-1 sm:-mt-4">
              <img
                src="/deploy-prompt-card.svg"
                alt="Prompt card interface"
                className="w-full h-auto object-cover object-left-top drop-shadow-md rounded-tl-2xl"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Knowledge Base (Warm Orange/Noise Texture, col-span-4) */}
        <div 
          style={{ 
            backgroundImage: "url('/card-bg-2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="lg:col-span-4 rounded-3xl py-6 xs:py-8 sm:py-12 pl-3 xs:pl-4 sm:pl-16 pr-0 relative overflow-hidden shadow-sm flex flex-col justify-center min-h-[340px] xs:min-h-[360px] sm:min-h-[420px] lg:h-[540px]"
        >
          {/* Inner White Card - rounded on left, flush on right */}
          <div className="w-full bg-white rounded-l-xl sm:rounded-l-2xl rounded-r-none py-5 xs:py-6 sm:py-8 px-3 xs:px-4 sm:px-8 text-center shadow-lg flex flex-col items-center justify-center">
            {/* File Icon with Flower Illustration */}
            <div className="w-full flex items-center justify-center mb-2 xs:mb-3">
              <img
                src="/kb-file-icon.png"
                alt="Knowledge base file icon"
                className="w-24 xs:w-28 sm:w-44 h-auto object-contain select-none pointer-events-none translate-x-1 sm:translate-x-3"
              />
            </div>

            <h4 className="font-['Inter'] font-medium text-sm xs:text-base sm:text-[18.1px] leading-[22px] sm:leading-[24px] tracking-[0%] text-[#141414] text-center">
              Create your first knowledge base
            </h4>
            <p className="text-[11px] xs:text-xs sm:text-[13px] text-neutral-500 mt-1 sm:-mt-0.5 mb-2.5 sm:mb-2.5 leading-snug whitespace-normal sm:whitespace-nowrap px-1">
              Upload files, so your agents have information to answer callers.
            </p>
            <button 
              style={{ backgroundImage: "url('/btn-bg.png')" }}
              className="flex items-center justify-center gap-2 px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 rounded-full bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[12px] xs:text-[13px] sm:text-[15px] tracking-[0px] shadow-md hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 xs:w-4 h-3.5 xs:h-4 stroke-[2]" />
              Create knowledge base
            </button>
          </div>
        </div>

        {/* Card 3: Connect your phone number (Deep Green Gradient, col-span-6) */}
        <div 
          style={{ 
            backgroundImage: "url('/card-bg-3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="lg:col-span-6 rounded-3xl p-3 xs:p-4 sm:p-6 lg:p-7 relative overflow-hidden shadow-sm flex flex-col items-center justify-center min-h-[440px] xs:min-h-[460px] sm:min-h-[540px] lg:h-[540px]"
        >
          {/* Inner White Card */}
          <div className="w-full max-w-[440px] h-auto sm:h-[490px] bg-white rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-8 shadow-md flex flex-col justify-between items-start text-left">
            {/* Top: Header */}
            <div>
              <h4 className="text-base xs:text-lg sm:text-2xl md:text-[26px] font-semibold text-neutral-900 leading-tight whitespace-normal sm:whitespace-nowrap">
                Connect your phone number
              </h4>
              <p className="text-[11px] xs:text-xs sm:text-[13px] text-neutral-600 mt-1.5 xs:mt-2 sm:mt-2.5 leading-relaxed">
                Connect the carrier you already trust and deploy voice AI on your business lines in seconds.
              </p>
            </div>

            {/* Middle: Checklist with symmetric top and bottom spacing */}
            <div className="my-4 sm:my-6 space-y-2.5 sm:space-y-3">
              {[
                "Works with every major provider",
                "Instant number connection",
                "100% transparent carrier pricing",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <Check className="w-4 h-4 text-[#16A34A] stroke-[2.5] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Provider Logos */}
            <div className="w-full mb-4 sm:mb-6">
              <img
                src="/providers-logos.png"
                alt="Supported Providers: Vobiz, Twilio, Pulse, InTalk, Exotel, Smartflo"
                className="w-full max-w-[340px] sm:max-w-[360px] h-auto object-contain"
              />
            </div>

            {/* CTA Button */}
            <button 
              type="button"
              style={{ backgroundImage: "url('/btn-bg.png')" }}
              className="bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-[300] text-[13px] xs:text-[14px] sm:text-[15px] tracking-[0px] flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <ArrowRight className="w-4 h-4 stroke-[2]" />
              Connect your number
            </button>
          </div>
        </div>

        {/* Card 4: Live Telemetry & Analytics Dashboard (Lavender/Soft Purple, col-span-6) */}
        <div 
          style={{ 
            backgroundImage: "url('/card-bg-4.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="lg:col-span-6 rounded-3xl pt-6 pl-6 sm:pt-9 sm:pl-9 pr-0 pb-0 relative overflow-hidden shadow-sm flex flex-col justify-start items-start min-h-[360px] xs:min-h-[420px] sm:min-h-[540px] lg:h-[540px]"
        >
          {/* Inner Dashboard Mockup SVG - same position on mobile and desktop */}
          <div className="w-full h-full flex items-start justify-start overflow-hidden">
            <img
              src="/analytics-dashboard.svg"
              alt="Live telemetry and campaign analytics dashboard"
              className="min-w-[620px] xs:min-w-[700px] sm:min-w-[760px] md:min-w-[800px] lg:min-w-[820px] w-auto h-auto object-contain object-left-top select-none pointer-events-none drop-shadow-md translate-y-1 sm:translate-y-3 -ml-0.5 sm:ml-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
