// lib/api/audit.ts
// API functions for audit flow

import {
  PitchSubmission,
  InterrogationResponse,
  VerdictResponse,
  ApiResponse,
  InterrogationQuestion,
  QuestionAnswer,
} from '@/types/audit';

export async function interrogate(
  pitch: PitchSubmission
): Promise<InterrogationResponse> {
  const response = await fetch('/api/interrogate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pitch),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate questions');
  }

  const result: ApiResponse<InterrogationResponse> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Invalid response from server');
  }

  return result.data;
}

export async function generateVerdict(
  pitch: PitchSubmission,
  questions: InterrogationQuestion[],
  answers: QuestionAnswer[]
): Promise<VerdictResponse> {
  const response = await fetch('/api/verdict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pitch,
      questions,
      answers,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate verdict');
  }

  const result: ApiResponse<VerdictResponse> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Invalid response from server');
  }

  return result.data;
}