import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function LastRunPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <p className="p-4">Please sign in.</p>;

  // fetch most recent run
  const { data: runs } = await supabase
    .from('runs')
    .select('id,prompt,created_at,models,metrics')
    .order('created_at', { ascending: false })
    .limit(1);

  const run = runs?.[0];
  if (!run) return <p className="p-4">No runs yet.</p>;

  // fetch outputs for that run
  const { data: outputs } = await supabase
    .from('run_outputs')
    .select('model,output,created_at')
    .eq('run_id', run.id)
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Last Run</h1>
      <div className="text-sm text-gray-700">
        <div><strong>When:</strong> {new Date(run.created_at).toLocaleString()}</div>
        <div><strong>Prompt:</strong> <em>{run.prompt}</em></div>
      </div>

      <div className="space-y-3">
        {outputs?.length ? outputs.map(o => (
          <div key={o.model} className="border rounded p-3">
            <div className="text-sm font-medium mb-2">{o.model}</div>
            <pre className="text-sm whitespace-pre-wrap">{o.output}</pre>
          </div>
        )) : (
          <p className="text-sm text-gray-600">No outputs stored for this run.</p>
        )}
      </div>
    </div>
  );
}
