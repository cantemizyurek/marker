import { Activity, Question, GradingResult } from './types'
import {
  gradeActivity,
  gradeQuestion,
  gradePresentation,
  calculateDurationPenalty,
} from './ai-grading'

interface GradeAssignmentParams {
  activities: Activity[]
  questions: Question[]
  notebookDescription: string
  videoTranscript: string
  videoDuration: number
  daysLate: number
  sharing: { discord: boolean; socialMedia: boolean }
}

export async function gradeAssignment({
  activities,
  questions,
  notebookDescription,
  videoTranscript,
  videoDuration,
  daysLate,
  sharing,
}: GradeAssignmentParams): Promise<GradingResult> {
  const activityResults = await Promise.all(
    activities.map(async (activity) => {
      const grading = await gradeActivity(activity, activities.length)
      return {
        ...activity,
        aiScore: grading.score,
        aiReason: grading.reason,
      }
    })
  )

  const questionResults = await Promise.all(
    questions.map(async (question) => {
      const grading = await gradeQuestion(question, questions.length)
      return {
        ...question,
        aiScore: grading.score,
        aiReason: grading.reason,
      }
    })
  )

  let presentationScore = 0
  let presentationReason = 'No video provided'
  let durationPenalty = 0

  if (videoTranscript) {
    const presentationGrading = await gradePresentation(
      videoTranscript,
      videoDuration,
      notebookDescription
    )
    presentationScore = presentationGrading.score
    presentationReason = presentationGrading.reason
    durationPenalty = calculateDurationPenalty(videoDuration, presentationScore)
    presentationScore = Math.max(0, presentationScore - durationPenalty)
  }

  const activitiesScore = activityResults.reduce(
    (sum, a) => sum + (a.aiScore || 0),
    0
  )
  const questionsScore = questionResults.reduce(
    (sum, q) => sum + (q.aiScore || 0),
    0
  )

  const activitiesMaxScore = 10
  const questionsMaxScore = 5
  const presentationMaxScore = 5

  const sharingBonusPoints =
    (sharing.discord ? 1 : 0) + (sharing.socialMedia ? 2 : 0)

  const subtotal = activitiesScore + questionsScore + presentationScore
  const maxScore = activitiesMaxScore + questionsMaxScore + presentationMaxScore

  const penalty = daysLate * 0.2
  const penaltyPoints = maxScore * penalty

  const totalScore = Math.max(0, subtotal - penaltyPoints + sharingBonusPoints)
  const finalPercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0

  return {
    activities: {
      score: activitiesScore,
      maxScore: activitiesMaxScore,
      details: activityResults,
    },
    questions: {
      score: questionsScore,
      maxScore: questionsMaxScore,
      details: questionResults,
    },
    presentation: {
      score: presentationScore,
      maxScore: presentationMaxScore,
      duration: videoDuration,
      durationPenalty,
      aiReason: presentationReason,
    },
    latePenalty: {
      daysLate,
      penaltyPercentage: penalty * 100,
      penaltyPoints,
    },
    sharingBonus: {
      discord: sharing.discord,
      socialMedia: sharing.socialMedia,
      bonusPoints: sharingBonusPoints,
    },
    totalScore,
    maxScore,
    finalPercentage,
  }
}
