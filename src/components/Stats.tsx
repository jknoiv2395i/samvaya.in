import React, { useRef, useEffect } from "react"
import { motion, useInView, animate } from "framer-motion"

interface StatMetric {
  target: number
  prefix?: string
  suffix?: string
  formatCommas?: boolean
  duration?: number
  label: string
  mobileOnly?: boolean
}

const statsData: StatMetric[] = [
  {
    target: 120,
    prefix: "<",
    suffix: "ms",
    duration: 1.6,
    label: "Real-time latency",
  },
  {
    target: 10000,
    suffix: "+",
    formatCommas: true,
    duration: 2.0,
    label: "Conversations",
  },
  {
    target: 2,
    prefix: "<",
    suffix: "",
    duration: 1.2,
    label: "Minutes to go live",
  },
  {
    target: 85,
    suffix: "%",
    duration: 1.8,
    label: "Cost reduction",
    mobileOnly: true,
  },
]

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  formatCommas?: boolean
  duration?: number
  delay?: number
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  prefix = "",
  suffix = "",
  formatCommas = false,
  duration = 1.8,
  delay = 0.2,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })

  useEffect(() => {
    if (!inView) return

    const node = ref.current
    if (!node) return

    node.textContent = `${prefix}0${suffix}`

    let controls: { stop: () => void } | null = null

    const timer = setTimeout(() => {
      controls = animate(0, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          const rounded = Math.round(value)
          const formatted = formatCommas
            ? rounded.toLocaleString("en-US")
            : rounded.toString()
          if (node) {
            node.textContent = `${prefix}${formatted}${suffix}`
          }
        },
      })
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      if (controls) controls.stop()
    }
  }, [inView, target, prefix, suffix, formatCommas, duration, delay])

  return (
    <span ref={ref}>
      {prefix}
      {formatCommas ? target.toLocaleString("en-US") : target}
      {suffix}
    </span>
  )
}

export const Stats: React.FC = () => {
  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto mt-2 sm:mt-6 md:mt-8 pb-3 sm:pb-6 px-4">
      {/* Mobile: 2x2 grid (grid-cols-2) / PC View: 3 columns (sm:grid-cols-3) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-5 sm:gap-y-6 text-center items-center">
        {statsData.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
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
              className="font-['Inter'] font-[300] text-3xl xs:text-4xl sm:text-5xl md:text-[59.6px] leading-tight sm:leading-[60px] tracking-tight sm:tracking-[-1.8px] whitespace-nowrap"
            >
              <AnimatedCounter
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                formatCommas={stat.formatCommas}
                duration={stat.duration}
                delay={0.15 + idx * 0.08}
              />
            </div>
            <p className="text-[12px] xs:text-[13px] sm:text-sm md:text-[14px] text-neutral-600 font-normal mt-1 sm:mt-2 tracking-normal leading-tight sm:leading-relaxed text-center">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
