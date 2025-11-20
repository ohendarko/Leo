// lib/frameworks/business-model.ts
import { FrameworkContent } from '../types';

export const businessModelFramework: FrameworkContent = {
  name: 'Healthcare Business Model Canvas',
  slug: 'business-model',
  description: 'Business model assessment for HealthTech',
  content: `
# Healthcare Business Model Canvas

## The 9 Building Blocks

### 1. CUSTOMER SEGMENTS
Who pays and who uses?

**Archetypes:**
- D2C: Patients pay directly
- B2B2C: Sell to providers/employers
- B2B: Health systems are customer
- B2G: Government payers (Medicare, VA)
- B2P: Insurance companies

**Critical Question**: Who has budget authority?

### 2. VALUE PROPOSITIONS
What value do you deliver?

**Value Types:**
- Clinical: Better outcomes, safety
- Economic: Cost savings, ROI
- Operational: Time savings, efficiency
- Experiential: Convenience, satisfaction
- Compliance: Meeting quality standards

**Rule**: Value must align with who pays

**Strong Example**: "Reduce 30-day readmissions by 25% = $5K savings per avoided readmission"
**Weak Example**: "Improve patient outcomes through engagement"

### 3. CHANNELS
How do you reach customers?

**Distribution:**
- Direct sales (long cycles for health systems)
- Payer partnerships
- Provider referrals
- EHR embedded solutions

**Key Metrics:**
- Customer acquisition cost (CAC)
- Sales cycle length
- Conversion rates

### 4. CUSTOMER RELATIONSHIPS
- High-touch: Dedicated support, clinical assistance
- Self-service: App-based, minimal human interaction
- Hybrid: Digital-first with human escalation

### 5. REVENUE STREAMS
How do you make money?

**Models:**
- Fee-for-Service: PMPM (per member per month), per-transaction
- Value-Based: Shared savings, performance payments
- Reimbursement: CPT codes (billable to insurance)
- Hybrid: SaaS + outcomes bonuses

**Critical Ratios:**
- LTV:CAC > 3:1
- CAC payback < 12 months
- Gross margin > 60% for software

**Red Flags:**
- Revenue depends on unproven CPT codes
- Pricing doesn't align with customer incentives
- Margins too thin

### 6. KEY RESOURCES
**Critical Assets:**
- IP: Patents, proprietary data
- Regulatory: FDA clearances, HIPAA compliance
- Clinical: Advisory board, validation studies
- Technical: AI/ML models, EHR integrations

### 7. KEY ACTIVITIES
**Core Operations:**
- Clinical validation
- Regulatory compliance
- Evidence generation (RCTs, publications)
- Stakeholder education

### 8. KEY PARTNERSHIPS
**Strategic Allies:**
- Health systems (credibility + pilots)
- Key opinion leaders (clinical champions)
- Payers (coverage, referral)
- EHR vendors (integration)

**Red Flag**: Over-dependence on single partner

### 9. COST STRUCTURE
**Categories:**
- Fixed: R&D, regulatory, infrastructure
- Variable: CAC, customer support
- One-time: Clinical trials, FDA submissions

**Questions:**
- What is gross margin?
- Path to profitability?
- How do unit economics scale?

## Viability Tests

### "Show Me the Money" Test
1. Can you clearly say who pays and why?
2. Is payment sufficient to build a business?
3. Is sales cycle realistic for runway?

### "Unit Economics" Test
1. LTV > 3x CAC?
2. CAC payback < 12 months?
3. Gross margins > 60%?

### "Scale" Test
1. Can you acquire customers without linear cost increase?
2. Do economics improve with scale?
3. Can you reach $100M ARR?

## Common Failures
1. "Build it and they will pay" fallacy
2. "Reimbursement is coming" trap
3. "Consumer will pay" misjudgment
4. "Pilot purgatory" problem
5. "Multi-sided market" complexity
`
};