import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClientAction() {
  const jar = await cookies();
  const isProd = process.env.NODE_ENV === 'production';

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return jar.getAll().map(c => ({ name: c.name, value: c.value }));
        },
        setAll(list) {
          for (const { name, value, options } of list) {
            // localhost-friendly defaults in dev so the browser doesn't drop them
            const merged = {
              path: '/',
              httpOnly: true,
              sameSite: 'lax' as const,
              secure: isProd,   // false on http://localhost, true in prod
              ...options,
            };
            // writable in route handlers
            jar.set(name, value, merged);
          }
        },
      },
    }
  );
}
