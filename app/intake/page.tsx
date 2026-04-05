'use client';

import { useMemo, useState } from 'react';
import { demoRawInput, mockAnalyzeResponse } from '@/lib/demo-data';
import { useAppContext } from '@/lib/app-context';
import { RawInput } from '@/types';

export default function IntakePage() {
  const { setRawInput, setRequirements, setStories, setTests, requirements } = useAppContext();

  const [form, setForm] = useState<RawInput>({
    partnerName: '',
    objective: '',
    market: '',
    requestedCapabilities: [],
    complianceNotes: '',
    meetingNotes: '',
  });

  const [result, setResult] = useState<typeof mockAnalyzeResponse | null>(
    requirements.length ? mockAnalyzeResponse : null
  );

  const capabilitiesText = useMemo(
    () => form.requestedCapabilities.join(', '),
    [form.requestedCapabilities]
  );

  function loadDemo() {
    setForm(demoRawInput);
    setRawInput(demoRawInput);
    setRequirements(mockAnalyzeResponse.requirements);
    setStories([]);
    setTests([]);
    setResult(mockAnalyzeResponse);
  }

  async function handleAnalyze() {
  try {
    setRawInput(form);
    setStories([]);
    setTests([]);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setRequirements(data.requirements || []);
    setResult(data);
  } catch (error) {
    console.error('Analyze failed:', error);
    setRawInput(form);
    setRequirements(mockAnalyzeResponse.requirements);
    setStories([]);
    setTests([]);
    setResult(mockAnalyzeResponse);
  }
}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Requirement Intake</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Paste or load launch input and generate structured requirements.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <input
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Partner or Client Name"
              value={form.partnerName}
              onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
            />

            <input
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Objective"
              value={form.objective}
              onChange={(e) => setForm({ ...form, objective: e.target.value })}
            />

            <input
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Market / Region"
              value={form.market}
              onChange={(e) => setForm({ ...form, market: e.target.value })}
            />

            <textarea
              className="min-h-24 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Requested capabilities, comma separated"
              value={capabilitiesText}
              onChange={(e) =>
                setForm({
                  ...form,
                  requestedCapabilities: e.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />

            <textarea
              className="min-h-24 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Compliance notes"
              value={form.complianceNotes}
              onChange={(e) => setForm({ ...form, complianceNotes: e.target.value })}
            />

            <textarea
              className="min-h-40 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
              placeholder="Meeting notes"
              value={form.meetingNotes}
              onChange={(e) => setForm({ ...form, meetingNotes: e.target.value })}
            />

            <div className="flex gap-3">
              <button
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                onClick={handleAnalyze}
              >
                Analyze Requirements
              </button>

              <button
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium"
                onClick={loadDemo}
              >
                Load Demo Scenario
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {!result ? (
            <p className="text-sm text-zinc-500">
              Generated requirement analysis will appear here.
            </p>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Business Goal
                </h2>
                <p className="mt-2 text-sm text-zinc-700">{result.businessGoal}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Scope Summary
                </h2>
                <p className="mt-2 text-sm text-zinc-700">{result.scopeSummary}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Extracted Requirements
                </h2>
                <div className="mt-3 space-y-3">
                  {result.requirements.map((req) => (
                    <div key={req.id} className="rounded-xl border border-zinc-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">
                          {req.id} · {req.title}
                        </p>
                        <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                          {req.module}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-600">{req.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}