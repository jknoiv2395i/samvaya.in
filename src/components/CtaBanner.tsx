import React from "react"
import { motion } from "framer-motion"

interface CtaBannerProps {
  onOpenEarlyAccess?: () => void
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenEarlyAccess }) => {
  return (
    <section id="resources" className="relative w-full py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-[1560px] mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.95, ease: "easeOut" }}
        style={{ 
          backgroundImage: "url('/cta-nature-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full min-h-[280px] xs:min-h-[320px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] rounded-[28px] sm:rounded-[40px] relative overflow-hidden shadow-lg flex flex-col items-center justify-between py-8 sm:py-16 md:py-20 px-4 sm:px-6 text-center"
      >
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="max-w-2xl mx-auto z-10"
        >
          <h2 className="font-['Inter'] font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.2] sm:leading-[1.15] tracking-[-0.02em] text-[#4A5568]">
            Start articulating your <br className="hidden sm:inline" /> business better
          </h2>
        </motion.div>

        {/* Get Early Access CTA Button */}
        <div className="z-10 flex flex-col items-center mt-auto pt-4 sm:pt-0">
          <button
            type="button"
            onClick={onOpenEarlyAccess}
            style={{ backgroundImage: "url('/btn-bg.png')" }}
            className="px-7 xs:px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-cover bg-center bg-no-repeat text-white font-['Inter'] font-normal text-xs xs:text-sm sm:text-base tracking-[0px] shadow-lg hover:opacity-90 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Get Early Access
          </button>
        </div>
      </motion.div>
    </section>
  )
}
