// Minimal Mistral->Helicone helper using fetch (SDK-agnostic)
import type { LLMResult } from './openaiFetch';
import { withTimeout } from '../utils';

export async function callMistralViaHelicone({
  model,
  messages,
  userId,
}: {
  model: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  userId?: string;
}): Promise<LLMResult> {
  const t0 = Date.now();

  const fetchPromise = fetch('https://mistral.helicone.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Mistral auth:
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY!}`,
      // Helicone auth + optional tags for dashboard filtering:
      'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY!}`,
      ...(userId ? { 'Helicone-Property-User-Id': userId } : {}),
      'Helicone-Property-Env': process.env.NODE_ENV || 'development',
      'Helicone-Cache-Enabled': 'true',
    },
    body: JSON.stringify({ model, messages }),
  });

  const res = await withTimeout(fetchPromise, 30_000);
  const latency_ms = Date.now() - t0;
  const text = await res.text();

  if (!res.ok) {
    // surface the exact error body (helps debug)
    throw new Error(`Mistral/Helicone ${res.status}: ${text}`);
  }

  const data = JSON.parse(text);
  const out: LLMResult = {
    text: data.choices?.[0]?.message?.content ?? '',
    usage: data.usage,
    latency_ms,
    raw: data,
  };
  return out;
}