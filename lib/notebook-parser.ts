import { Activity, Question } from './types'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

interface NotebookCell {
  cell_type: 'markdown' | 'code'
  source: string | string[]
  outputs?: unknown[]
}

interface JupyterNotebook {
  cells: NotebookCell[]
  metadata?: Record<string, unknown>
  nbformat?: number
  nbformat_minor?: number
}

const extractionSchema = z.object({
  notebookDescription: z
    .string()
    .describe(
      'A comprehensive summary of what this notebook covers, including main topics, concepts taught, and key learning objectives'
    ),
  activities: z.array(
    z.object({
      description: z
        .string()
        .describe('Clear description of what the activity requires'),
      code: z.string().describe('The code implementation for this activity'),
    })
  ),
  questions: z.array(
    z.object({
      question: z.string().describe('The question being asked'),
      answer: z.string().describe("The student's answer to the question"),
    })
  ),
})

export async function parseNotebook(
  notebookContent: string,
  onProgress?: (message: string) => void
): Promise<{
  activities: Activity[]
  questions: Question[]
  notebookDescription: string
}> {
  try {
    onProgress?.('Parsing notebook structure...')
    const notebook: JupyterNotebook = JSON.parse(notebookContent)

    onProgress?.('Analyzing notebook cells...')
    const cellsContent = notebook.cells.map((cell, index) => {
      const source = Array.isArray(cell.source)
        ? cell.source.join('')
        : cell.source
      return {
        index,
        type: cell.cell_type,
        content: source,
        outputs: cell.outputs || [],
      }
    })

    onProgress?.('Extracting activities and questions with AI...')
    const { object } = await generateObject({
      model: openai('gpt-4.1'),
      schema: extractionSchema,
      prompt: `Analyze this Jupyter notebook and extract:

1. A comprehensive description of what this notebook covers
2. Coding activities/exercises with their implementations
3. Questions with their answers

For the Notebook Description:
- Summarize the main topics covered in the notebook
- Identify key concepts and learning objectives
- Note the progression of topics from start to end
- Include any important themes or practical applications

For Activities, look for:
- Markdown cells that describe a coding task (e.g., "Activity 1: Create a function that...", "Exercise: Implement...", "Task: Write a function...")
- The corresponding code cell(s) that contain the student's implementation
- Combine the description and code for each activity

For Questions, look for:
- Markdown cells that pose questions (e.g., "Question 1: What is...", "Q: Explain...", or any theoretical/conceptual questions)
- The following cell(s) that contain the student's answer (can be markdown or code)
- Combine the question and answer for each question

Here are the notebook cells:
${JSON.stringify(cellsContent, null, 2)}

Extract all activities and questions, preserving the exact code and answers as written by the student.`,
    })

    onProgress?.('Processing extracted items...')
    const activities: Activity[] = object.activities.map((activity, index) => ({
      id: `activity-${index + 1}`,
      description: activity.description,
      code: activity.code,
      completed: activity.code.trim().length > 0,
    }))

    const questions: Question[] = object.questions.map((question, index) => ({
      id: `question-${index + 1}`,
      question: question.question,
      answer: question.answer,
    }))

    return {
      activities,
      questions,
      notebookDescription: object.notebookDescription,
    }
  } catch (error) {
    console.error('Failed to parse notebook:', error)
    throw new Error('Failed to parse Jupyter notebook')
  }
}
