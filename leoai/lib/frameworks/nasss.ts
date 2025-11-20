// lib/frameworks/nasss.ts
import { FrameworkContent } from '../types';

export const nasssFramework: FrameworkContent = {
  name: 'NASSS Framework',
  slug: 'nasss',
  description: 'Non-adoption, Abandonment, Scale-up, Spread, and Sustainability Framework',
  content: `
# NASSS Framework for Digital Health Technology Assessment

## Overview
The NASSS framework predicts success/failure of technology-supported health programs by examining seven domains.

## The 7 Domains

### 1. CONDITION
- Simple: Clear diagnosis, stable condition
- Complex: Multiple comorbidities, uncertain diagnosis

### 2. TECHNOLOGY
- Simple: Mature, reliable, user-friendly
- Complex: Cutting-edge, unproven, high failure rate

### 3. VALUE PROPOSITION
- Simple: Clear, measurable benefits with strong evidence
- Complex: Contested value, different stakeholders see different benefits

### 4. ADOPTER SYSTEM (Users)
- Simple: Motivated, tech-savvy users
- Complex: Low digital literacy, vulnerable populations

### 5. ORGANIZATION
- Simple: Supportive leadership, resources available
- Complex: Poor infrastructure, competing priorities

### 6. WIDER CONTEXT (Policy/Regulatory)
- Simple: Supportive policies, clear regulatory pathway
- Complex: Major regulatory hurdles, unclear reimbursement

### 7. EMBEDDING & ADAPTATION
- Simple: Stable context, predictable evolution
- Complex: Rapidly changing environment, unpredictable needs

## Risk Assessment
- SIMPLE = Low risk
- COMPLICATED = Moderate risk
- COMPLEX = High risk of failure

## Red Flags
1. Complex condition without acknowledgment
2. Technology requires major behavior change but no adoption strategy
3. Unclear value proposition
4. Target users with low digital literacy but no support
5. No organizational readiness plan
6. No regulatory/reimbursement pathway
7. No adaptation/sustainability plan
`
};