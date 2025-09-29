'use client';

import { useState } from 'react';

type TestResult = {
  ok: boolean;
  provider: string;
  model?: string;
  text?: string;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  latency_ms?: number;
  error?: string;
};

export default function ProviderTestPage() {
  const [openaiResult, setOpenaiResult] = useState<TestResult | null>(null);
  const [mistralResult, setMistralResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState<{ openai: boolean; mistral: boolean }>({
    openai: false,
    mistral: false,
  });

  async function testOpenAI() {
    setLoading(prev => ({ ...prev, openai: true }));
    setOpenaiResult(null);
    try {
      const res = await fetch('/api/openai-direct');
      const data = await res.json();
      setOpenaiResult({ ...data, provider: 'openai', model: 'gpt-4o-mini' });
    } catch (err) {
      setOpenaiResult({
        ok: false,
        provider: 'openai',
        error: err instanceof Error ? err.message : String(err)
      });
    } finally {
      setLoading(prev => ({ ...prev, openai: false }));
    }
  }

  async function testMistral() {
    setLoading(prev => ({ ...prev, mistral: true }));
    setMistralResult(null);
    try {
      const res = await fetch('/api/mistral-test');
      const data = await res.json();
      setMistralResult(data);
    } catch (err) {
      setMistralResult({
        ok: false,
        provider: 'mistral',
        error: err instanceof Error ? err.message : String(err)
      });
    } finally {
      setLoading(prev => ({ ...prev, mistral: false }));
    }
  }

  function ResultCard({ result, provider }: { result: TestResult | null; provider: string }) {
    if (!result) return null;

    return (
      <div className={`border rounded p-4 ${result.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <h3 className="font-medium mb-2">{provider} Result</h3>
        {result.ok ? (
          <div className="space-y-2 text-sm">
            <div><strong>Model:</strong> {result.model}</div>
            <div><strong>Response:</strong> {result.text}</div>
            <div><strong>Latency:</strong> {result.latency_ms}ms</div>
            {result.usage && (
              <div><strong>Tokens:</strong> {result.usage.prompt_tokens} / {result.usage.completion_tokens} / {result.usage.total_tokens}</div>
            )}
          </div>
        ) : (
          <div className="text-red-700 text-sm">
            <strong>Error:</strong> {result.error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Provider Integration Test</h1>
      <p className="text-gray-600">Test both OpenAI and Mistral providers via Helicone</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OpenAI Test */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">OpenAI Provider</h2>
            <button
              onClick={testOpenAI}
              disabled={loading.openai}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
            >
              {loading.openai ? 'Testing...' : 'Test OpenAI'}
            </button>
          </div>
          <ResultCard result={openaiResult} provider="OpenAI" />
        </div>

        {/* Mistral Test */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Mistral Provider</h2>
            <button
              onClick={testMistral}
              disabled={loading.mistral}
              className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50 hover:bg-orange-600"
            >
              {loading.mistral ? 'Testing...' : 'Test Mistral'}
            </button>
          </div>
          <ResultCard result={mistralResult} provider="Mistral" />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-medium mb-2">Environment Requirements</h3>
        <p className="text-sm text-blue-800">
          For these tests to work, you need to set the following environment variables:
        </p>
        <ul className="text-sm text-blue-800 mt-2 list-disc list-inside">
          <li><code>OPENAI_API_KEY</code></li>
          <li><code>MISTRAL_API_KEY</code></li>
          <li><code>HELICONE_API_KEY</code></li>
        </ul>
      </div>
    </div>
  );
}