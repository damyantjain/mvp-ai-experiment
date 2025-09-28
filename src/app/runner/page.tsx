'use client';

import { useState } from 'react';

type Usage = { prompt_tokens: number; completion_tokens: number; total_tokens: number };
type Result = { model: string; text: string; latency_ms: number; usage?: Usage; cost_usd?: number; error?: string };
type RunResponse = { results: Result[] } | { error: string };

const AVAILABLE_MODELS = [
  { id: 'gpt-4o-mini', label: 'OpenAI: gpt-4o-mini' },
  { id: 'gpt-4o', label: 'OpenAI: gpt-4o' },
  { id: 'mistral-small', label: 'Mistral: mistral-small' },
  { id: 'mistral-large', label: 'Mistral: mistral-large' },
];

export default function RunnerPage() {
  const [prompt, setPrompt] = useState('');
  const [selected, setSelected] = useState<string[]>([AVAILABLE_MODELS[0].id]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  function toggleModel(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  async function onRun(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setResults([]);
    if (!prompt.trim() || selected.length === 0) {
      setMsg('Enter a prompt and pick at least one model.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, models: selected }),
      });
      const data: RunResponse = await res.json();
      if (!res.ok || 'error' in data) {
        setMsg(('error' in data && data.error) || 'Run failed');
      } else {
        setResults(data.results);
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Prompt Runner</h1>

      <form onSubmit={onRun} className="space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          placeholder="Type a prompt to compare models…"
          className="w-full rounded border p-2 text-sm"
        />
        <div className="flex flex-wrap gap-3">
          {AVAILABLE_MODELS.map((m) => (
            <label key={m.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(m.id)}
                onChange={() => toggleModel(m.id)}
              />
              {m.label}
            </label>
          ))}
        </div>
        <button
          className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Running…' : 'Run'}
        </button>
      </form>

      {msg && (
        <div className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded">
          {msg}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-2 text-left border">Model</th>
                  <th className="p-2 text-left border">Latency (ms)</th>
                  <th className="p-2 text-left border">Prompt / Completion / Total tokens</th>
                  <th className="p-2 text-left border">Cost (USD)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.model} className="align-top">
                    <td className="p-2 border font-medium">{r.model}</td>
                    <td className="p-2 border">{r.latency_ms || '—'}</td>
                    <td className="p-2 border">
                      {r.usage
                        ? `${r.usage.prompt_tokens} / ${r.usage.completion_tokens} / ${r.usage.total_tokens}`
                        : '—'}
                    </td>
                    <td className="p-2 border">{typeof r.cost_usd === 'number' ? `$${r.cost_usd.toFixed(4)}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {results.length > 0 && (
                <div className="text-sm">
                    Total cost:{' '}
                    <strong>
                    $
                    {results
                        .reduce((sum, r) => sum + (r.cost_usd ?? 0), 0)
                        .toFixed(4)}
                    </strong>
                </div>
            )}
          </div>

          {results.map((r) => (
            <div key={r.model} className="border rounded p-3">
              <div className="text-sm font-medium mb-2">{r.model}</div>
              {r.error ? (
                <div className="text-sm text-red-700 bg-red-50 p-2 rounded">
                  {r.error}
                </div>
              ) : (
                <pre className="text-sm whitespace-pre-wrap">
                  {r.text || '(no text)'}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
