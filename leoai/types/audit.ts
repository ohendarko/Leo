// types/audit.ts
// Frontend types matching backend API

export interface PitchSubmission {
  startupName: string;
  tagline: string;
  problemStatement: string;
  solution: string;
  targetMarket: string;
  competitiveAdvantage: string;
  currentStage: 'idea' | 'prototype' | 'mvp' | 'early-revenue' | 'scaling';
  fundingGoal?: string;
  additionalContext?: string;
}

export interface InterrogationQuestion {
  id: string;
  question: string;
  framework: 'nasss' | 'play-to-win' | 'business-model' | 'regulatory';
  rationale: string;
  category: string;
}

export interface InterrogationResponse {
  questions: InterrogationQuestion[];
  thinkingProcess?: string;
  analysisSnippet: string;
}

export interface QuestionAnswer {
  questionId: string;
  answer: string;
}

export interface SurvivalBreakdown {
  nasss_risk: number;
  strategic_viability: number;
  business_model: number;
  regulatory_readiness: number;
}

export interface VerdictResponse {
  survivalScore: number;
  breakdown: SurvivalBreakdown;
  confidence: 'high' | 'medium' | 'low';
  reportMarkdown: string;
  thinkingProcess?: string;
  criticalRisks: string[];
  keyStrengths: string[];
  actionableRecommendations: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}