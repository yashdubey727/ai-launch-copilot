'use client';

import { useAppContext } from '@/lib/app-context';
import { mockTestsResponse } from '@/lib/demo-data';
import { ExecutionStatus } from '@/types';
import { EmptyState } from '@/components/empty-state';


export default function TestsPage() {
  const { stories, tests, setTests } = useAppContext();

  function generateTests() {
    setTests(mockTestsResponse.testCases);
  }

  function updateStatus(id: string, status: ExecutionStatus) {
    setTests(tests.map((test) => (test.id === id ? { ...test, status } : test)));
  }

  if (!stories.length) {
    return (
      <EmptyState
        title="No stories found"
        description="Generate stories first before creating test cases."
        ctaLabel="Go to Story Generator"
        ctaHref="/stories"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Test Cases</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Generate and review functional, edge, negative, and compliance tests.
          </p>
        </div>

        <button
          onClick={generateTests}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          Generate Test Cases
        </button>
      </div>

      {!tests.length ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
          Click “Generate Test Cases” to create tests from your stories.
        </div>
      ) : (
        <div className="space-y-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {test.id} · {test.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Requirement {test.requirementId} · Story {test.storyId}
                  </p>
                </div>

                <select
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                  value={test.status}
                  onChange={(e) => updateStatus(test.id, e.target.value as ExecutionStatus)}
                >
                  <option>Not Run</option>
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Blocked</option>
                </select>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <p className="mt-1 text-sm text-zinc-600">{test.type}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Preconditions</p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600">
                    {test.preconditions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium">Expected Result</p>
                  <p className="mt-1 text-sm text-zinc-600">{test.expectedResult}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Steps</p>
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-zinc-600">
                  {test.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}