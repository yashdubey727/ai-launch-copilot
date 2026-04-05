'use client';

import { useAppContext } from '@/lib/app-context';
import { EmptyState } from '@/components/empty-state';

export default function ReadinessPage() {
  const { readiness, requirements, stories, tests } = useAppContext();

  if (!requirements.length) {
    return (
      <EmptyState
        title="No launch data yet"
        description="Start by analyzing requirements, then generate stories and test cases to see readiness."
        ctaLabel="Go to Requirement Intake"
        ctaHref="/intake"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Readiness</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Review launch confidence, execution risks, and next actions.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">Launch Readiness</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">
              {readiness.readinessScore}%
            </p>
          </div>

          <div className="w-48">
            <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all"
                style={{ width: `${readiness.readinessScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Requirements</p>
            <p className="mt-2 text-2xl font-semibold">{requirements.length}</p>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Stories</p>
            <p className="mt-2 text-2xl font-semibold">{stories.length}</p>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Tests</p>
            <p className="mt-2 text-2xl font-semibold">{tests.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">Risk Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-600">
            <p>Open Questions: {readiness.openQuestionsCount}</p>
            <p>High-Risk Items: {readiness.highRiskCount}</p>
            <p>Blocked Tests: {readiness.blockedCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">Next Actions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {readiness.nextActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}