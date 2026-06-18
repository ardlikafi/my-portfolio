import { motion } from 'framer-motion'

export default function LineArtAnimation() {
  // SVG drawing animation variants
  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: custom * 0.3, type: "spring", duration: 1.8, bounce: 0 },
        opacity: { delay: custom * 0.3, duration: 0.2 }
      }
    })
  }

  // Soft floating/pulsing holographic animation
  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Pulsing synapse nodes
  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="line-art-container" style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '24px auto 0' }}>
      <motion.svg
        width="100%"
        height="190"
        viewBox="0 0 400 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Cyan Glow Filter */}
          <filter id="neon-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Purple Glow Filter */}
          <filter id="neon-glow-purple" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Main Neural Input Beam (Tether connecting name to the AI Brain) */}
        <motion.path
          d="M 10 95 C 90 95, 100 160, 170 120 C 210 95, 200 95, 240 95"
          stroke="url(#neon-tether-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={drawVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        />

        <defs>
          <linearGradient id="neon-tether-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* 2. Floating AI Cybernetic Brain Group */}
        <motion.g
          variants={floatVariants}
          animate="animate"
        >
          {/* Brain stem (Vertical data bus line) */}
          <motion.path
            d="M 270 150 L 270 95 L 290 80"
            stroke="#6c5ce7"
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          />

          {/* Lobe 1: Frontal Lobe (High-tech circuit path curves - Cyan) */}
          <motion.path
            d="M 270 95 C 270 50, 310 40, 340 50 C 370 60, 380 90, 350 110 C 330 125, 310 115, 290 125 Z"
            stroke="#00f5d4"
            strokeWidth="2.5"
            filter="url(#neon-glow-cyan)"
            strokeLinecap="round"
            variants={drawVariants}
            custom={1.5}
            initial="hidden"
            animate="visible"
          />

          {/* Lobe 2: Cerebellum (Intricate computing mesh - Purple) */}
          <motion.path
            d="M 270 120 C 250 120, 240 140, 260 155 C 280 170, 300 160, 290 140 C 280 135, 275 130, 270 120 Z"
            stroke="#6c5ce7"
            strokeWidth="2"
            filter="url(#neon-glow-purple)"
            strokeLinecap="round"
            variants={drawVariants}
            custom={2}
            initial="hidden"
            animate="visible"
          />

          {/* Synapse Connection lines inside Frontal Lobe */}
          <motion.path
            d="M 300 70 L 330 65 L 350 85 M 330 65 L 320 95 L 340 105"
            stroke="rgba(0, 245, 212, 0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={drawVariants}
            custom={2.2}
            initial="hidden"
            animate="visible"
          />

          {/* Synapse nodes (Glowing points pulsing) */}
          <motion.g variants={pulseVariants} animate="animate">
            <circle cx="300" cy="70" r="3.5" fill="#00f5d4" />
            <circle cx="330" cy="65" r="3.5" fill="#ffffff" />
            <circle cx="350" cy="85" r="3.5" fill="#00f5d4" />
            <circle cx="320" cy="95" r="3.5" fill="#6c5ce7" />
            <circle cx="340" cy="105" r="3.5" fill="#00f5d4" />
            <circle cx="260" cy="140" r="3" fill="#6c5ce7" />
            <circle cx="280" cy="155" r="3" fill="#ffffff" />
          </motion.g>

          {/* Holographic light rings around the brain core */}
          <motion.ellipse
            cx="310"
            cy="145"
            rx="45"
            ry="12"
            stroke="#6c5ce7"
            strokeWidth="1"
            strokeDasharray="4 8"
            transform="rotate(-15, 310, 145)"
            variants={drawVariants}
            custom={2.6}
            initial="hidden"
            animate="visible"
          />
          
          <motion.ellipse
            cx="310"
            cy="145"
            rx="55"
            ry="15"
            stroke="#00f5d4"
            strokeWidth="1"
            strokeDasharray="6 6"
            transform="rotate(-15, 310, 145)"
            variants={drawVariants}
            custom={2.8}
            initial="hidden"
            animate="visible"
          />
        </motion.g>

        {/* Binary Floating Data Streams (0s and 1s) representing AI computation */}
        <motion.text x="360" y="35" fill="rgba(0, 245, 212, 0.4)" fontSize="9" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: 4, repeat: Infinity }}>101</motion.text>
        <motion.text x="230" y="75" fill="rgba(108, 92, 231, 0.4)" fontSize="9" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>01</motion.text>
        <motion.text x="300" y="180" fill="rgba(0, 245, 212, 0.4)" fontSize="9" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}>LSTM</motion.text>
      </motion.svg>

      {/* Floating Status / Label */}
      <motion.div
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '5px',
          fontSize: '0.72rem',
          color: 'var(--c-accent)',
          fontFamily: 'var(--font-mono)',
          opacity: 0.7,
          letterSpacing: '1px'
        }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.75, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        // COGNITIVE_NEURAL_NET_READY
      </motion.div>
    </div>
  )
}
