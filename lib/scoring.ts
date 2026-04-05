import { ReadinessSummary, Requirement, Story, TestCase } from '../types';

export function calculateReadiness(
  requirements: Requirement[],
  stories: Story[],
  testCases: TestCase[]
): ReadinessSummary {
  const openQuestionsCount = requirements.filter((r) => r.ambiguity?.trim()).length;
  const highRiskCount = requirements.filter((r) => r.risk === 'High').length;
  const blockedCount = testCases.filter((t) => t.status === 'Blocked').length;

  let score = 0;

  if (requirements.length > 0) score += 25;
  if (stories.length > 0) score += 25;
  if (testCases.length > 0) score += 20;

  score -= Math.min(openQuestionsCount * 5, 15);
  score -= Math.min(highRiskCount * 5, 15);
  score -= Math.min(blockedCount * 10, 20);

  score = Math.max(0, Math.min(100, score));

  return {
    requirementsCount: requirements.length,
    storiesCount: stories.length,
    testsCount: testCases.length,
    openQuestionsCount,
    highRiskCount,
    blockedCount,
    readinessScore: score,
    nextActions: [
      openQuestionsCount > 0
        ? 'Resolve outstanding requirement ambiguities.'
        : 'Requirement clarity looks strong.',
      highRiskCount > 0
        ? 'Review high-risk items before launch sign-off.'
        : 'Risk profile is manageable.',
      blockedCount > 0
        ? 'Clear blocked tests before launch review.'
        : 'No blocked tests currently.',
    ],
  };
}