// lib/frameworks/regulatory.ts
import { FrameworkContent } from '../types';

export const regulatoryFramework: FrameworkContent = {
  name: 'Digital Health Regulatory Framework',
  slug: 'regulatory',
  description: 'FDA, HIPAA, and regulatory pathway assessment',
  content: `
# Digital Health Regulatory Framework

## 1. FDA REGULATORY PATHWAY (US)

### Is Your Product a Medical Device?
**Definition**: Software intended for diagnosis, cure, mitigation, treatment, or prevention of disease

**Key Question**: What is your intended use?

### FDA Classification

**Class I: Low Risk**
- Examples: Wellness apps, fitness trackers
- Requirements: Registration, listing
- Timeline: Weeks
- Cost: $1K-$10K

**Class II: Moderate Risk**
- Examples: ECG monitors, clinical decision support
- Pathway: 510(k) (prove "substantial equivalence")
- Timeline: 3-12 months
- Cost: $50K-$500K

**Class III: High Risk**
- Examples: Life-sustaining devices
- Pathway: PMA (Premarket Approval) - requires clinical trials
- Timeline: 1-3+ years
- Cost: $1M-$10M+

### Exemptions & Special Cases

**Wellness (Non-Enforcement):**
- General health tracking
- Lifestyle encouragement
- Organizing health info

**Clinical Decision Support (CDS) - May Be Exempt:**
- If clinician can independently review underlying data
- Does NOT independently analyze patient data for diagnosis

**Red Flags:**
- Marketing claims exceed cleared indications
- Assuming wellness status without legal review
- No FDA strategy until after launch

## 2. HIPAA COMPLIANCE (US)

### When Does HIPAA Apply?
- You're a **Covered Entity**: Health plans, providers, clearinghouses
- You're a **Business Associate**: Service provider handling PHI

**PHI** = Protected Health Information (individually identifiable)

### Requirements

**Privacy Rule**: How PHI can be used/disclosed
**Security Rule**: Safeguards for electronic PHI
- Administrative: Risk analysis, training
- Physical: Facility access, device security
- Technical: Encryption, access controls, audit logs

**Breach Notification**: Notify within 60 days

### Compliance Checklist
- [ ] Risk assessment completed
- [ ] Business Associate Agreements (BAAs)
- [ ] Data encryption (at rest and in transit)
- [ ] Access controls
- [ ] Audit logging
- [ ] Incident response plan
- [ ] Workforce training

**Costs:**
- Initial: $25K-$100K
- Ongoing: $10K-$50K/year
- Penalties: Up to $1.5M/year for violations

## 3. INTERNATIONAL REGULATIONS

### EU: MDR (Medical Device Regulation)
**CE Marking Required**

**Classification:**
- Class I: Self-certification possible
- Class IIa/IIb/III: Notified Body assessment

**Requirements:**
- Clinical evaluation report
- Post-market surveillance
- Technical documentation

**GDPR (Data Privacy):**
- Stricter than HIPAA
- Explicit consent required
- Right to erasure, data portability

**Timeline**: 6-18 months
**Cost**: $50K-$500K

### Other Markets
- UK: MHRA (UKCA marking)
- Canada: Health Canada license
- Australia: TGA
- Japan: PMDA
- China: NMPA

## 4. CLINICAL EVIDENCE

### Evidence Hierarchy
1. **RCTs** (Randomized Controlled Trials): Gold standard
2. **Real-World Evidence**: Observational data
3. **Expert Opinion**

### When Required?
- **FDA**: Class III always; Class II sometimes
- **Payers**: Often require even when FDA doesn't
- **Providers**: Peer-reviewed publications expected

### Study Types
- Analytical Validation: Does algorithm work?
- Clinical Validation: Does it accurately diagnose?
- Clinical Utility: Does it improve outcomes?
- Implementation: Does it work in real-world?

**Timeline**: 6 months (pilot) to 4 years (RCT)
**Cost**: $100K (pilot) to $10M+ (RCT)

## 5. REIMBURSEMENT

### CPT Codes (Medicare)
**Existing Digital Health Codes:**
- RPM (Remote Patient Monitoring): 99453, 99454, 99457
- CCM (Chronic Care Management): 99490, 99439
- PCM (Principal Care Management): 99424, 99425

**New Code Process:**
- Apply to AMA CPT Editorial Panel
- Timeline: 18-24 months minimum

### Coverage Decisions
- **NCD** (National): Applies to all Medicare
- **LCD** (Local): Regional
- Timeline: 6-12 months

**Red Flags:**
- Business depends on non-existent CPT code
- No reimbursement strategy for 2+ years
- Assuming coverage without analysis

## 6. REGULATORY RISK ASSESSMENT

### High Risk Signals
❌ Novel device with no predicate
❌ Life-sustaining or high-consequence decisions
❌ Pediatric/vulnerable populations
❌ Claims requiring Class III/PMA
❌ Multiple jurisdictions simultaneously

### Medium Risk
⚠️ Class II requiring 510(k)
⚠️ Closed-loop (diagnosis + treatment)
⚠️ Integration with medical devices
⚠️ Unclear reimbursement

### Lower Risk
✅ Wellness category
✅ CDS exemption qualified
✅ Predicate device exists
✅ Established CPT pathway

## Key Questions for Founders
1. Have you had formal regulatory classification?
2. What is your FDA strategy and timeline?
3. Are you HIPAA compliant?
4. What clinical evidence do you need?
5. Have you budgeted for regulatory costs?
6. Do you have regulatory/QA personnel?
7. Which international markets?
8. What's your reimbursement strategy?

## Common Failures
1. "We're just wellness" (while making medical claims)
2. "We'll get regulatory later" (costly redesign)
3. "HIPAA is easy" (underestimating complexity)
4. "Reimbursement will come" (no concrete path)
5. "Evidence can wait" (no validation plan)
`
};