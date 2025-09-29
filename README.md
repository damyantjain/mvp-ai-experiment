# CoralCake

A Next.js + Supabase app for running prompts across LLMs and comparing latency, tokens, and cost.

## Supported Models

### OpenAI
- `gpt-4o-mini`
- `gpt-4o`

### Mistral
- `mistral-small`

## Setup

Set up environment variables via Doppler:
- `OPENAI_API_KEY`
- `MISTRAL_API_KEY` 
- `HELICONE_API_KEY`
- `SENTRY_DSN` - Sentry DSN for server-side error tracking
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN for client-side error tracking (can be the same as SENTRY_DSN)

Run development server:
```bash
doppler run -- npm run dev
```
