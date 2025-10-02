# CoralCake Usage Guide

This guide walks you through the main features of CoralCake and how to use them effectively.

## Getting Started

### Prerequisites
- A CoralCake account (sign in with email on the homepage)
- Access to the platform at [https://coralcake.vercel.app](https://coralcake.vercel.app)

## Feature Walkthroughs

### 1. Running Your First LLM Comparison

**Steps:**
1. Navigate to the **Runner** page from the header menu or homepage
2. Enter your prompt in the text area (e.g., "Explain quantum computing in simple terms")
3. Select the models you want to compare (you can select multiple):
   - OpenAI: gpt-4o-mini (fast, cost-effective)
   - OpenAI: gpt-4o (most capable, higher cost)
   - Mistral: mistral-small (competitive alternative)
4. Click **"Run Comparison"**
5. Wait for results to load (usually 2-5 seconds per model)

**What You'll See:**
- A performance summary table showing:
  - Model name
  - Latency (response time in milliseconds)
  - Token usage (prompt/completion/total)
  - Cost (in USD)
  - Response length (character count)
- Aggregate statistics:
  - Total cost across all models
  - Average latency
  - Total tokens used
- Full responses from each model with success/error status

### 2. Exporting Results for Analysis

**When to Export:**
After running a comparison, you may want to:
- Share results with your team
- Analyze data in Excel or Google Sheets
- Store results for compliance/auditing
- Integrate with your own tools

**How to Export:**
1. After viewing your results on the Runner page
2. Click **"Export CSV"** for spreadsheet analysis or **"Export JSON"** for programmatic use
3. The file will download automatically with timestamp (e.g., `llm-comparison-1704567890123.csv`)

**What's Included:**
- CSV format includes: Model, Latency, Tokens, Cost, Response Length, Status
- JSON format includes: Full prompt, all metrics, complete responses

**Use Cases:**
- **CSV**: Import into Excel/Google Sheets for charts and pivot tables
- **JSON**: Feed into analytics pipelines or custom dashboards

### 3. Comparing Historical Runs

**Why Compare History:**
- Track how models improve over time
- Compare different prompts across same models
- Analyze cost trends
- Share past results with stakeholders

**Steps:**
1. Navigate to the **Compare** page from the header menu
2. Browse your historical test runs (sorted by date)
3. Select up to 3 runs by checking the boxes
4. View side-by-side comparison below

**What You'll See:**
- Prompt used for each run
- Date and time of execution
- Models tested in each run
- Performance metrics table for each run
- Easy comparison of metrics across runs

**Pro Tips:**
- Use the same prompt with different models to find the best performer
- Run the same prompt periodically to track model improvements
- Compare different prompt variations to optimize performance

### 4. Understanding the Metrics

**Latency (Response Time)**
- Measured in milliseconds (ms)
- Lower is better for real-time applications
- Typical range: 500ms - 5000ms
- Use case: Choose faster models for chatbots, slower OK for batch processing

**Token Usage**
- Prompt tokens: Input characters converted to tokens
- Completion tokens: Output response tokens
- Total tokens: Sum of both
- Use case: Monitor for cost optimization and rate limits

**Cost**
- Calculated based on token usage and provider pricing
- Displayed per model and total
- Updated in real-time as prices change
- Use case: Budget planning and cost optimization

**Response Length**
- Character count of model output
- Helps assess verbosity
- Use case: Choose concise models for summaries, verbose for explanations

## Best Practices

### For Prompt Testing
1. **Test with representative prompts**: Use prompts similar to your production use case
2. **Run multiple times**: Results can vary, especially for creative tasks
3. **Compare apples to apples**: Use same prompt across all models
4. **Consider context**: Different models excel at different tasks

### For Cost Optimization
1. **Start with cheaper models**: Test gpt-4o-mini before gpt-4o
2. **Monitor token usage**: Longer responses = higher costs
3. **Export regularly**: Track spending over time
4. **Use historical comparison**: Identify cost trends

### For Performance Tuning
1. **Measure baseline**: Run initial comparison without optimizations
2. **Iterate on prompts**: Small changes can significantly impact results
3. **Track in history**: Use Compare page to see improvements
4. **Document findings**: Export and share with team

## Common Use Cases

### Use Case 1: Choosing a Model for Production
**Scenario**: You're building a customer support chatbot and need to choose an LLM.

**Steps:**
1. Write a representative customer query prompt
2. Run comparison across all available models
3. Evaluate based on:
   - Response quality (read the outputs)
   - Latency (chatbots need fast responses)
   - Cost (calculate based on expected volume)
4. Export results to share with stakeholders
5. Make informed decision

### Use Case 2: Optimizing an Existing Prompt
**Scenario**: Your current prompt is too expensive or slow.

**Steps:**
1. Run baseline comparison with current prompt
2. Export baseline results
3. Modify prompt for clarity/brevity
4. Run new comparison
5. Use Compare page to view both runs side-by-side
6. Analyze improvements in cost, speed, or quality

### Use Case 3: Monthly LLM Performance Review
**Scenario**: Track how model performance evolves over time.

**Steps:**
1. Create a standard test prompt
2. Run monthly comparisons with same prompt
3. Use Compare page to select runs from different months
4. Export data for trending analysis
5. Document changes in model capabilities

## Troubleshooting

### "Unauthorized" Error
- **Cause**: Not signed in
- **Solution**: Click "Send link" in header and check email for magic link

### "Run failed" Message
- **Cause**: Model API issue, network problem, or invalid prompt
- **Solution**: Check prompt for special characters, try again, or try different models

### No Historical Runs in Compare Page
- **Cause**: Haven't run any comparisons yet
- **Solution**: Run your first comparison on the Runner page

### Export Button Not Working
- **Cause**: No results to export
- **Solution**: Run a comparison first, then export

## FAQ

**Q: How many models can I compare at once?**
A: You can select all available models (currently 3: gpt-4o, gpt-4o-mini, mistral-small).

**Q: Are my prompts and results private?**
A: Yes, all data is stored securely in your account and protected by Row-Level Security.

**Q: Can I delete old runs?**
A: Currently, all runs are preserved for historical comparison. Deletion feature coming soon.

**Q: How accurate are the cost estimates?**
A: Costs are calculated based on official provider pricing and actual token usage, updated regularly.

**Q: Can I use CoralCake programmatically?**
A: API access is planned for future release. Currently, you can export JSON for integration.

**Q: Which model should I choose?**
A: It depends on your use case:
- **gpt-4o-mini**: Best for cost-sensitive applications, still very capable
- **gpt-4o**: Best for complex reasoning, highest quality
- **mistral-small**: Good balance, competitive pricing

## Getting Help

- **Documentation**: Read FEATURES.md for detailed feature information
- **Issues**: Report bugs on GitHub
- **Updates**: Check the homepage for new features and models

---

**Last Updated**: January 2025
**Version**: 0.1
