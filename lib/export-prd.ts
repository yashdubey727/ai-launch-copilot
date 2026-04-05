import { RawInput, Requirement, Story, TestCase, ReadinessSummary } from '@/types';

export function generatePrdMarkdown(params: {
  rawInput: RawInput | null;
  requirements: Requirement[];
  stories: Story[];
  tests: TestCase[];
  readiness: ReadinessSummary;
}) {
  const { rawInput, requirements, stories, tests, readiness } = params;

  return `# Launch Copilot PRD Export

## Project Overview
**Partner / Client:** ${rawInput?.partnerName || 'N/A'}
**Objective:** ${rawInput?.objective || 'N/A'}
**Market:** ${rawInput?.market || 'N/A'}

## Requested Capabilities
${rawInput?.requestedCapabilities?.length ? rawInput.requestedCapabilities.map((item) => `- ${item}`).join('\n') : '- N/A'}

## Compliance Notes
${rawInput?.complianceNotes || 'N/A'}

## Meeting Notes
${rawInput?.meetingNotes || 'N/A'}

## Requirements
${requirements.length ? requirements.map((req) => `
### ${req.id}: ${req.title}
- Description: ${req.description}
- Module: ${req.module}
- Risk: ${req.risk}
- Priority: ${req.priority}
- Dependency: ${req.dependency}
- Ambiguity: ${req.ambiguity || 'None'}
- Status: ${req.status}
`).join('\n') : 'No requirements generated.'}

## Stories
${stories.length ? stories.map((story) => `
### ${story.id}: ${story.title}
- Requirement ID: ${story.requirementId}
- Persona: ${story.persona}
- Description: ${story.description}
- Complexity: ${story.complexity}
- Dependency: ${story.dependency}
- Status: ${story.status}

Acceptance Criteria:
${story.acceptanceCriteria.map((item) => `- ${item}`).join('\n')}
`).join('\n') : 'No stories generated.'}

## Test Cases
${tests.length ? tests.map((test) => `
### ${test.id}: ${test.title}
- Requirement ID: ${test.requirementId}
- Story ID: ${test.storyId}
- Type: ${test.type}
- Status: ${test.status}
- Preconditions:
${test.preconditions.map((item) => `  - ${item}`).join('\n')}
- Steps:
${test.steps.map((item) => `  - ${item}`).join('\n')}
- Expected Result: ${test.expectedResult}
`).join('\n') : 'No test cases generated.'}

## Readiness Summary
- Requirements Count: ${readiness.requirementsCount}
- Stories Count: ${readiness.storiesCount}
- Tests Count: ${readiness.testsCount}
- Open Questions: ${readiness.openQuestionsCount}
- High-Risk Items: ${readiness.highRiskCount}
- Blocked Tests: ${readiness.blockedCount}
- Readiness Score: ${readiness.readinessScore}%

## Next Actions
${readiness.nextActions.map((item) => `- ${item}`).join('\n')}
`;
}

export function downloadMarkdownFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}