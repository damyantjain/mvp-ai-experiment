// Token prices per 1K tokens (USD). Keep this tiny and update as needed.
type Price = { inK: number; outK: number }; // dollars per 1K tokens (input/output)
const PRICES: Record<string, Price> = {
  // NOTE: prices here are illustrative; update to current vendor pricing when you go live.
  'gpt-4o-mini': { inK: 0.15, outK: 0.60 }, // $0.15 / $0.60 per 1K
  'gpt-4o':      { inK: 5.00, outK: 15.00 }, // $5.00 / $15.00 per 1K
  
  // TODO: Update with actual Mistral pricing from their docs
  'mistral-small': { inK: 0.20, outK: 0.60 }, // Placeholder pricing
};

export type Usage = { prompt_tokens: number; completion_tokens: number; total_tokens: number };

export function estimateCostUSD(model: string, usage?: Usage): number | undefined {
  if (!usage) return undefined;
  const p = PRICES[model];
  if (!p) return undefined;
  const inCost  = (usage.prompt_tokens     / 1000) * p.inK;
  const outCost = (usage.completion_tokens / 1000) * p.outK;
  // round to 1/10,000th to avoid floating noise (optional)
  return Math.round((inCost + outCost) * 10000) / 10000;
}
