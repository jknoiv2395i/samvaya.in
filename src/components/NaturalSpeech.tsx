import React from "react"
import { motion } from "framer-motion"

export const NaturalSpeech: React.FC = () => {
  return (
    <section id="voice" className="relative w-full pt-10 sm:pt-16 pb-16 sm:pb-24 px-2 sm:px-8 mx-auto overflow-hidden sm:overflow-visible">
      {/* Foliage Landscape Background Layer — shifted lower */}
      <div className="absolute inset-x-0 top-40 sm:top-52 bottom-0 pointer-events-none z-0 w-full overflow-hidden flex items-end sm:items-center justify-center translate-y-4 sm:translate-y-8">
        <img
          src="/hero-bg.png"
          alt="Hero background foliage"
          className="w-full h-full object-contain sm:object-cover object-bottom sm:object-center select-none"
        />
        {/* Soft top gradient to blend cleanly with section above */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-white via-white/80 to-transparent" />
        {/* Soft bottom gradient to blend cleanly with section below */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center relative z-10 max-w-4xl mx-auto mb-8 sm:mb-16 pt-4 sm:pt-8"
      >
        {/* Headline with Golden Flying Bird top-left */}
        <div className="relative inline-block mx-auto max-w-full px-2">
          {/* Bird top-left */}
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.15, ease: "easeOut" }}
            src="/speech-bird-left.png"
            alt="Golden bird"
            className="absolute -top-7 sm:-top-13 md:-top-16 lg:-top-18 -left-3 sm:-left-9 md:-left-12 lg:-left-14 w-12 sm:w-20 md:w-26 lg:w-30 h-auto pointer-events-none select-none drop-shadow-xs z-20"
          />

          <h2 className="font-['Playfair_Display'] font-normal text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.15] sm:leading-[1.1] tracking-[-0.03em] text-neutral-900 whitespace-normal sm:whitespace-nowrap">
            Sub-second natural speech
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-1 xs:mt-1.5 sm:mt-3 font-['Inter'] font-normal text-xs xs:text-sm sm:text-base md:text-[20px] leading-snug sm:leading-relaxed md:leading-[27.9px] tracking-[0px] text-[#666666] max-w-4xl mx-auto text-center px-2">
          Indistinguishable from your best sales rep—powered by 120ms response times, natural breathing pauses, and fluid turn-taking.
        </p>
      </motion.div>

      {/* Main Container / Dashboard Card */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.95, delay: 0.1, ease: "easeOut" }}
        style={{ 
          backgroundImage: "url('/natural-speech-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        className="relative z-10 max-w-[370px] xs:max-w-[420px] sm:max-w-[990px] mx-auto pt-2 pl-2 pb-0 pr-2 sm:p-0 sm:pr-5 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden flex items-center justify-center"
      >
        <div className="flex flex-row items-end sm:items-center justify-between sm:justify-center gap-1 sm:gap-6 md:gap-8 w-full py-0 px-0 sm:px-0">
          
          {/* Left Mini Sidebar Asset */}
          <div className="w-[48%] xs:w-[50%] md:w-auto flex items-end md:items-stretch justify-start shrink-0 translate-y-0 md:translate-y-[9px] self-end">
            <img
              src="/voice-agents-sidebar.png"
              alt="Voice Agents Navigation Sidebar"
              className="h-[235px] xs:h-[260px] sm:h-[380px] md:h-[550px] w-auto object-contain object-left-bottom drop-shadow-sm select-none pointer-events-none"
            />
          </div>

          {/* Right Voice Interaction Card Container */}
          <div className="w-[53%] xs:w-[50%] md:flex-1 flex items-center justify-center p-0 sm:p-5 md:p-6 my-auto">
            <div 
              style={{ 
                backgroundImage: "url('/speech-right-card-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              className="w-full max-w-[170px] xs:max-w-[200px] sm:max-w-[310px] md:max-w-[325px] h-[195px] xs:h-[220px] sm:h-[330px] md:h-[350px] p-2 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden shrink-0 shadow-sm rounded-xl sm:rounded-3xl"
            >
              {/* Voice Orb Image Asset with Start Speaking Button */}
              <div className="relative flex items-center justify-center mb-1 w-full">
                <img
                  src="/voice-orb.png"
                  alt="Voice interaction orb"
                  className="w-48 xs:w-56 sm:w-96 md:w-[420px] h-auto object-contain select-none pointer-events-none drop-shadow-md scale-150 xs:scale-155 sm:scale-150"
                />
                {/* Center Start Speaking Badge / Button */}
                <button
                  type="button"
                  className="absolute px-2.5 xs:px-3 sm:px-5 py-1 sm:py-2 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-white/90 text-[9px] xs:text-[10px] sm:text-[13px] font-medium text-neutral-800 hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 z-10 select-none whitespace-nowrap"
                >
                  Start Speaking
                </button>
              </div>

              {/* Headline and tagline below orb */}
              <div className="text-center mt-1">
                <h3 className="text-xs xs:text-sm sm:text-[23px] font-normal text-neutral-900 tracking-tight leading-tight">
                  Voice that converts
                </h3>
                <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1 max-w-xs mx-auto leading-tight">
                  Callers can&apos;t tell it&apos;s AI.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
