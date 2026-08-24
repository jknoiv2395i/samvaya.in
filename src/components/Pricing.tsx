import React from "react"

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24 flex flex-col items-center overflow-hidden sm:overflow-visible">
      
      {/* Top Header Badge & Text */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-12 px-2">
        {/* Golden Bird Icon */}
        <div className="mb-2 flex items-center justify-center">
          <img
            src="/pricing-bird.png"
            alt="Samvaya Bird"
            className="w-14 sm:w-22 md:w-24 h-auto object-contain drop-shadow-sm select-none pointer-events-none animate-float-slow"
          />
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-['Playfair_Display'] font-normal tracking-[-0.04em] text-neutral-900 leading-[1.08] sm:leading-[1.1] mb-1 sm:mb-0">
          Start free. Scale when ready.
        </h2>

        {/* Section Subtitle */}
        <p className="mt-1 sm:-mt-2 md:-mt-2.5 font-['Inter'] font-normal text-xs xs:text-sm sm:text-base md:text-[20px] leading-relaxed text-[#666666] max-w-3xl mx-auto text-center">
          Test with 50 free minutes. Upgrade only when your pipeline demands it.
        </p>
      </div>

      {/* Main Illustrated Landscape Canvas Container */}
      <div className="relative z-10 w-full max-w-[1180px] flex items-center justify-center overflow-hidden shadow-sm select-none rounded-[20px] sm:rounded-[28px]">
        <img
          src="/pricing-main.svg"
          alt="Voice Agents Pricing Canvas"
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

    </section>
  )
}

