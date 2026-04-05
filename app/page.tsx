'use client';

import Link from 'next/link';
import { useAppContext } from '@/lib/app-context';
import { EmptyState } from '@/components/empty-state';
import { StatCard } from '@/components/stat-card';
import { generatePrdMarkdown, downloadMarkdownFile } from '@/lib/export-prd';

export default function DashboardPage() {
  const { rawInput, requirements, stories, tests, readiness, resetAll } = useAppContext();

function handleExportPrd() {
  const content = generatePrdMarkdown({
    rawInput,
    requirements,
    stories,
    tests,
    readiness,
  });

  downloadMarkdownFile('launch-copilot-prd.md', content);
}

  if (!requirements.length) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
  AI Workflow Prototype
</p>
          <h1 className="text-3xl font-semibold tracking-tight">Launch Copilot</h1>

<p className="mt-2 text-sm text-zinc-600">
  AI-powered implementation copilot that transforms raw launch input into structured requirements, engineering stories, test cases, and launch readiness insights.
</p>
        </div>

        <EmptyState
          title="Load a demo scenario to begin"
          description="Start with the demo input, generate requirements, and move through stories, testing, and readiness."
          ctaLabel="Go to Requirement Intake"
          ctaHref="/intake"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Executive view of launch planning progress, delivery artifacts, and readiness.
          </p>
        </div>

        <button
          onClick={resetAll}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Reset Project
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Requirements" value={requirements.length} subtitle="Structured launch requirements" />
        <StatCard title="Stories" value={stories.length} subtitle="Implementation-ready stories" />
        <StatCard title="Test Cases" value={tests.length} subtitle="QA and UAT coverage" />
        <StatCard title="Readiness Score" value={`${readiness.readinessScore}%`} subtitle="Overall launch confidence" />
        <StatCard title="Open Questions" value={readiness.openQuestionsCount} subtitle="Ambiguities to resolve" />
        <StatCard title="High-Risk Items" value={readiness.highRiskCount} subtitle="Priority risks to review" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Recent Requirements</h2>
            <Link href="/intake" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {requirements.slice(0, 3).map((req) => (
              <div key={req.id} className="rounded-xl bg-zinc-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-zinc-900">
                    {req.id} · {req.title}
                  </p>
                  <span className="rounded-full bg-white px-2 py-1 text-xs text-zinc-600">
                    {req.module}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">{req.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Recent Stories</h2>
            <Link href="/stories" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {stories.length ? (
              stories.slice(0, 3).map((story) => (
                <div key={story.id} className="rounded-xl bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-zinc-900">
                      {story.id} · {story.title}
                    </p>
                    <span className="rounded-full bg-white px-2 py-1 text-xs text-zinc-600">
                      {story.complexity}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">{story.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No stories generated yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight">Quick Actions</h2>

        <div className="mt-4 flex flex-wrap gap-3">
  <Link
    href="/intake"
    className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
  >
    Requirement Intake
  </Link>

  <Link
    href="/stories"
    className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
  >
    Story Generator
  </Link>

  <Link
    href="/tests"
    className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
  >
    Test Cases
  </Link>

  <Link
    href="/readiness"
    className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
  >
    Readiness
  </Link>

  <button
    onClick={handleExportPrd}
    className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
  >
    Export PRD
  </button>
</div>
      </div>
    </div>
  );
}