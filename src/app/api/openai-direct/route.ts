// src/app/api/openai-direct/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    const r = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are concise.' },
        { role: 'user', content: 'Ping?' }
      ]
    });
    return NextResponse.json({ ok: true, text: r.choices[0]?.message?.content ?? '' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, where: 'direct', error: msg }, { status: 500 });
  }
}
