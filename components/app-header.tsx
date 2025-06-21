import { motion } from 'motion/react'

interface AppHeaderProps {
  containerVariants: any
  itemVariants: any
}

export function AppHeader({ containerVariants, itemVariants }: AppHeaderProps) {
  return (
    <motion.div className="text-center mb-24" variants={itemVariants}>
      <motion.div
        className="inline-flex items-center gap-2 mb-8"
        variants={itemVariants}
      >
        <motion.div
          className="w-1 h-1 bg-black rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-xs text-gray-500 font-medium tracking-[0.2em] uppercase">
          AI Grading
        </span>
      </motion.div>
      <motion.h1
        className="text-[2.5rem] font-light text-black mb-4 tracking-[-0.02em] leading-[1.1]"
        variants={itemVariants}
      >
        Assignment Grader
      </motion.h1>
      <motion.p
        className="text-gray-600 font-light text-lg leading-relaxed"
        variants={itemVariants}
      >
        Upload files, receive intelligent analysis
      </motion.p>
    </motion.div>
  )
}
