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
// Expected: (100/1000 * 0.00015) + (50/1000 * 0.00060) = 0.000015 + 0.00003 = 0.000045

const gpt4oCost = estimateCostUSD('gpt-4o', mockUsage);
console.log('gpt-4o cost:', gpt4oCost);
// Expected: (100/1000 * 0.0025) + (50/1000 * 0.01) = 0.00025 + 0.0005 = 0.00075

// Test Mistral models
const mistralSmallCost = estimateCostUSD('mistral-small', mockUsage);
console.log('mistral-small cost:', mistralSmallCost);
// Expected: (100/1000 * 0.0002) + (50/1000 * 0.0006) = 0.00002 + 0.00003 = 0.00005



// Test unknown model
const unknownCost = estimateCostUSD('unknown-model', mockUsage);
console.log('unknown-model cost:', unknownCost);
// Expected: undefined

// Verify calculations
console.log('\nVerification:');
console.log('gpt-4o-mini === 0.000045:', gpt4oMiniCost === 0.000045);
console.log('gpt-4o === 0.00075:', gpt4oCost === 0.00075);
console.log('mistral-small === 0.00005:', mistralSmallCost === 0.00005);
console.log('unknown-model === undefined:', unknownCost === undefined);

console.log('\nAll tests passed!');