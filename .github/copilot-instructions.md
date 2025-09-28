# CoralCake — Copilot Instructions

You are helping on **CoralCake**, a small Next.js + Supabase app for running prompts across LLMs and comparing latency, tokens, and cost. Keep changes **small, typed, and safe**.

---

## Project context

- **Frontend**: Next.js (App Router) + TypeScript, minimal Tailwind.
- **Auth & DB**: Supabase; **Row-Level Security (RLS)** enforced. We use *publishable* anon key on the server with cookies so RLS applies to the signed-in user.
- **Data model**:
  - `runs(id, user_id, prompt, models, metrics, created_at)` — per run metrics (jsonb).
  - `run_outputs(id, run_id, user_id, model, output, created_at)` — long-form outputs.
- **LLM calls**: Always via **Helicone proxy** using `fetch` (not provider SDKs).
  - OpenAI base: `https://oai.helicone.ai/v1`
  - Include headers:
    - `Authorization: Bearer ${PROVIDER_API_KEY}`
    - `Helicone-Auth: Bearer ${HELICONE_API_KEY}`
    - `Helicone-Property-Env: <node env>`
    - (Optional) `Helicone-Property-User-Id: <user id>`
- **Env management**: Doppler injects env vars at runtime (`doppler run -- npm run dev`).
- **Observability**: Sentry (errors/traces), Helicone (LLM metrics).

---

## Build & test

- **Install**: `npm ci`
- **Dev**: `npm run dev`
- **Lint**: `npm run lint` (or `npx next lint`)
- **Typecheck**: `npx tsc --noEmit`
- (If you add tests) **Test**: `npm test` (set up as needed)

CI requires **lint + typecheck** to pass. Keep diffs small so reviews are fast.

---

## Guardrails (must follow)

- **Do not edit** (without explicit approval label `requires-owner-ok`):
  - `src/lib/supabase/**`
  - `src/app/api/auth/**`
  - `supabase/*.sql`
- **Secrets**: Never commit secrets or hardcode keys. Read from `process.env.*`.
- **Types**: No `any`. Use strict, explicit types and narrow `unknown` on catch.
- **Diff size**: Target **< 500 LOC** changed per PR.
- **RLS awareness**: All DB access must respect RLS (use our server client with cookies).
- **Helicone**: Prefer `fetch` with explicit headers over SDKs.

---

## PR expectations

In every PR description, include:

1) **What & Why** (one paragraph)
2) **Changes** (bullet list)
3) **Acceptance Criteria** (what “done” means)
4) **Checkmarks**:
   - [ ] Lint + typecheck pass locally
   - [ ] No edits to protected paths (or carries `requires-owner-ok`)
   - [ ] Added/updated tests for changed logic (if applicable)
5) **Manual test notes** (how you verified)

---

## Coding conventions

- **API routes**: Return precise 4xx on validation errors; 5xx on unexpected errors.
- **Validation**: Prefer Zod schemas for external input (API payloads).
- **Errors**: `catch (err: unknown)` then narrow (`instanceof Error`) before using.
- **Timeouts**: LLM calls should include a **30s** timeout wrapper and (if added) 2–3 retries for **429/5xx** with jittered backoff.
- **Pricing**: Keep per-model prices in `src/lib/llm/pricing.ts`. Compute cost as:
  - `inCost = prompt_tokens / 1000 * inK`, `outCost = completion_tokens / 1000 * outK`.
- **Adapters**: One file per provider:
  - OpenAI: `src/lib/llm/openaiFetch.ts` (already exists)
  - New providers should mirror the same return shape: `{ text, usage?, latency_ms, raw? }`.

---

## Labels → behavior

- `plan`: Draft a small plan as a comment (Goal, Deliverables, Steps, Risks, Test Plan, Out of scope).
- `agent:implement`: Implement the plan in a **small** PR.
- `agent:test`: Add/adjust tests until CI is green.
- `agent:referee`: Summarize changes, confirm CI is green, flag risks.

*(CoralCake may use GitHub’s Copilot coding agent. These labels signal intent and scope.)*

---

## Common tasks (examples)

1) **Add a provider (e.g., Mistral)**
   - Create `src/lib/llm/mistralFetch.ts`:
     - Base URL: `https://mistral.helicone.ai/v1`
     - Headers: `Authorization` (MISTRAL key), `Helicone-Auth`, properties
     - Same response shape as OpenAI helper
   - Route by model prefix in `/api/run`: `mistral-*` → Mistral helper; `gpt-*` → OpenAI helper
   - Add models to `/runner` selector
   - Update `pricing.ts` with token prices (placeholder OK; comment if approximate)
   - Verify in Helicone dashboard

2) **Retries with jitter**
   - Utility `withRetries(fn, { attempts=3, baseMs=400 })` (retry 429/5xx only)
   - Use it in provider helpers; add unit tests for retry behavior

3) **Stricter validation in `/api/run`**
   - Introduce `zod` schema for `{ prompt: string; models: string[] }`
   - Return 400 on invalid; test with malformed payloads

4) **UI polish**
   - Add “Total cost” chip and per-model status (success/error)
   - Remember selected models via `localStorage`

---

## Acceptance checklist (per task)

- Clear plan comment (if `plan`).
- Minimal, focused diff; **no protected paths** changed.
- Lint + typecheck green locally and in CI.
- If logic changed: tests added/updated (stable, deterministic).
- Manual verification steps documented (e.g., `/runner` flow, Helicone log appears).

---

## Notes for Copilot (reasoning style)

- Prefer incremental diffs; propose **unified diffs** or file patches with brief rationale.
- If unsure of an env var name or endpoint (e.g., vendor Helicone base), infer from existing OpenAI helper and note assumptions in the PR.
- If a choice affects security or RLS, stop and ask for approval (`requires-owner-ok`).

---
