// lib/anthropic.ts
// Anthropic Claude client configuration

import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY environment variable is not set');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Helper to extract thinking blocks from response
export function extractThinking(response: Anthropic.Messages.Message): string | undefined {
  const thinkingBlock = response.content.find(
    (block) => block.type === 'thinking'
  );
  
  return thinkingBlock && 'thinking' in thinkingBlock 
    ? thinkingBlock.thinking 
    : undefined;
}

// Helper to extract text content from response
export function extractText(response: Anthropic.Messages.Message): string {
  return response.content
    .filter((block) => block.type === 'text')
    .map((block) => 'text' in block ? block.text : '')
    .join('\n\n');
}

// Utility to handle API errors consistently
export function handleAnthropicError(error: unknown): string {
  if (error instanceof Anthropic.APIError) {
    return `Anthropic API Error: ${error.message} (Status: ${error.status})`;
  }
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }
  return 'An unknown error occurred';
}