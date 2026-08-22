import React from "react"

interface CtaBannerProps {
  onOpenEarlyAccess?: () => void
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenEarlyAccess }) => {
  return (
    <section id="resources" className="relative w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1560px] mx-auto overflow-hidden">
      <div 
        style={{ 
          backgroundImage: "url('/cta-nature-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] rounded-[32px] sm:rounded-[40px] relative overflow-hidden shadow-lg flex flex-col items-center justify-between py-12 sm:py-16 md:py-20 px-6 text-center"
      >
        {/* Title */}
        <div className="max-w-2xl mx-auto z-10">
          <h2 className="font-['Inter'] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-[-0.02em] text-[#4A5568]">
            Start articulating your <br /> business better
          </h2>
        </div>

        {/* Get Early Access CTA Button */}
        <div className="z-10 flex flex-col items-center mt-auto">
          <button
            type="button"
            onClick={onOpenEarlyAccess}
            style={{ backgroundImage: "url('/btn-bg.png')" }}
            className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-normal text-sm sm:text-base tracking-[0px] shadow-lg hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  )
}
