import { motion } from 'motion/react'

interface SubmitButtonProps {
  onSubmit: () => void
  disabled: boolean
  itemVariants: any
}

export function SubmitButton({
  onSubmit,
  disabled,
  itemVariants,
}: SubmitButtonProps) {
  return (
    <motion.div className="flex justify-center pt-8" variants={itemVariants}>
      <motion.button
        onClick={onSubmit}
        disabled={disabled}
        className="group relative px-8 py-3 bg-black text-white rounded-full text-sm font-medium
                 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
                 transition-all duration-200"
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.span
          animate={
            disabled
              ? {}
              : {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="bg-gradient-to-r from-white via-white to-white bg-[length:200%_100%] bg-clip-text"
        >
          Start Analysis
        </motion.span>
      </motion.button>
    </motion.div>
  )
}
