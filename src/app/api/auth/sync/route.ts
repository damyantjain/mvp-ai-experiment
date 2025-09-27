export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClientAction } from '@/lib/supabase/server-action';

export async function POST(req: Request) {
  const { access_token, refresh_token } = await req.json();
  if (!access_token || !refresh_token) {
    return NextResponse.json({ error: 'Missing tokens' }, { status: 400 });
  }

  const supabase = await createClientAction();
  const { error } = await supabase.auth.setSession({ access_token, refresh_token });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
