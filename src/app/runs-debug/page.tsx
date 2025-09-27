'use client';

import { useEffect, useState } from 'react';

type ModelName = string;
type ModelList = ModelName[];

type ModelMetrics = {
  latency_ms: number;
  tokens: number;
  cost: number;
  error?: string;
};
type MetricsByModel = Record<ModelName, ModelMetrics>;

type Run = {
  id: string;
  prompt: string;
  models: ModelList;
  metrics: MetricsByModel;
  created_at: string;
};

type RunsResponse =
  | { runs: Run[] }
  | { error: string };

export default function RunsDebug() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    setBusy(true);
    setMsg(null);
    const res = await fetch('/api/runs');
    const data: RunsResponse = await res.json();
    if (!res.ok || 'error' in data) {
      setMsg(('error' in data && data.error) || 'Failed to load');
    } else {
      setRuns(data.runs || []);
    }
    setBusy(false);
  }

  async function createSample() {
    setBusy(true);
    setMsg(null);
    const body = {
      prompt: 'Summarize: The quick brown fox jumps over the lazy dog.',
      models: ['gpt-4o-mini', 'mistral-small'] as ModelList,
      metrics: {
        'gpt-4o-mini': { latency_ms: 1200, tokens: 35, cost: 0.0005 },
        'mistral-small': { latency_ms: 900, tokens: 33, cost: 0.0003 }
      } as MetricsByModel
    };

    const res = await fetch('/api/runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || 'Insert failed');
    } else {
      setMsg('Inserted ✅');
      await load();
    }
    setBusy(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Runs Debug</h1>

      <div className="flex gap-2">
        <button onClick={createSample} disabled={busy} className="rounded border px-3 py-1 text-sm disabled:opacity-50">
          {busy ? 'Working…' : 'Create sample run'}
        </button>
        <button onClick={load} disabled={busy} className="rounded border px-3 py-1 text-sm disabled:opacity-50">
          {busy ? 'Loading…' : 'Reload'}
        </button>
      </div>

      {msg && <div className="text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded">{msg}</div>}

      <div className="border rounded p-3">
        {runs.length === 0 ? (
          <p className="text-sm text-gray-600">No runs yet.</p>
        ) : (
          <ul className="space-y-3">
            {runs.map(r => (
              <li key={r.id} className="text-sm">
                <div className="font-medium">{new Date(r.created_at).toLocaleString()}</div>
                <div className="text-gray-700">Prompt: <em>{r.prompt}</em></div>
                <pre className="bg-gray-900 p-2 rounded overflow-auto">{JSON.stringify(r.models, null, 2)}</pre>
                <pre className="bg-gray-900 p-2 rounded overflow-auto">{JSON.stringify(r.metrics, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
