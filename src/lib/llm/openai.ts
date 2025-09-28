import OpenAI from 'openai';

// Helicone works by acting as a proxy to OpenAI.
// We set baseURL to Helicone and pass a Helicone-Auth header.
// Your normal OPENAI_API_KEY is still used for auth to OpenAI.

export function createOpenAIClient({ userId }: { userId?: string } = {}) {
  const baseURL = 'https://ai-gateway.helicone.ai/v1'; // Helicone's OpenAI proxy
  const headers: Record<string, string> = {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY!}`,
    // Optional: custom properties for filtering in the dashboard
    ...(userId ? { 'Helicone-Property-User-Id': userId } : {}),
    'Helicone-Property-Env': process.env.NODE_ENV || 'development',
    'Helicone-Cache-Enabled': 'true' // you can turn on their caching if you want
  };

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
    baseURL,
    defaultHeaders: headers
  });
}
