export type ModuleTag =
  | 'Onboarding'
  | 'Funding'
  | 'Trading'
  | 'Reporting'
  | 'Statements'
  | 'Performance'
  | 'Compliance';

export type RiskLevel = 'Low' | 'Medium' | 'High';
export type Priority = 'Low' | 'Medium' | 'High';
export type ArtifactStatus = 'Draft' | 'Reviewed' | 'Approved';
export type TestType = 'Functional' | 'Edge' | 'Negative' | 'Compliance';
export type ExecutionStatus = 'Not Run' | 'Pass' | 'Fail' | 'Blocked';

export interface RawInput {
  partnerName: string;
  objective: string;
  market: string;
  requestedCapabilities: string[];
  complianceNotes: string;
  meetingNotes: string;
}

export interface Project {
  id: string;
  name: string;
  objective: string;
  market: string;
  createdAt: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  module: ModuleTag;
  risk: RiskLevel;
  priority: Priority;
  dependency: string;
  ambiguity: string;
  status: ArtifactStatus;
}

export interface Story {
  id: string;
  requirementId: string;
  epicTitle: string;
  title: string;
  persona: string;
  description: string;
  acceptanceCriteria: string[];
  complexity: 'S' | 'M' | 'L';
  dependency: string;
  status: ArtifactStatus;
}

export interface TestCase {
  id: string;
  requirementId: string;
  storyId: string;
  title: string;
  type: TestType;
  preconditions: string[];
  steps: string[];
  expectedResult: string;
  status: ExecutionStatus;
}

export interface ReadinessSummary {
  requirementsCount: number;
  storiesCount: number;
  testsCount: number;
  openQuestionsCount: number;
  highRiskCount: number;
  blockedCount: number;
  readinessScore: number;
  nextActions: string[];
}

export interface AnalyzeResponse {
  businessGoal: string;
  scopeSummary: string;
  requirements: Requirement[];
  impactedModules: string[];
  ambiguities: string[];
  riskFlags: string[];
  recommendedPriority: string;
}

export interface StoriesResponse {
  epicTitle: string;
  stories: Story[];
  engineeringQuestions: string[];
}

export interface TestsResponse {
  testCases: TestCase[];
}