import { createClient } from '@/lib/supabase/server';

export default async function AuthDebugPage() {
  const supabase = await createClient();        // server-side Supabase client
  const { data } = await supabase.auth.getUser(); // read current user (if any)

  return (
    <div>
      <h1 className="text-xl font-semibold">Auth Debug</h1>
      <pre className="bg-gray-50 p-3 rounded text-sm">
        {JSON.stringify(
          data.user ? { email: data.user.email, id: data.user.id } : { user: null },
          null,
          2
        )}
      </pre>
      <p className="text-gray-600 text-sm">
        This page runs on the server. We’re just reading the current Supabase user.
      </p>
    </div>
  );
}
