import React from "react"

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 flex flex-col items-center">
      
      {/* Top Header Badge & Text */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-12">
        {/* Golden Bird Icon */}
        <div className="mb-2 flex items-center justify-center">
          <img
            src="/pricing-bird.png"
            alt="Samvaya Bird"
            className="w-18 sm:w-22 md:w-24 h-auto object-contain drop-shadow-sm select-none pointer-events-none animate-float-slow"
          />
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-neutral-900 font-serif leading-[1.05] sm:leading-[1.1] mb-0">
          Start free. Scale when ready.
        </h2>

        {/* Section Subtitle */}
        <p className="-mt-1 sm:-mt-2 md:-mt-2.5 font-['Inter'] font-normal text-sm sm:text-base md:text-[20px] leading-relaxed text-[#666666] max-w-3xl mx-auto text-center">
          Test with 50 free minutes. Upgrade only when your pipeline demands it.
        </p>
      </div>

      {/* Main Illustrated Landscape Canvas Container */}
      <div className="relative z-10 w-full max-w-[1180px] flex items-center justify-center shadow-sm select-none pointer-events-none">
        <img
          src="/pricing-main.svg"
          alt="Voice Agents Pricing Canvas"
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

    </section>
  )
}

