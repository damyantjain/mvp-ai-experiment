import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server Components helper (read-only cookies).
 * Use this inside server components / loaders (e.g., in app routes and pages).
 * For Route Handlers or Server Actions where Supabase needs to SET cookies,
 * we'll add a separate helper later.
 */
export async function createClient() {
  const jar = await cookies(); // Next.js 15: async cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // New adapter shape expected by @supabase/ssr
        getAll() {
          return jar.getAll().map((c) => ({ name: c.name, value: c.value }));
        },
        // In Server Components, cookies are read-only → no-op
        setAll() {}
      }
    }
  );
}
