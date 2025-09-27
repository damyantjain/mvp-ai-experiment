'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // Parse tokens from the URL hash fragment: #access_token=...&refresh_token=...
      const hash = window.location.hash.startsWith('#')
        ? window.location.hash.substring(1)
        : '';
      const params = new URLSearchParams(hash);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      if (!access_token || !refresh_token) {
        console.error('No access/refresh token in callback URL');
        router.replace('/?auth=error_missing_tokens');
        return;
      }

      // 1) Set client session
      const { error: setErr } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (setErr) {
        console.error('setSession error', setErr);
        router.replace('/?auth=error_setsession');
        return;
      }

      // 2) Sync to server cookies so Server Components can see user
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token, refresh_token }),
      });
      if (!res.ok) {
        console.error('sync failed', await res.text());
        router.replace('/?auth=error_sync');
        return;
      }

      // 3) Go home
      router.replace('/');
    })();
  }, [router]);

  return <p className="p-4 text-sm">Signing you in…</p>;
}
