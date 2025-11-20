// lib/frameworks/index.ts
import { FrameworkContent } from '../types';
import { nasssFramework } from './nasss';
import { playToWinFramework } from './play-to-win';
import { businessModelFramework } from './business-model';
import { regulatoryFramework } from './regulatory';

export const ALL_FRAMEWORKS: FrameworkContent[] = [
  nasssFramework,
  playToWinFramework,
  businessModelFramework,
  regulatoryFramework,
];

/**
 * Generates the complete framework context for Claude prompts
 */
export function getFrameworkContext(): string {
  return ALL_FRAMEWORKS.map(
    (framework) => `
# ${framework.name}

${framework.content}

---
`
  ).join('\n\n');
}

/**
 * Get a specific framework by slug
 */
export function getFramework(slug: string): FrameworkContent | undefined {
  return ALL_FRAMEWORKS.find((f) => f.slug === slug);
}

/**
 * Get framework names for display
 */
export function getFrameworkNames(): string[] {
  return ALL_FRAMEWORKS.map((f) => f.name);
}

/**
 * Get condensed framework summary for prompts
 */
export function getFrameworkSummary(): string {
  return `
You have access to four strategic frameworks for healthtech validation:

1. **NASSS Framework**: Analyzes 7 domains of adoption risk (Condition, Technology, Value Proposition, Adopter System, Organization, Wider Context, Embedding over Time)

2. **Play-to-Win Framework**: Evaluates strategic coherence through 5 choices (Winning Aspiration, Where to Play, How to Win, Core Capabilities, Management Systems)

3. **Healthcare Business Model Canvas**: Assesses 9 business model components (Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, Cost Structure)

4. **Digital Health Regulatory Framework**: Evaluates regulatory pathways, compliance requirements, and evidence needs (FDA, HIPAA, international regulations, clinical evidence, reimbursement)

Use these frameworks to identify gaps, risks, and strategic weaknesses in healthtech startups.
`;
}