import { motion } from 'motion/react'

interface ProgressData {
  notebookUploaded?: boolean
  activitiesCount?: number
  questionsCount?: number
  videoUploaded?: boolean
  transcriptLength?: number
  videoDuration?: number
  activitiesGraded?: number
  questionsGraded?: number
  presentationScore?: number
}

interface GradingProgressProps {
  progressPercentage: number
  gradingProgress: string
  progressData: ProgressData
  jupyterNotebook: File | null
  video: File | null
  progressItemVariants: any
}

export function GradingProgress({
  progressPercentage,
  gradingProgress,
  progressData,
  jupyterNotebook,
  video,
  progressItemVariants,
}: GradingProgressProps) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md space-y-12">
        <div className="text-center">
          <motion.div
            className="relative w-16 h-16 mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            {progressPercentage === 100 ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="w-full h-full bg-black rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </svg>
              </motion.div>
            ) : (
              <div className="relative">
                <svg
                  className="w-16 h-16 transform -rotate-90"
                  viewBox="0 0 64 64"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-black"
                    strokeLinecap="round"
                    style={{
                      pathLength: progressPercentage / 100,
                    }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progressPercentage / 100 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-black">
                    {progressPercentage}%
                  </span>
                </div>
              </div>
            )}
          </motion.div>
          <motion.h2
            className="text-xl font-light text-black mb-2"
            key={progressPercentage === 100 ? 'complete' : 'processing'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {progressPercentage === 100 ? 'Complete' : 'Processing'}
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm font-light"
            key={gradingProgress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {gradingProgress}
          </motion.p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            {progressData.notebookUploaded && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="text-xs text-gray-500 font-medium">
                  Notebook processed
                </span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1 h-1 bg-black rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                  <span className="text-xs text-black font-medium truncate max-w-32">
                    {jupyterNotebook?.name}
                  </span>
                </div>
              </motion.div>
            )}

            {progressData.activitiesCount !== undefined && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Activities found
                </span>
                <span className="text-xs text-black font-medium">
                  {progressData.activitiesCount}
                </span>
              </motion.div>
            )}

            {progressData.questionsCount !== undefined && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Questions found
                </span>
                <span className="text-xs text-black font-medium">
                  {progressData.questionsCount}
                </span>
              </motion.div>
            )}

            {progressData.videoUploaded && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Video processed
                </span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1 h-1 bg-black rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                  <span className="text-xs text-black font-medium truncate max-w-32">
                    {video?.name}
                  </span>
                </div>
              </motion.div>
            )}

            {progressData.transcriptLength !== undefined && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Transcript generated
                </span>
                <span className="text-xs text-black font-medium">
                  {progressData.transcriptLength} words
                </span>
              </motion.div>
            )}

            {progressData.activitiesGraded !== undefined && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Activities graded
                </span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1 h-1 bg-black rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                  <span className="text-xs text-black font-medium">
                    {progressData.activitiesGraded}
                  </span>
                </div>
              </motion.div>
            )}

            {progressData.questionsGraded !== undefined && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Questions graded
                </span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1 h-1 bg-black rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                  <span className="text-xs text-black font-medium">
                    {progressData.questionsGraded}
                  </span>
                </div>
              </motion.div>
            )}

            {progressData.presentationScore !== undefined && (
              <motion.div
                className="flex items-center justify-between py-2"
                variants={progressItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              >
                <span className="text-xs text-gray-500 font-medium">
                  Presentation analyzed
                </span>
                <span className="text-xs text-black font-medium">
                  {progressData.presentationScore}/5
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
