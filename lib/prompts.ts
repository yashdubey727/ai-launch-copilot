import { RawInput, Requirement, Story } from '@/types';

export function buildAnalyzePrompt(input: RawInput) {
  return `
You are an expert product operations analyst.

Given the following launch request, generate a structured JSON response.

Return ONLY valid JSON with this exact shape:
{
  "businessGoal": "string",
  "scopeSummary": "string",
  "requirements": [
    {
      "id": "R1",
      "title": "string",
      "description": "string",
      "module": "Onboarding | Funding | Trading | Reporting | Statements | Performance | Compliance",
      "risk": "Low | Medium | High",
      "priority": "Low | Medium | High",
      "dependency": "string",
      "ambiguity": "string",
      "status": "Draft"
    }
  ],
  "impactedModules": ["string"],
  "ambiguities": ["string"],
  "riskFlags": ["string"],
  "recommendedPriority": "Low | Medium | High"
}

Context:
Partner Name: ${input.partnerName}
Objective: ${input.objective}
Market: ${input.market}
Requested Capabilities: ${input.requestedCapabilities.join(', ')}
Compliance Notes: ${input.complianceNotes}
Meeting Notes: ${input.meetingNotes}

Rules:
- Generate 5 to 8 high-quality requirements
- Keep wording enterprise and product-focused
- Be specific, not generic
- Use realistic dependencies
- Keep IDs in order R1, R2, R3...
- Return JSON only
  `.trim();
}

export function buildStoriesPrompt(requirements: Requirement[]) {
  return `
You are an expert product manager.

Convert the following requirements into implementation-ready stories.

Return ONLY valid JSON with this exact shape:
{
  "epicTitle": "string",
  "stories": [
    {
      "id": "S1",
      "requirementId": "R1",
      "epicTitle": "string",
      "title": "string",
      "persona": "string",
      "description": "string",
      "acceptanceCriteria": ["string", "string"],
      "complexity": "S | M | L",
      "dependency": "string",
      "status": "Draft"
    }
  ],
  "engineeringQuestions": ["string"]
}

Requirements:
${JSON.stringify(requirements, null, 2)}

Rules:
- Generate 1 to 2 stories per requirement where useful
- Keep stories implementation-ready
- Acceptance criteria must be concrete
- Keep IDs in order S1, S2, S3...
- Return JSON only
  `.trim();
}

export function buildTestsPrompt(requirements: Requirement[], stories: Story[]) {
  return `
You are an expert QA and UAT analyst.

Generate realistic test cases from the requirements and stories below.

Return ONLY valid JSON with this exact shape:
{
  "testCases": [
    {
      "id": "T1",
      "requirementId": "R1",
      "storyId": "S1",
      "title": "string",
      "type": "Functional | Edge | Negative | Compliance",
      "preconditions": ["string"],
      "steps": ["string"],
      "expectedResult": "string",
      "status": "Not Run"
    }
  ]
}

Requirements:
${JSON.stringify(requirements, null, 2)}

Stories:
${JSON.stringify(stories, null, 2)}

Rules:
- Generate 6 to 10 test cases
- Include a mix of functional, edge, negative, and compliance tests
- Preserve traceability to requirementId and storyId
- Keep IDs in order T1, T2, T3...
- Return JSON only
  `.trim();
}