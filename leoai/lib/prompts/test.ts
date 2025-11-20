// lib/prompts/test.ts
import { buildInterrogationPrompt } from './interrogate';
import { PitchSubmission } from '../types';

const testPitch: PitchSubmission = {
  startupName: 'CardioWatch AI',
  tagline: 'AI-powered cardiac monitoring',
  problemStatement: 'Heart failure readmissions cost Medicare $17B annually',
  solution: 'Wearable + AI predicts deterioration 48 hours early',
  targetMarket: 'Post-discharge Medicare heart failure patients',
  competitiveAdvantage: 'Proprietary ECG algorithm with 92% accuracy',
  currentStage: 'mvp',
  fundingGoal: '$2M seed round',
};

console.log('=== Interrogation Prompt Test ===\n');

const prompt = buildInterrogationPrompt(testPitch);

console.log('Prompt Length:', prompt.length, 'characters');
console.log('\nFirst 500 characters:');
console.log(prompt.substring(0, 500));
console.log('\n...\n');
console.log('Last 300 characters:');
console.log(prompt.substring(prompt.length - 300));

console.log('\n✅ Prompt system is working!');