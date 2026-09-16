import React, { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export const Pricing: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
      if (!nextMuted) {
        videoRef.current.play().catch(() => {})
      }
    }
  }

  return (
    <section id="pricing" className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24 flex flex-col items-center overflow-hidden sm:overflow-visible">
      
      {/* Top Header Badge & Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-8 md:mb-12 px-2"
      >
        {/* Golden Bird Icon */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.25, ease: "easeOut" }}
          className="mb-2 flex items-center justify-center"
        >
          <img
            src="/pricing-bird.png"
            alt="Samvaya Bird"
            className="w-14 sm:w-22 md:w-24 h-auto object-contain drop-shadow-sm select-none pointer-events-none"
          />
        </motion.div>

        {/* Section Heading */}
        <h2 className="font-['Playfair_Display'] font-normal text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.15] sm:leading-[1.1] tracking-[-0.03em] text-neutral-900 whitespace-normal sm:whitespace-nowrap">
          Hear Samvaya in action.
        </h2>

        {/* Subtitle */}
        <p className="mt-1 xs:mt-1.5 sm:mt-3 font-['Inter'] font-normal text-xs xs:text-sm sm:text-base md:text-[20px] leading-snug sm:leading-relaxed md:leading-[27.9px] tracking-[0px] text-[#666666] max-w-4xl mx-auto text-center px-2">
          Experience real-time conversations powered by sub-second latency, human inflection, and natural turn-taking.
        </p>
      </motion.div>

      {/* Main Illustrated Landscape Canvas Container - Video Player */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1180px] flex items-center justify-center overflow-hidden shadow-sm select-none rounded-[20px] sm:rounded-[28px] bg-white border border-neutral-100 group"
      >
        <video
          ref={videoRef}
          src="/pricing-video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-auto object-cover rounded-[20px] sm:rounded-[28px] drop-shadow-md cursor-pointer"
          onClick={toggleSound}
        />

        {/* Floating Sound Toggle Button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 z-20 flex items-center justify-center"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-800 stroke-[2]" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-800 stroke-[2]" />
          )}
        </button>
      </motion.div>
    </section>
  )
}
