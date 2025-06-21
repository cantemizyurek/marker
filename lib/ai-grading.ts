import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { Activity, Question } from './types'

const activityGradingSchema = z.object({
  score: z.number().min(0).max(1),
  reason: z.string(),
})

const questionGradingSchema = z.object({
  score: z.number().min(0).max(1),
  reason: z.string(),
})

const presentationGradingSchema = z.object({
  score: z.number().min(0).max(5),
  reason: z.string(),
})

export async function gradeActivity(
  activity: Activity,
  totalActivities: number
): Promise<{ score: number; reason: string }> {
  if (!activity.description || activity.description.trim() === '') {
    return { score: 0, reason: 'No activity description provided' }
  }

  if (!activity.code || activity.code.trim() === '') {
    return { score: 0, reason: 'No code implementation provided' }
  }

  const { object } = await generateObject({
    model: openai('gpt-4.1'),
    schema: activityGradingSchema,
    topP: 0.6,
    prompt: `Grade this student's coding activity on a scale of 0-1 (where 1 is fully correct, 0.5 is partially correct, etc). 
    
    Activity description: ${activity.description}
    
    Student's code implementation:
    \`\`\`
    ${activity.code}
    \`\`\`
    
    Grading criteria:
    - Code correctness and functionality (40%)
    - Code quality and style (30%)
    - Completeness of implementation (30%)
    
    Check if the code correctly implements what was asked in the activity description.
    Be fair but strict. Only give full score (1.0) for correct, clean, and complete implementations.
    Give partial credit (0.1-0.9) for partially correct solutions.`,
  })

  const pointsPerActivity = 10 / totalActivities
  return {
    score: object.score * pointsPerActivity,
    reason: object.reason,
  }
}

export async function gradeQuestion(
  question: Question,
  totalQuestions: number
): Promise<{ score: number; reason: string }> {
  if (!question.question || question.question.trim() === '') {
    return { score: 0, reason: 'No question provided' }
  }

  if (!question.answer || question.answer.trim() === '') {
    return { score: 0, reason: 'No answer provided' }
  }

  const { object } = await generateObject({
    model: openai('gpt-4.1'),
    schema: questionGradingSchema,
    topP: 0.6,
    prompt: `Grade this student's answer on a scale of 0-1 (where 1 is fully correct, 0.5 is partially correct, etc).
    
    Question: ${question.question}
    
    Student's answer: ${question.answer}
    
    Grading criteria:
    - Correctness and accuracy (70%)
    - Completeness of explanation (30%)
    
    Be fair but strict. Only give full score (1.0) for accurate, complete, and well-explained answers.
    Give partial credit (0.1-0.9) for partially correct answers.`,
  })

  const pointsPerQuestion = 5 / totalQuestions
  return {
    score: object.score * pointsPerQuestion,
    reason: object.reason,
  }
}

export async function gradePresentation(
  transcript: string,
  duration: number,
  notebookDescription: string
): Promise<{ score: number; reason: string }> {
  const { object } = await generateObject({
    model: openai('gpt-4.1'),
    schema: presentationGradingSchema,
    topP: 0.6,
    prompt: `Grade this video presentation on a scale of 0-5 points. Be generous and supportive - we want to encourage students who make an effort to explain their work.
    
    Notebook Description: ${notebookDescription}
    
    Presentation transcript: ${transcript}
    Duration: ${Math.floor(duration / 60)} minutes ${duration % 60} seconds
    
    Grading criteria (BE LENIENT AND ENCOURAGING):
    - Did they attempt to walk through the notebook? (2 points) - Give full points if they mention the main topics
    - Do they show understanding of the concepts? (2 points) - Give full points if they explain any of the key ideas
    - Did they make an effort to present? (1 point) - Give full points if they speak clearly and try to explain
    
    IMPORTANT: 
    - Give at least 4/5 if they made a genuine attempt to present the notebook only if the video is not about the notebook than 0.
    - Only deduct points for major issues like:
      * Not talking about the notebook content at all
      * Completely unclear or incomprehensible presentation
      * Extremely short presentation (under 1 minute)
    - Focus on effort and understanding, not presentation quality
    - Be encouraging in your feedback
    
    Note: Duration penalty will be applied separately if over 5 minutes.`,
  })

  return object
}

export function calculateDurationPenalty(
  duration: number,
  baseScore: number
): number {
  const durationInMinutes = duration / 60
  if (durationInMinutes <= 5) {
    return 0
  }

  const minutesOver = Math.ceil(durationInMinutes - 5)
  const penaltyPerMinute = baseScore * 0.1
  return Math.min(baseScore, minutesOver * penaltyPerMinute)
}
