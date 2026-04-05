'use client';

import { useState } from 'react';
import { useAppContext } from '@/lib/app-context';
import { EmptyState } from '@/components/empty-state';

export default function StoriesPage() {
  const { requirements, stories, setStories } = useAppContext();

  const [loading, setLoading] = useState(false);

async function generateStories() {
  try {
    setLoading(true);

    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requirements }),
    });

    const data = await res.json();
    setStories(data.stories || []);
  } catch (error) {
    console.error('Story generation failed:', error);
  } finally {
    setLoading(false);
  }
}

  if (!requirements.length) {
    return (
      <EmptyState
        title="No requirements found"
        description="Generate requirements first before creating stories."
        ctaLabel="Go to Requirement Intake"
        ctaHref="/intake"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Story Generator</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Generate implementation-ready stories from requirements.
          </p>
        </div>

        <button
  onClick={generateStories}
  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
>
  {loading ? 'Generating...' : 'Generate Stories'}
</button>
      </div>

      {!stories.length ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
          Click “Generate Stories” to create stories from your requirements.
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{story.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Requirement: {story.requirementId}
                  </p>
                </div>

                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
                  {story.complexity}
                </span>
              </div>

              <p className="mt-4 text-sm text-zinc-700">{story.description}</p>

              <div className="mt-4">
                <p className="text-sm font-medium">Acceptance Criteria</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-600">
                  {story.acceptanceCriteria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}