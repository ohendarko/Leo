/**
 * THE NASSS FRAMEWORK (Greenhalgh et al.)
 * ENHANCED with "Digital Health Implementation Success Factors" (Source: User Corpus)
 * * Used for Stage 1: Risk & Complexity Audit ("The Interrogation")
 * Goal: Identify why the project will fail before it starts.
 */
export const NASSS_FRAMEWORK = `
FRAMEWORK: NASSS (Non-adoption, Abandonment, Scale-up, Spread, Sustainability)
CONTEXT: Digital Health Implementation & Systemic Failure Analysis

DOMAIN 1: THE CONDITION
- Nature of condition: Is it simple (predictable) or complex (multimorbid/unpredictable)?
- Risk: "The Complexity Heuristic" - If the condition is complex but the tech assumes linearity, failure is 100%.
- Failure Mode: "The Synthetic Mirage" - Algorithms trained on synthetic/clean data that fail in real-world messy clinical reality.

DOMAIN 2: THE TECHNOLOGY
- Material features: Usability, reliability.
- Knowledge Generated: Does it produce actionable insight or just "Data Overload"?
- Failure Mode: "The Interoperability Wall" - Data silos; inability to read unstructured notes; lack of API integration (e.g., no HL7/FHIR).
- Critical Check: "The Friction Heuristic" - Any requirement for manual pairing (Bluetooth) or manual logging reduces adherence below the 16-day threshold, killing reimbursement.

DOMAIN 3: THE VALUE PROPOSITION
- Supply-side value: ROI for developer/investor.
- Demand-side value: Efficacy for patient.
- Failure Mode: "Value Dissonance" - Tech works but increases costs without reimbursement (e.g., "lighting money on fire").
- Critical Check: "The Billing Heuristic" - If it cannot be mapped to a CPT code (e.g., 99454) or a VBC contract, it is a "zombie pilot."

DOMAIN 4: THE ADOPTER SYSTEM
- Staff: Threats to professional identity (e.g., AI replacing clinical judgment).
- Failure Mode: "Adopter Rebellion" - Top-down mandates led to lack of "Coherence" (NPT). Clinicians reject tools that disrupt workflow (>2 clicks).
- Critical Concept: "Coherence" - Do users perceive the tool as meaningful?

DOMAIN 5: THE ORGANIZATION
- Capacity: Slack resources to support scale-up.
- Failure Mode: "Pilotitis" - Success in N=50 study but failure at N=5000 due to lack of organizational readiness or "Inner Setting" misfit.

DOMAIN 6: THE WIDER SYSTEM
- Regulatory: GDPR, FDA SaMD, NHS DTAC.
- Failure Mode: "Regulatory Freeze" - Non-compliance with safety baselines or data sovereignty laws.

DOMAIN 7: EMBEDDING AND ADAPTATION OVER TIME
- Resilience: Ability to adapt to changing reimbursement models (Fee-for-Service -> Value-Based Care).
`;

/**
 * THE PLAY-TO-WIN FRAMEWORK (Lafley & Martin)
 * ENHANCED with "Physiology of Success" (Source: User Corpus)
 * * Used for Stage 2: Strategic Verdict ("The Judgment")
 * Goal: Assess if the startup has a valid path to market dominance.
 */
export const PLAY_TO_WIN_FRAMEWORK = `
FRAMEWORK: PLAY-TO-WIN STRATEGY KASCADES
CONTEXT: Digital Health Business Model Innovation

CHOICE 1: WHAT IS OUR WINNING ASPIRATION?
- Must go beyond "helping patients."
- Example: Omada Health didn't just want to "track weight"; they wanted to "reduce chronic disease risk via outcomes-based billing."

CHOICE 2: WHERE WILL WE PLAY?
- Traditional: Selling to Insurers/Payers (High friction, slow cycle).
- Pivot Strategy: "Direct-to-Employer (D2E)" - Bypassing insurers to sell to self-insured employers who bear the risk (Source: Omada Health case).
- Niche: High-need complex chronic patients vs. "Worried Well."

CHOICE 3: HOW WILL WE WIN? (The Secret Sauce)
- Strategy A: "Frictionless Data" - Use cellular-enabled devices (e.g., Livongo) to remove user friction (no Bluetooth pairing, no WiFi setup).
- Strategy B: "Outcomes-Based Billing" - Revenue tied to biomarkers (e.g., HbA1c reduction) rather than usage/SaaS fees.
- Strategy C: "Human-in-the-Loop" - Hybrid models (AI + Coach) outperform AI-only by satisfying psychological needs (HOT-fit).

CHOICE 4: WHAT CAPABILITIES MUST BE IN PLACE?
- Technical: Structural Unity (Data integration).
- Clinical: Ability to manage "The 16-Day Rule" (Designing UX to ensure patients transmit data 16+ days/month to capture CPT reimbursement).

CHOICE 5: WHAT MANAGEMENT SYSTEMS ARE REQUIRED?
- Metrics: PMPM (Per Member Per Month) savings validation.
- Feedback Loops: Real-time intervention based on data signal (not just logging).
`;

/**
 * Helper function to combine frameworks for the "Verdict" stage
 */
export const GET_COMBINED_CONTEXT = () => {
  return `
  ${NASSS_FRAMEWORK}
  
  ---
  
  ${PLAY_TO_WIN_FRAMEWORK}
  `;
};