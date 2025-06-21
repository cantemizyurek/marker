'use server'

import { gradeAssignment } from '@/lib/grade-assignment'
import { Activity, Question, GradingResult } from '@/lib/types'

export async function gradeAssignmentAction({
  activities,
  questions,
  notebookDescription,
  videoTranscript,
  videoDuration,
  daysLate,
  sharing,
}: {
  activities: Activity[]
  questions: Question[]
  notebookDescription: string
  videoTranscript: string
  videoDuration: number
  daysLate: number
  sharing: { discord: boolean; socialMedia: boolean }
}): Promise<{
  success: boolean
  result?: GradingResult
  error?: string
}> {
  try {
    const result = await gradeAssignment({
      activities,
      questions,
      notebookDescription,
      videoTranscript,
      videoDuration,
      daysLate,
      sharing,
    })

    return { success: true, result }
  } catch (error) {
    console.error('Grading error:', error)
    return { success: false, error: 'Failed to grade assignment' }
  }
}
