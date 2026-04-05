import { AnalyzeResponse, RawInput, StoriesResponse, TestsResponse } from '@/types';

export const demoRawInput: RawInput = {
  partnerName: 'NovaBank',
  objective: 'Launch a retail investing experience for U.S. customers.',
  market: 'United States',
  requestedCapabilities: [
    'Digital account opening',
    'Identity verification',
    'ACH funding',
    'Fractional equity and ETF trading',
    'Monthly statements',
    'Portfolio performance view',
  ],
  complianceNotes:
    'Need strong KYC validation, reporting readiness, and funding failure handling.',
  meetingNotes:
    'NovaBank wants a mobile-first embedded investing launch for U.S. retail users. MVP must include account opening, identity verification, ACH funding, fractional trading for equities and ETFs, monthly statements, and a simple holdings and performance experience. Key concerns include incomplete KYC fields, failed ACH transfers, statement generation at month end, and clear visibility into launch blockers.',
};

export const mockAnalyzeResponse: AnalyzeResponse = {
  businessGoal:
    'Enable a mobile-first investing launch with onboarding, funding, trading, and reporting capabilities for U.S. retail customers.',
  scopeSummary:
    'The launch includes onboarding, identity verification, ACH funding, fractional investing, monthly statements, and portfolio performance visibility.',
  requirements: [
    {
      id: 'R1',
      title: 'Support digital account opening',
      description: 'Users must be able to complete account opening with required identity fields and validations.',
      module: 'Onboarding',
      risk: 'High',
      priority: 'High',
      dependency: 'Identity verification service',
      ambiguity: 'Exact KYC field set needs confirmation.',
      status: 'Draft',
    },
    {
      id: 'R2',
      title: 'Enable ACH funding',
      description: 'Users must be able to link a bank account and fund their investing account via ACH.',
      module: 'Funding',
      risk: 'High',
      priority: 'High',
      dependency: 'Funding rail integration',
      ambiguity: 'Need to confirm retry logic for failed ACH transfers.',
      status: 'Draft',
    },
    {
      id: 'R3',
      title: 'Allow fractional equity and ETF trading',
      description: 'Users must be able to place fractional buy orders for supported equities and ETFs.',
      module: 'Trading',
      risk: 'Medium',
      priority: 'High',
      dependency: 'Order management and asset eligibility rules',
      ambiguity: '',
      status: 'Draft',
    },
    {
      id: 'R4',
      title: 'Generate monthly statements',
      description: 'The platform must generate accurate monthly statements and make them accessible to end users.',
      module: 'Statements',
      risk: 'Medium',
      priority: 'Medium',
      dependency: 'Reporting and document generation workflows',
      ambiguity: 'Need to confirm statement availability SLA.',
      status: 'Draft',
    },
    {
      id: 'R5',
      title: 'Show holdings and portfolio performance',
      description: 'Users must be able to view holdings and portfolio performance in a simple dashboard.',
      module: 'Performance',
      risk: 'Low',
      priority: 'Medium',
      dependency: 'Portfolio data aggregation service',
      ambiguity: '',
      status: 'Draft',
    },
  ],
  impactedModules: ['Onboarding', 'Funding', 'Trading', 'Statements', 'Performance', 'Compliance'],
  ambiguities: [
    'Confirm required KYC fields for onboarding.',
    'Define ACH failure retry handling.',
    'Confirm monthly statement delivery timing.',
  ],
  riskFlags: [
    'Onboarding validation gaps could block activation.',
    'Funding failures may impact early user success.',
  ],
  recommendedPriority: 'High',
};

