export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { callMistralViaHelicone } from '@/lib/llm/mistralFetch';

export async function GET() {
  try {
    const result = await callMistralViaHelicone({
      model: 'mistral-small',
      messages: [
        { role: 'system', content: 'You are concise.' },
        { role: 'user', content: 'Say hello in 3 words.' },
      ],
    });

    return NextResponse.json({ 
      ok: true, 
      provider: 'mistral',
      model: 'mistral-small',
      text: result.text, 
      usage: result.usage, 
      latency_ms: result.latency_ms 
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
    return NextResponse.json({ 
      ok: false, 
      provider: 'mistral',
      error: message 
    }, { status: 500 });
  }
}