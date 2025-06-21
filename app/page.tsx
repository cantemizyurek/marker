'use client'

import { useState } from 'react'
import { GradingResult } from '@/lib/types'
import { parseNotebookAction } from '@/app/actions/notebook-actions'
import { gradeAssignmentAction } from '@/app/actions/grade-actions'
import { motion } from 'motion/react'
import { AppHeader } from '@/components/app-header'
import { FileUploadSection } from '@/components/file-upload-section'
import { SubmissionStatusSection } from '@/components/submission-status-section'
import { SharingSection } from '@/components/sharing-section'
import { SubmitButton } from '@/components/submit-button'
import { GradingProgress } from '@/components/grading-progress'
import { GradingResults } from '@/components/grading-results'

export default function Home() {
  const [video, setVideo] = useState<File | null>(null)
  const [jupyterNotebook, setJupyterNotebook] = useState<File | null>(null)
  const [daysLate, setDaysLate] = useState(0)
  const [sharing, setSharing] = useState({ discord: false, socialMedia: false })
  const [isGrading, setIsGrading] = useState(false)
  const [gradingProgress, setGradingProgress] = useState('')
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [result, setResult] = useState<GradingResult | null>(null)
  const [progressData, setProgressData] = useState<{
    notebookUploaded?: boolean
    activitiesCount?: number
    questionsCount?: number
    videoUploaded?: boolean
    transcriptLength?: number
    videoDuration?: number
    activitiesGraded?: number
    questionsGraded?: number
    presentationScore?: number
  }>({})

  const handleGrade = async () => {
    if (!jupyterNotebook || !video) {
      alert('Please upload both the Jupyter notebook and video presentation')
      return
    }

    setIsGrading(true)
    setResult(null)
    setProgressData({})
    setGradingProgress('Initializing...')
    setProgressPercentage(0)

    try {
      setGradingProgress('Uploading notebook...')
      setProgressPercentage(10)

      const parseFormData = new FormData()
      parseFormData.append('notebook', jupyterNotebook)

      await new Promise((resolve) => setTimeout(resolve, 500))
      setProgressData((prev) => ({ ...prev, notebookUploaded: true }))

      setGradingProgress('Parsing notebook structure...')
      setProgressPercentage(20)

      await new Promise((resolve) => setTimeout(resolve, 500))

      setGradingProgress('Extracting activities and questions with AI...')
      setProgressPercentage(30)

      const parseResult = await parseNotebookAction(parseFormData)

      if (
        !parseResult.success ||
        !parseResult.activities ||
        !parseResult.questions ||
        !parseResult.notebookDescription
      ) {
        throw new Error(parseResult.error || 'Failed to parse notebook')
      }

      const activities = parseResult.activities
      const questions = parseResult.questions
      const notebookDescription = parseResult.notebookDescription
      setProgressData((prev) => ({
        ...prev,
        activitiesCount: activities.length,
        questionsCount: questions.length,
      }))
      setProgressPercentage(40)

      setGradingProgress('Uploading video file...')
      setProgressPercentage(45)

      const videoFormData = new FormData()
      videoFormData.append('video', video)

      await new Promise((resolve) => setTimeout(resolve, 500))
      setProgressData((prev) => ({ ...prev, videoUploaded: true }))

      setGradingProgress('Transcribing video with AI...')
      setProgressPercentage(55)

      const transcribeResponse = await fetch('/api/transcribe', {
        method: 'POST',
        body: videoFormData,
      })

      if (!transcribeResponse.ok) {
        throw new Error('Failed to transcribe video')
      }

      const { transcript, duration } = await transcribeResponse.json()
      setProgressData((prev) => ({
        ...prev,
        transcriptLength: transcript.split(' ').length,
        videoDuration: duration,
      }))
      setProgressPercentage(65)

      setGradingProgress('Evaluating code activities and questions...')
      setProgressPercentage(75)

      await new Promise((resolve) => setTimeout(resolve, 500))
      setProgressData((prev) => ({
        ...prev,
        activitiesGraded: activities.length,
        questionsGraded: questions.length,
      }))

      setGradingProgress('Analyzing presentation quality...')
      setProgressPercentage(85)

      const gradeResult = await gradeAssignmentAction({
        activities,
        questions,
        notebookDescription,
        videoTranscript: transcript,
        videoDuration: duration,
        daysLate,
        sharing,
      })

      if (!gradeResult.success || !gradeResult.result) {
        throw new Error(gradeResult.error || 'Failed to grade assignment')
      }

      setProgressData((prev) => ({
        ...prev,
        presentationScore: gradeResult.result!.presentation.score,
      }))

      setGradingProgress('Calculating final scores...')
      setProgressPercentage(95)

      await new Promise((resolve) => setTimeout(resolve, 500))

      setGradingProgress('Complete!')
      setProgressPercentage(100)

      setTimeout(() => {
        setResult(gradeResult.result!)
        setIsGrading(false)
        setGradingProgress('')
        setProgressPercentage(0)
        setProgressData({})
      }, 1000)
    } catch (error) {
      console.error('Grading error:', error)
      setGradingProgress('Error occurred during grading')
      setTimeout(() => {
        setIsGrading(false)
        alert(
          error instanceof Error
            ? error.message
            : 'An error occurred during grading'
        )
      }, 1000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const progressItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="max-w-2xl mx-auto px-6 py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AppHeader
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        {!isGrading && !result && (
          <motion.div className="space-y-16" variants={containerVariants}>
            <FileUploadSection
              jupyterNotebook={jupyterNotebook}
              video={video}
              onNotebookChange={setJupyterNotebook}
              onVideoChange={setVideo}
              itemVariants={itemVariants}
            />

            <SubmissionStatusSection
              daysLate={daysLate}
              onDaysLateChange={setDaysLate}
              itemVariants={itemVariants}
            />

            <SharingSection
              onSharingChange={setSharing}
              itemVariants={itemVariants}
            />

            <SubmitButton
              onSubmit={handleGrade}
              disabled={!jupyterNotebook || !video}
              itemVariants={itemVariants}
            />
          </motion.div>
        )}

        {isGrading && (
          <GradingProgress
            progressPercentage={progressPercentage}
            gradingProgress={gradingProgress}
            progressData={progressData}
            jupyterNotebook={jupyterNotebook}
            video={video}
            progressItemVariants={progressItemVariants}
          />
        )}

        {result && (
          <GradingResults
            result={result}
            onReset={() => {
              setResult(null)
              setVideo(null)
              setJupyterNotebook(null)
              setDaysLate(0)
              setSharing({ discord: false, socialMedia: false })
            }}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        )}
      </motion.div>
    </div>
  )
}
