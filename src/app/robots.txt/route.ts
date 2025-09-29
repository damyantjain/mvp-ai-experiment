export const runtime = 'edge';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Allow crawling of main pages
Allow: /runner
Allow: /runs-last

# Disallow sensitive endpoints
Disallow: /api/
Disallow: /auth-debug
Disallow: /runs-debug
Disallow: /provider-test

Sitemap: https://coralcake.vercel.app/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}