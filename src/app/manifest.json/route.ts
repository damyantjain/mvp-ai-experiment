export const runtime = 'edge';

export async function GET() {
  const manifest = {
    name: 'CoralCake - LLM Performance Comparison',
    short_name: 'CoralCake',
    description: 'Compare performance, latency, and costs across multiple language models',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['productivity', 'developer', 'ai'],
    orientation: 'portrait-primary',
    scope: '/',
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}