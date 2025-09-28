// src/app/api/run/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callOpenAIViaHelicone, type LLMResult } from '@/lib/llm/openaiFetch';
import { estimateCostUSD, type Usage } from '@/lib/llm/pricing';

type RunRequest = {
  prompt: string;
  models: string[];
};

type PerModelMetrics = {
  latency_ms: number;
  usage?: Usage;
  cost_usd?: number;
  error?: string;
  text_len?: number;
};

type RunResult = {
  model: string;
  text: string;
  latency_ms: number;
  usage?: Usage;
  cost_usd?: number;
  error?: string;
};

type RunResponse = {
  results: RunResult[];
};

type Ok = { model: string; ok: true; text: string; latency_ms: number; usage?: Usage };
type Err = { model: string; ok: false; text: ''; latency_ms: 0; error: string };

function withTimeout<T>(p: Promise<T>, ms = 30_000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      }
    );
  });
}

export async function POST(req: Request) {
  try {
    // 1) Auth: who is calling?
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2) Validate payload
    const { prompt, models }: RunRequest = await req.json();
    if (typeof prompt !== 'string' || !Array.isArray(models) || models.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 3) Fan out calls in parallel (per model)
    const calls: Promise<Ok | Err>[] = models.map(async (model): Promise<Ok | Err> => {
    try {
        const r: LLMResult = await withTimeout(
        callOpenAIViaHelicone({
            model,
            userId: user.id,
            messages: [
            { role: 'system', content: 'You are a concise assistant.' },
            { role: 'user', content: prompt },
            ],
        }),
        30_000
        );

        return {
        model,
        ok: true as const,             // literal true
        text: r.text,
        latency_ms: r.latency_ms,
        usage: r.usage,
        };
    } catch (err: unknown) {
        const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);

        return {
        model,
        ok: false as const,            // literal false
        text: '',
        latency_ms: 0 as const,
        error: message,
        };
    }
    });

    const settled = await Promise.all(calls);

    // 4) Persist run metrics (not storing full outputs; just metrics)
    const metrics: Record<string, PerModelMetrics> = {};
    const results: RunResult[] = [];

    for (const r of settled) {
      if (r.ok) {
        const cost = estimateCostUSD(r.model, r.usage);
        metrics[r.model] = {
          latency_ms: r.latency_ms,
          usage: r.usage,
          cost_usd: cost,
          text_len: r.text.length,
        };
        results.push({
          model: r.model,
          text: r.text,
          latency_ms: r.latency_ms,
          usage: r.usage,
          cost_usd: cost,
        });
      } else {
        metrics[r.model] = { latency_ms: 0, error: r.error };
        results.push({
          model: r.model,
          text: '',
          latency_ms: 0,
          error: r.error,
        });
      }
    }

    const { error: dbErr } = await supabase.from('runs').insert({
      user_id: user.id,
      prompt,
      models,
      metrics,
    });
    if (dbErr) {
      // Not fatal for the client; log and still return results
      // (Sentry will capture if configured)
      console.error('Failed to save run:', dbErr.message);
    }

    return NextResponse.json({ results } satisfies RunResponse);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
