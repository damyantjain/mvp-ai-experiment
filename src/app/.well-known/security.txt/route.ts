export const runtime = 'edge';

export async function GET() {
  const securityTxt = `Contact: https://github.com/damyantjain/CoralCake/security/advisories/new
Expires: 2025-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: https://coralcake.vercel.app/.well-known/security.txt
Policy: https://github.com/damyantjain/CoralCake/blob/main/README.md`;

  return new Response(securityTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}