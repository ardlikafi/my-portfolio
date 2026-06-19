import { useMotionValue, useMotionTemplate, motion } from "framer-motion"
import React, { useState, useEffect } from "react"
import { cn } from "../../lib/utils"

export const EvervaultCard = ({ text, className }) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [randomString, setRandomString] = useState("")

  useEffect(() => {
    let str = generateRandomString(1600)
    setRandomString(str)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)

    const str = generateRandomString(1600)
    setRandomString(str)
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "p-0.5 bg-transparent border border-white/5 flex items-center justify-center w-full h-full relative overflow-hidden rounded-2xl group/card",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-[#0c0c10]/80 pointer-events-none" />
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
      />
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-3xl">
          <div className="absolute w-full h-full bg-black/60 blur-md rounded-full" />
          <span className="z-20 text-white font-heading text-lg font-bold tracking-wider">{text}</span>
        </div>
      </div>
    </div>
  )
}

export function CardPattern({ mouseX, mouseY, randomString }) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 rounded-2xl [mask-image:radial-gradient(350px_at_50%_50%,white,transparent)] group-hover/card:opacity-50 transition duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-[#c5a880]/10 mix-blend-overlay" />
        <p className="absolute inset-x-0 text-xs h-full break-all font-mono text-white/10 select-none leading-none">
          {randomString}
        </p>
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-[#c5a880]/30 opacity-0 group-hover/card:opacity-100 transition duration-300"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 mix-blend-overlay"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-all font-mono text-[#c5a880] select-none leading-none">
          {randomString}
        </p>
      </motion.div>
    </div>
  )
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*"
export const generateRandomString = (length) => {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
