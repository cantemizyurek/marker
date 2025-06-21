import { motion } from 'motion/react'
import { GradingResult } from '@/lib/types'

interface GradingResultsProps {
  result: GradingResult
  onReset: () => void
  containerVariants: any
  itemVariants: any
}

export function GradingResults({
  result,
  onReset,
  containerVariants,
  itemVariants,
}: GradingResultsProps) {
  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="w-1 h-1 bg-black rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-gray-500 font-medium tracking-[0.2em] uppercase">
            Analysis Complete
          </span>
        </motion.div>
        <motion.h2
          className="text-[3rem] font-light text-black mb-4 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {result.finalPercentage.toFixed(1)}%
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Final Grade
        </motion.p>
      </div>

      <motion.div
        className="border border-gray-200 rounded-2xl p-8 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-black">
              Overall Score
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {result.totalScore.toFixed(1)}/{result.maxScore}
            </span>
          </div>
          <div className="relative">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${result.finalPercentage}%` }}
                transition={{
                  delay: 0.7,
                  duration: 1.2,
                  ease: 'easeOut',
                }}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center p-6 border border-gray-100 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-500 font-medium">
                Activities
              </span>
              <span className="text-xs text-gray-400">
                ({result.activities.details.length})
              </span>
            </div>
            <motion.p
              className="text-2xl font-light text-black mb-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
            >
              {result.activities.score.toFixed(1)}
            </motion.p>
            <p className="text-xs text-gray-500">
              of {result.activities.maxScore}
            </p>
          </motion.div>

          <motion.div
            className="text-center p-6 border border-gray-100 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-500 font-medium">
                Questions
              </span>
              <span className="text-xs text-gray-400">
                ({result.questions.details.length})
              </span>
            </div>
            <motion.p
              className="text-2xl font-light text-black mb-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: 'spring' }}
            >
              {result.questions.score.toFixed(1)}
            </motion.p>
            <p className="text-xs text-gray-500">
              of {result.questions.maxScore}
            </p>
          </motion.div>

          <motion.div
            className="text-center p-6 border border-gray-100 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500 font-medium">
                Presentation
              </span>
            </div>
            <motion.p
              className="text-2xl font-light text-black mb-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5, type: 'spring' }}
            >
              {result.presentation.score}
            </motion.p>
            <p className="text-xs text-gray-500">
              of {result.presentation.maxScore}
            </p>
          </motion.div>
        </motion.div>

        {result.latePenalty.daysLate > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-amber-700 font-medium">
                Late penalty: -{result.latePenalty.penaltyPoints.toFixed(1)}{' '}
                points ({result.latePenalty.penaltyPercentage}%)
              </span>
            </div>
          </motion.div>
        )}

        {result.sharingBonus.bonusPoints > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1 h-1 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-xs text-emerald-700 font-medium">
                  Sharing bonus: +{result.sharingBonus.bonusPoints} points
                </span>
              </div>
              <div className="flex items-center gap-3">
                {result.sharingBonus.discord && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-indigo-100 rounded-full">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <span className="text-xs text-indigo-600 font-medium">
                      +1
                    </span>
                  </div>
                )}
                {result.sharingBonus.socialMedia && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-full">
                    <svg
                      className="w-3 h-3 text-orange-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    <span className="text-xs text-orange-600 font-medium">
                      +2
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="border border-gray-200 rounded-2xl p-8 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <span className="text-sm font-medium text-black">
            Detailed Feedback
          </span>
        </div>

        <div className="space-y-8">
          {result.activities.details.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-4">
                Activities ({result.activities.details.length})
              </h4>
              <div className="space-y-4">
                {result.activities.details.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="p-4 border border-gray-100 rounded-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.4 + index * 0.1,
                      duration: 0.4,
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium text-black">
                          Activity {index + 1}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {activity.aiScore?.toFixed(1)}/
                        {(10 / result.activities.details.length).toFixed(1)}{' '}
                        points
                      </span>
                    </div>
                    {activity.aiReason && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {activity.aiReason}
                      </p>
                    )}
                    {!activity.aiReason && (
                      <p className="text-xs text-gray-400 italic">
                        No detailed feedback available
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {result.questions.details.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-4">
                Questions ({result.questions.details.length})
              </h4>
              <div className="space-y-4">
                {result.questions.details.map((question, index) => (
                  <motion.div
                    key={question.id}
                    className="p-4 border border-gray-100 rounded-xl"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.5 + index * 0.1,
                      duration: 0.4,
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                        <span className="text-xs font-medium text-black">
                          Question {index + 1}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {question.aiScore?.toFixed(1)}/
                        {(5 / result.questions.details.length).toFixed(1)}{' '}
                        points
                      </span>
                    </div>
                    {question.aiReason && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {question.aiReason}
                      </p>
                    )}
                    {!question.aiReason && (
                      <p className="text-xs text-gray-400 italic">
                        No detailed feedback available
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-4">
              Presentation
            </h4>
            <motion.div
              className="p-4 border border-gray-100 rounded-xl"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-black">
                    Video Analysis
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {result.presentation.score}/{result.presentation.maxScore}{' '}
                  points
                </span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Duration</span>
                  <span className="text-xs text-black font-medium">
                    {Math.floor(result.presentation.duration / 60)}:
                    {(result.presentation.duration % 60)
                      .toString()
                      .padStart(2, '0')}
                  </span>
                </div>
                {result.presentation.durationPenalty > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-600">
                      Duration penalty
                    </span>
                    <span className="text-xs text-red-600 font-medium">
                      -{result.presentation.durationPenalty} points
                    </span>
                  </div>
                )}
              </div>
              {result.presentation.aiReason && (
                <p className="text-xs text-gray-600 leading-relaxed">
                  {result.presentation.aiReason}
                </p>
              )}
              {!result.presentation.aiReason && (
                <p className="text-xs text-gray-400 italic">
                  No detailed feedback available
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        <motion.button
          onClick={onReset}
          className="px-6 py-2 text-xs font-medium text-gray-600 hover:text-black 
                   border border-gray-200 rounded-full hover:border-gray-300 
                   transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Grade Another Assignment
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
