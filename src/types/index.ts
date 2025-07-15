// src/types/index.ts
export interface Question {
  id: number
  category: string
  question: string
  answer: string
  keywords: string[]
  referenceText?: string[]
  referenceURI?: string[]
  difficulty: string
}
