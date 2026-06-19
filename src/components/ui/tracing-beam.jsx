import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const updateHeight = () => {
      setSvgHeight(ref.current.offsetHeight)
    }
    updateHeight()
    // Observe resize
    const resizeObserver = new ResizeObserver(() => updateHeight())
    resizeObserver.observe(ref.current)
    return () => resizeObserver.disconnect()
  }, [])

  const y1 = useTransform(scrollYProgress, [0, 0.8], [50, svgHeight])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 10])

  return (
    <div ref={ref} className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <div className="absolute -left-4 md:-left-20 top-3">
        <div className="h-4 w-4 rounded-full border border-neutral-700 flex items-center justify-center">
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "var(--color-gold)" : "rgba(255,255,255,0.1)",
              borderColor: scrollYProgress.get() > 0 ? "var(--color-gold)" : "rgba(255,255,255,0.1)",
            }}
            className="h-2 w-2 rounded-full bg-neutral-800 border border-neutral-700"
          />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-[7px] block"
          aria-hidden="true"
        >
          <path
            d={`M 1 0 V ${svgHeight - 10}`}
            fill="none"
            stroke="#1f2937"
            strokeWidth="1.5"
          />
          <motion.path
            d={`M 1 0 V ${svgHeight - 10}`}
            fill="none"
            stroke="#c5a880"
            strokeWidth="1.5"
            strokeDasharray="0 1"
            style={{
              pathLength: scrollYProgress,
            }}
          />
        </svg>
      </div>
      <div className="pl-6 md:pl-0">{children}</div>
    </div>
  )
}
