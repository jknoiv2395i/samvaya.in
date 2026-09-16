import React from "react"

interface StatItem {
  value: string
  label: string
  highlight?: boolean
}

const statsData: StatItem[] = [
  {
    value: "<120ms",
    label: "Real-time latency",
    highlight: true,
  },
  {
    value: "10,000+",
    label: "Conversations",
  },
  {
    value: "<2",
    label: "Minutes to go live",
  },
]

export const Stats: React.FC = () => {
  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto mt-2 sm:mt-6 md:mt-8 pb-2 sm:pb-6 px-2 sm:px-4">
      {/* Always horizontal 3-column grid on mobile, tablet, and desktop */}
      <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6 text-center items-center">
        {statsData.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center py-1 sm:py-0">
            <div
              style={{
                backgroundImage: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="font-['Inter'] font-[300] text-2xl xs:text-3xl sm:text-5xl md:text-[59.6px] leading-tight sm:leading-[60px] tracking-tight sm:tracking-[-1.8px] whitespace-nowrap"
            >
              {stat.value}
            </div>
            <p className="text-[11px] xs:text-xs sm:text-sm md:text-[14px] text-neutral-500 font-normal mt-0.5 sm:mt-2 tracking-normal leading-tight sm:leading-relaxed text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

