# CoralCake Features

This document outlines the current and planned features for CoralCake, a platform for comparing and evaluating Large Language Models (LLMs).

## Current Features (v0.1)

### 1. LLM Prompt Runner
- **Location**: `/runner`
- **Description**: Test prompts across multiple LLMs simultaneously
- **Capabilities**:
  - Support for OpenAI (gpt-4o, gpt-4o-mini) and Mistral (mistral-small) models
  - Real-time performance metrics (latency, token usage, cost)
  - Side-by-side response comparison
  - Export results to CSV or JSON format
  - Aggregate statistics (total cost, average latency, total tokens)

### 2. Historical Comparison
- **Location**: `/compare`
- **Description**: Compare results from previous test runs
- **Capabilities**:
  - View all historical test runs
  - Select up to 3 runs for side-by-side comparison
  - Track performance trends over time
  - Filter and search past runs by prompt or model

### 3. Cost Analysis
- **Description**: Real-time cost estimation for each LLM call
- **Capabilities**:
  - Per-model pricing based on token usage
  - Total cost aggregation across multiple models
  - Cost breakdown (input tokens vs output tokens)
  - Export cost data for accounting purposes

### 4. Performance Metrics
- **Description**: Comprehensive metrics for each LLM response
- **Metrics Tracked**:
  - Latency (response time in milliseconds)
  - Token usage (prompt/completion/total)
  - Cost (USD)
  - Response length (character count)
  - Success/error status

### 5. Data Export
- **Description**: Export comparison results for further analysis
- **Formats**:
  - CSV (for spreadsheet analysis)
  - JSON (for programmatic use)
- **Includes**: All metrics, prompts, and responses

## Planned Features

### Phase 2: Automated Response Quality Evaluation
- Built-in scoring system (relevance, coherence, grammar)
- Human feedback integration (thumbs up/down, star ratings)
- Custom evaluation script support
- Third-party validator integration (RAGAS, TruLens)

### Phase 3: Batch Prompt Testing
- Bulk prompt upload (CSV, JSON)
- Automated benchmark runner with progress tracking
- Summary report generation
- Parallel execution for faster results

### Phase 4: Prompt Engineering Playground
- Prompt versioning and history
- A/B testing workflows
- Prompt suggestion engine
- Performance tracking over iterations

### Phase 5: Extended LLM Integration
- Anthropic Claude support
- Cohere models
- Google Gemini integration
- HuggingFace models
- Open-source model support
- Model metadata and changelogs

### Phase 6: Intelligent Recommendations
- Smart LLM recommendation based on user criteria
- Cost-performance optimization suggestions
- Use-case specific model selection
- Automated model selection for prompts

### Phase 7: Enhanced Documentation
- Feature usage guides
- API documentation for programmatic access
- Best practices for LLM evaluation
- Example workflows and use cases

## Usage Examples

### Running a Single Comparison
1. Navigate to `/runner`
2. Enter your prompt
3. Select models to compare
4. Click "Run Comparison"
5. Review results and export if needed

### Comparing Historical Runs
1. Navigate to `/compare`
2. Browse your previous test runs
3. Select up to 3 runs to compare
4. Review side-by-side metrics

### Exporting Results
1. After running a comparison on `/runner`
2. Click "Export CSV" or "Export JSON"
3. Save the file for later analysis

## Technical Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL with RLS)
- **LLM Integration**: Helicone proxy for all providers
- **Authentication**: Supabase Auth with magic links

## Contributing

We welcome contributions! Priority areas:
1. New LLM provider integrations
2. Evaluation metrics and scoring
3. UI/UX improvements
4. Documentation and examples

See the main README for development setup instructions.
