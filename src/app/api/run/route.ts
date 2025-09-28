export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callOpenAIViaHelicone, type LLMResult } from '@/lib/llm/openaiFetch';

type RunRequest = {
  prompt: string;
  models: string[];
};

type PerModelMetrics = {
  latency_ms: number;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  error?: string;
  text_len?: number;
};

type RunResponse = {
  results: Array<{
    model: string;
    text: string;
    latency_ms: number;
    usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
    error?: string;
  }>;
};

export async function POST(req: Request) {
  try {
    // 1) Auth: who is calling?
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2) Validate payload
    const { prompt, models }: RunRequest = await req.json();
    if (typeof prompt !== 'string' || !Array.isArray(models) || models.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 3) Fan out calls in parallel
    const calls = models.map(async (model) => {
      try {
        const r: LLMResult = await callOpenAIViaHelicone({
          model,
          userId: user.id,
          messages: [
            { role: 'system', content: 'You are a concise assistant.' },
            { role: 'user', content: prompt }
          ]
        });
        return {
          model,
          ok: true as const,
          text: r.text,
          latency_ms: r.latency_ms,
          usage: r.usage
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
        return {
          model,
          ok: false as const,
          text: '',
          latency_ms: 0,
          error: message
        };
      }
    });

    const settled = await Promise.all(calls);

    // 4) Persist run metrics (not storing outputs yet; just metrics)
    const metrics: Record<string, PerModelMetrics> = {};
    for (const r of settled) {
      if (r.ok) {
        metrics[r.model] = {
          latency_ms: r.latency_ms,
          usage: r.usage,
          text_len: r.text.length
        };
      } else {
        metrics[r.model] = {
          latency_ms: 0,
          error: r.error
        };
      }
    }

    const { error: dbErr } = await supabase.from('runs').insert({
      user_id: user.id,
      prompt,
      models,
      metrics
    });
    if (dbErr) {
      // not fatal for the client; return data but surface the save failure
      console.error('Failed to save run:', dbErr.message);
    }

    // 5) Respond
    const results: RunResponse['results'] = settled.map((r) =>
      r.ok
        ? ({
            model: r.model,
            text: r.text,
            latency_ms: r.latency_ms,
            usage: r.usage
          })
        : ({
            model: r.model,
            text: '',
            latency_ms: 0,
            error: r.error
          })
    );

    return NextResponse.json({ results } satisfies RunResponse);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
