export interface Activity {
  id: string
  description: string
  code: string
  completed: boolean
  aiScore?: number
  aiReason?: string
}

export interface Question {
  id: string
  question: string
  answer: string
  aiScore?: number
  aiReason?: string
}

export interface VideoPresentation {
  file: File | null
  transcript?: string
  duration?: number
  score?: number
  aiReason?: string
}

export interface GradingResult {
  activities: {
    score: number
    maxScore: number
    details: Activity[]
  }
  questions: {
    score: number
    maxScore: number
    details: Question[]
  }
  presentation: {
    score: number
    maxScore: number
    duration: number
    durationPenalty: number
    aiReason?: string
  }
  latePenalty: {
    daysLate: number
    penaltyPercentage: number
    penaltyPoints: number
  }
  sharingBonus: {
    discord: boolean
    socialMedia: boolean
    bonusPoints: number
  }
  totalScore: number
  maxScore: number
  finalPercentage: number
}
