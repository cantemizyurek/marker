'use server'

import { parseNotebook } from '@/lib/notebook-parser'
import { Activity, Question } from '@/lib/types'

export async function parseNotebookAction(formData: FormData): Promise<{
  success: boolean
  activities?: Activity[]
  questions?: Question[]
  notebookDescription?: string
  error?: string
}> {
  try {
    const file = formData.get('notebook') as File
    
    if (!file) {
      return { success: false, error: 'No notebook file provided' }
    }

    const content = await file.text()
    const { activities, questions, notebookDescription } = await parseNotebook(content)
    
    return { success: true, activities, questions, notebookDescription }
  } catch (error) {
    console.error('Failed to parse notebook:', error)
    return { success: false, error: 'Failed to parse notebook' }
  }
}