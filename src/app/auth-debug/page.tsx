import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AuthDebugPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <pre className="p-4 bg-gray-50 rounded text-sm">
      {JSON.stringify(
        data.user ? { email: data.user.email, id: data.user.id } : { user: null },
        null, 2
      )}
    </pre>
  );
}
