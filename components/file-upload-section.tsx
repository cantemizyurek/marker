import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FileUploadSectionProps {
  jupyterNotebook: File | null
  video: File | null
  onNotebookChange: (file: File | null) => void
  onVideoChange: (file: File | null) => void
  itemVariants: any
}

export function FileUploadSection({
  jupyterNotebook,
  video,
  onNotebookChange,
  onVideoChange,
  itemVariants,
}: FileUploadSectionProps) {
  return (
    <motion.div className="space-y-8" variants={itemVariants}>
      <motion.div className="space-y-6">
        <motion.div variants={itemVariants}>
          <Label className="text-xs text-gray-500 font-medium tracking-wider uppercase mb-4 block">
            Jupyter Notebook
          </Label>
          <motion.div
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Input
              type="file"
              accept=".ipynb"
              onChange={(e) => onNotebookChange(e.target.files?.[0] || null)}
              className="hidden"
              id="notebook-upload"
            />
            <label
              htmlFor="notebook-upload"
              className="group block border border-gray-200 rounded-2xl p-8 cursor-pointer 
                       hover:border-gray-300 transition-all duration-300 bg-white"
            >
              <motion.div
                initial={false}
                animate={jupyterNotebook ? { scale: 1 } : { scale: 1 }}
                className="text-center"
              >
                {jupyterNotebook ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-black"
                  >
                    <motion.div
                      className="w-8 h-8 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <p className="font-medium text-sm text-black mb-1">
                      {jupyterNotebook.name}
                    </p>
                    <p className="text-xs text-gray-500">Click to replace</p>
                  </motion.div>
                ) : (
                  <div className="text-gray-400">
                    <div className="w-8 h-8 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-150 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-sm text-gray-700 mb-1">
                      Select notebook
                    </p>
                    <p className="text-xs text-gray-400">.ipynb files</p>
                  </div>
                )}
              </motion.div>
            </label>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label className="text-xs text-gray-500 font-medium tracking-wider uppercase mb-4 block">
            Video Presentation
          </Label>
          <motion.div
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => onVideoChange(e.target.files?.[0] || null)}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="group block border border-gray-200 rounded-2xl p-8 cursor-pointer 
                       hover:border-gray-300 transition-all duration-300 bg-white"
            >
              <motion.div
                initial={false}
                animate={video ? { scale: 1 } : { scale: 1 }}
                className="text-center"
              >
                {video ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-black"
                  >
                    <motion.div
                      className="w-8 h-8 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <p className="font-medium text-sm text-black mb-1">
                      {video.name}
                    </p>
                    <p className="text-xs text-gray-500">Click to replace</p>
                  </motion.div>
                ) : (
                  <div className="text-gray-400">
                    <div className="w-8 h-8 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-150 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-sm text-gray-700 mb-1">
                      Select video
                    </p>
                    <p className="text-xs text-gray-400">MP4, MOV, AVI</p>
                  </div>
                )}
              </motion.div>
            </label>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
