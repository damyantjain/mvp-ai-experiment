// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import AuthSync from '@/components/AuthSync';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'CoralCake - Compare LLMs with Performance Metrics',
  description: 'Run prompts across multiple language models and compare their performance, latency, token usage, and costs in real-time.',
  keywords: 'LLM, language models, OpenAI, Mistral, performance comparison, AI tools',
  authors: [{ name: 'CoralCake Team' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f97316',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://oai.helicone.ai https://mistral.helicone.ai; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://oai.helicone.ai https://mistral.helicone.ai https://*.supabase.co; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self';" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AuthSync />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
