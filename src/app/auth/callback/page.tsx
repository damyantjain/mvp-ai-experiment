'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

function AuthCallbackComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      // Get the intended redirect destination from query params
      const redirectTo = searchParams.get('redirectTo') || '/';

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

      // 3) Redirect to intended destination
      router.replace(redirectTo);
    })();
  }, [router, searchParams]);

  return <p className="p-4 text-sm">Signing you in…</p>;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<p className="p-4 text-sm">Loading…</p>}>
      <AuthCallbackComponent />
    </Suspense>
  );
}
