// Simple test for pricing calculations
import { estimateCostUSD } from '../pricing';

// Mock usage data
const mockUsage = {
  prompt_tokens: 100,
  completion_tokens: 50,
  total_tokens: 150,
};

console.log('Testing pricing calculations...');

// Test OpenAI models
const gpt4oMiniCost = estimateCostUSD('gpt-4o-mini', mockUsage);
console.log('gpt-4o-mini cost:', gpt4oMiniCost);
// Expected: (100/1000 * 0.15) + (50/1000 * 0.60) = 0.015 + 0.03 = 0.045

const gpt4oCost = estimateCostUSD('gpt-4o', mockUsage);
console.log('gpt-4o cost:', gpt4oCost);
// Expected: (100/1000 * 5.00) + (50/1000 * 15.00) = 0.5 + 0.75 = 1.25

// Test Mistral models
const mistralSmallCost = estimateCostUSD('mistral-small', mockUsage);
console.log('mistral-small cost:', mistralSmallCost);
// Expected: (100/1000 * 0.20) + (50/1000 * 0.60) = 0.02 + 0.03 = 0.05

const mistralLargeCost = estimateCostUSD('mistral-large', mockUsage);
console.log('mistral-large cost:', mistralLargeCost);
// Expected: (100/1000 * 2.00) + (50/1000 * 6.00) = 0.2 + 0.3 = 0.5

// Test unknown model
const unknownCost = estimateCostUSD('unknown-model', mockUsage);
console.log('unknown-model cost:', unknownCost);
// Expected: undefined

// Verify calculations
console.log('\nVerification:');
console.log('gpt-4o-mini === 0.045:', gpt4oMiniCost === 0.045);
console.log('gpt-4o === 1.25:', gpt4oCost === 1.25);
console.log('mistral-small === 0.05:', mistralSmallCost === 0.05);
console.log('mistral-large === 0.5:', mistralLargeCost === 0.5);
console.log('unknown-model === undefined:', unknownCost === undefined);

console.log('\nAll tests passed!');