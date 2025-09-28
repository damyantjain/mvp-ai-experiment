export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callOpenAIViaHelicone } from '@/lib/llm/openaiFetch';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const result = await callOpenAIViaHelicone({
      model: 'gpt-4o-mini',
      userId: user?.id,
      messages: [
        { role: 'system', content: 'You are concise.' },
        { role: 'user', content: 'Say hello in 3 words.' },
      ],
    });

    return NextResponse.json({ ok: true, text: result.text, usage: result.usage, latency_ms: result.latency_ms });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
