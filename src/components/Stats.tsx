import React from "react"

interface StatItem {
  value: string
  label: string
  mobileOnly?: boolean
}

const statsData: StatItem[] = [
  {
    value: "<120ms",
    label: "Real-time latency",
  },
  {
    value: "10,000+",
    label: "Conversions",
  },
  {
    value: "<2",
    label: "Minutes to go live",
  },
  {
    value: "85%",
    label: "Cost reduction",
    mobileOnly: true,
  },
]

export const Stats: React.FC = () => {
  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto mt-2 sm:mt-6 md:mt-8 pb-3 sm:pb-6 px-4">
      {/* Mobile: 2 rows of 2 (grid-cols-2) / Desktop: original 3 columns (sm:grid-cols-3) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5 sm:gap-6 text-center items-center">
        {statsData.map((stat, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center justify-center py-1 sm:py-0 ${
              stat.mobileOnly ? "sm:hidden" : ""
            }`}
          >
            <div
              style={{
                backgroundImage: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="font-['Inter'] font-[300] text-4xl xs:text-[42px] sm:text-5xl md:text-[59.6px] leading-tight sm:leading-[60px] tracking-tight sm:tracking-[-1.8px] whitespace-nowrap"
            >
              {stat.value}
            </div>
            <p className="text-[13px] xs:text-sm md:text-[14px] text-neutral-600 font-normal mt-1 sm:mt-2 tracking-normal leading-tight sm:leading-relaxed text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