export const mockStoriesResponse: StoriesResponse = {
  epicTitle: 'Launch onboarding, funding, trading, and reporting capabilities for retail investing',
  stories: [
    {
      id: 'S1',
      requirementId: 'R1',
      epicTitle: 'Launch onboarding, funding, trading, and reporting capabilities for retail investing',
      title: 'Validate account opening inputs before submission',
      persona: 'Partner operations user',
      description:
        'As a partner operations user, I want account opening requests validated against required identity fields so that incomplete onboarding attempts are caught before submission.',
      acceptanceCriteria: [
        'Given a user submits onboarding details, when required fields are missing, then the request is blocked with clear error messaging.',
        'Given a user submits complete onboarding data, when validations pass, then the request proceeds to identity verification.',
      ],
      complexity: 'M',
      dependency: 'Identity verification service',
      status: 'Draft',
    },
    {
      id: 'S2',
      requirementId: 'R2',
      epicTitle: 'Launch onboarding, funding, trading, and reporting capabilities for retail investing',
      title: 'Support ACH account linking and funding flow',
      persona: 'Retail investing user',
      description:
        'As a retail investing user, I want to link my bank account and fund my investing account through ACH so that I can begin trading.',
      acceptanceCriteria: [
        'Given a valid linked bank account, when the user initiates ACH funding, then the transfer is submitted successfully.',
        'Given an ACH transfer fails, when the user views funding status, then the failure reason and next step are displayed.',
      ],
      complexity: 'L',
      dependency: 'Funding rail integration',
      status: 'Draft',
    },
    {
      id: 'S3',
      requirementId: 'R3',
      epicTitle: 'Launch onboarding, funding, trading, and reporting capabilities for retail investing',
      title: 'Enable fractional trading for supported assets',
      persona: 'Retail investing user',
      description:
        'As a retail investing user, I want to place fractional orders for supported equities and ETFs so that I can invest with small dollar amounts.',
      acceptanceCriteria: [
        'Given a supported asset, when the user enters a fractional order amount, then the order can be reviewed and submitted.',
        'Given an unsupported asset, when the user attempts fractional trading, then the action is blocked with guidance.',
      ],
      complexity: 'M',
      dependency: 'Order management rules',
      status: 'Draft',
    },
  ],
  engineeringQuestions: [
    'What is the exact KYC field minimum for MVP?',
    'Should ACH retries be automatic or manual?',
    'How should unsupported assets be surfaced in the trading UI?',
  ],
};

export const mockTestsResponse: TestsResponse = {
  testCases: [
    {
      id: 'T1',
      requirementId: 'R1',
      storyId: 'S1',
      title: 'Block onboarding submission when required KYC fields are missing',
      type: 'Compliance',
      preconditions: ['User is on onboarding form'],
      steps: ['Leave a required KYC field blank', 'Submit the onboarding form'],
      expectedResult: 'Submission is blocked and a clear validation error is shown.',
      status: 'Not Run',
    },
    {
      id: 'T2',
      requirementId: 'R2',
      storyId: 'S2',
      title: 'Display failure messaging for rejected ACH transfer',
      type: 'Negative',
      preconditions: ['User has linked a bank account'],
      steps: ['Initiate ACH funding', 'Simulate transfer failure'],
      expectedResult: 'Funding status updates to failed and the UI shows next-step guidance.',
      status: 'Not Run',
    },
    {
      id: 'T3',
      requirementId: 'R3',
      storyId: 'S3',
      title: 'Allow fractional order on supported ETF',
      type: 'Functional',
      preconditions: ['User account is funded', 'ETF supports fractional trading'],
      steps: ['Select supported ETF', 'Enter a fractional dollar amount', 'Review and submit order'],
      expectedResult: 'Order is accepted and confirmation is displayed.',
      status: 'Not Run',
    },
    {
      id: 'T4',
      requirementId: 'R4',
      storyId: 'S1',
      title: 'Verify monthly statement generation at month end',
      type: 'Edge',
      preconditions: ['Statement generation job is scheduled'],
      steps: ['Run statement generation for month-end cycle', 'Check statement availability'],
      expectedResult: 'Statement is generated accurately and available to the user.',
      status: 'Not Run',
    },
  ],
};  