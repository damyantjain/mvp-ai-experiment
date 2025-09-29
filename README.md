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

Run development server:
```bash
doppler run -- npm run dev
```
