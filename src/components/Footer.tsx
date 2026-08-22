import React from "react"

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Footer card with sky gradient background */}
      <div
        className="relative mx-4 sm:mx-6 lg:mx-8 mb-6 rounded-[32px] sm:rounded-[40px] overflow-hidden flex items-end justify-center"
        style={{
          background: "linear-gradient(to bottom, #bde8f7 0%, #e8f6fc 40%, #ffffff 100%)",
          minHeight: "260px",
        }}
      >
        {/* Large SAMVAYA text with nature texture via background-clip */}
        <div className="w-full flex items-end justify-center overflow-hidden">
          <h1
            className="font-['Jersey_25'] font-normal select-none leading-none tracking-wide"
            style={{
              fontSize: "clamp(120px, 22vw, 340px)",
              backgroundImage: "url('/samvaya-stripes.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 1,
              marginBottom: "-0.08em",
            }}
          >
            SAMVAYA
          </h1>
        </div>
      </div>
    </footer>
  )
}
