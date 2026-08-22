import React from "react"

export const NaturalSpeech: React.FC = () => {

  return (
    <section id="voice" className="relative w-full pt-12 sm:pt-16 pb-24 px-4 sm:px-8 mx-auto overflow-visible">
      {/* Mountain Landscape Background Layer — same expand/contract as Hero bg */}
      <div className="absolute inset-x-0 top-40 bottom-0 pointer-events-none z-0 w-full overflow-hidden flex items-center justify-center">
        <img
          src="/mountains-bg.png"
          alt="Mountain landscape background"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Soft top gradient to blend cleanly with section above */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white via-white/80 to-transparent" />
        {/* Soft bottom gradient to blend cleanly with section below */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Top Header */}
      <div className="text-center relative z-10 max-w-4xl mx-auto mb-16 pt-6 sm:pt-8">
        {/* Headline with Golden Flying Bird top-left */}
        <div className="relative inline-block mx-auto">
          {/* Bird top-left */}
          <img
            src="/speech-bird-left.png"
            alt="Golden bird"
            className="absolute -top-11 sm:-top-13 md:-top-16 lg:-top-18 -left-7 sm:-left-9 md:-left-12 lg:-left-14 w-16 sm:w-20 md:w-26 lg:w-30 h-auto pointer-events-none select-none drop-shadow-xs z-20 animate-float-slow"
          />

          <h2 className="font-['Playfair_Display'] font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] sm:leading-[1.1] tracking-[-0.03em] text-neutral-900 whitespace-nowrap">
            Sub-second natural speech
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-1 sm:mt-1.5 md:mt-2 font-['Inter'] font-normal text-sm sm:text-base md:text-[20px] leading-relaxed md:leading-[27.9px] tracking-[0px] text-[#666666] max-w-4xl mx-auto text-center">
          Indistinguishable from your best sales rep—powered by 120ms response times, natural breathing pauses, and fluid turn-taking.
        </p>
      </div>

      {/* Main Container / Dashboard Card */}
      <div 
        style={{ 
          backgroundImage: "url('/natural-speech-bg.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        className="relative z-10 max-w-[990px] mx-auto p-0 pr-3 sm:pr-5 min-h-[460px] sm:min-h-[500px] shadow-sm flex items-center justify-between overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-8 w-full h-full">
          
          {/* Left Mini Sidebar Asset - shifted down 9px */}
          <div className="w-full md:w-auto flex items-stretch justify-start shrink-0 ml-2 translate-y-[9px]">
            <img
              src="/voice-agents-sidebar.png"
              alt="Voice Agents Navigation Sidebar"
              className="h-[480px] sm:h-[530px] md:h-[550px] w-auto object-contain object-left-top drop-shadow-sm select-none pointer-events-none"
            />
          </div>

          {/* Right Voice Interaction Card Container - centered in the middle */}
          <div className="flex-1 flex items-center justify-center p-3 sm:p-5 md:p-6 my-auto">
            <div 
              style={{ 
                backgroundImage: "url('/speech-right-card-bg.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              className="w-full max-w-[280px] sm:max-w-[310px] md:max-w-[325px] min-h-[300px] sm:min-h-[330px] md:min-h-[350px] p-3 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden shrink-0 shadow-sm rounded-2xl sm:rounded-3xl"
            >
              {/* Voice Orb Image Asset with Start Speaking Button */}
              <div className="relative flex items-center justify-center mb-1">
                <img
                  src="/voice-orb.png"
                  alt="Voice interaction orb"
                  className="w-80 sm:w-96 md:w-[420px] h-auto object-contain select-none pointer-events-none drop-shadow-md scale-150 animate-orb-shimmer"
                />
                {/* Center Start Speaking Badge / Button */}
                <button
                  type="button"
                  className="absolute px-5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.08)] border border-white/90 text-xs sm:text-[13px] font-medium text-neutral-800 hover:bg-white hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 z-10 select-none whitespace-nowrap"
                >
                  Start Speaking
                </button>
              </div>

              {/* Headline and tagline below orb */}
              <div className="text-center mt-1">
                <h3 className="text-xl sm:text-[23px] font-normal text-neutral-900 tracking-tight">
                  Voice that converts
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Callers can&apos;t tell it&apos;s AI. That&apos;s the point.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
