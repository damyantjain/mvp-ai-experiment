# CoralCake Product Roadmap

This roadmap outlines the strategic direction for CoralCake's evolution from a basic LLM comparison tool to a comprehensive evaluation platform for startups and enterprises.

## Vision

Transform CoralCake into the go-to platform for startups evaluating and selecting LLMs for their workflows, providing objective comparisons, quality evaluation, and actionable insights.

## Released (v0.1) ✅

### Core Functionality
- [x] Multi-model prompt runner (OpenAI, Mistral)
- [x] Real-time performance metrics (latency, tokens, cost)
- [x] Side-by-side response comparison
- [x] User authentication (Supabase magic links)
- [x] Persistent run storage with RLS

### Recent Additions
- [x] CSV/JSON export functionality
- [x] Historical run comparison page
- [x] Aggregate statistics (total cost, avg latency, total tokens)
- [x] Response length metrics
- [x] Navigation improvements
- [x] Comprehensive documentation

## Phase 2: Automated Response Quality Evaluation 🎯

**Priority**: High  
**Timeline**: Q1 2025  
**Goal**: Enable objective quality assessment beyond just metrics

### Issues to Create

#### 2.1 Built-in Scoring System
- [ ] **Issue**: Implement relevance scoring
  - Use keyword matching and semantic similarity
  - Score responses 0-100 for relevance to prompt
  - Display score in results table
  
- [ ] **Issue**: Add coherence/readability metrics
  - Sentence structure analysis
  - Readability score (Flesch-Kincaid)
  - Grammar check integration (basic)

- [ ] **Issue**: Response quality dashboard
  - Visual scoring indicators (color-coded)
  - Aggregate quality scores
  - Quality trends over time

#### 2.2 Human Feedback Integration
- [ ] **Issue**: Add thumbs up/down to responses
  - Simple feedback mechanism
  - Store feedback with run_id
  - Display feedback stats in Compare page

- [ ] **Issue**: Star rating system (1-5 stars)
  - Per-response rating
  - Aggregate ratings per model
  - Export ratings with results

- [ ] **Issue**: Comments/notes on responses
  - Add text notes to any response
  - Searchable notes
  - Team collaboration features

#### 2.3 Custom Evaluation Scripts
- [ ] **Issue**: Custom eval script support
  - Upload Python/JavaScript evaluation scripts
  - Run scripts against responses
  - Display custom metrics alongside built-in ones

- [ ] **Issue**: Eval script marketplace
  - Community-contributed scripts
  - Pre-built scripts for common tasks (summarization, translation, etc.)
  - Version control for scripts

#### 2.4 Third-Party Validators
- [ ] **Issue**: RAGAS integration
  - Retrieval-augmented generation assessment
  - Context precision, recall, and relevance
  - API integration

- [ ] **Issue**: TruLens integration
  - LLM observability and evaluation
  - Groundedness, answer relevance, context relevance
  - Dashboard integration

## Phase 3: Batch Prompt Testing 📊

**Priority**: High  
**Timeline**: Q1-Q2 2025  
**Goal**: Scale from single prompts to bulk testing

### Issues to Create

#### 3.1 Bulk Upload
- [ ] **Issue**: CSV prompt upload
  - Support multi-column CSV (prompt, expected_output, tags)
  - Validation and preview before running
  - Template download

- [ ] **Issue**: JSON prompt upload
  - Support complex prompt structures
  - Variable substitution
  - Nested/conditional prompts

#### 3.2 Batch Runner
- [ ] **Issue**: Background job processing
  - Queue system for large batches
  - Progress tracking UI
  - Email notification on completion

- [ ] **Issue**: Parallel execution
  - Configurable concurrency
  - Rate limit handling
  - Retry logic for failures

#### 3.3 Reporting
- [ ] **Issue**: Batch summary report
  - Success/failure rates
  - Average metrics across batch
  - Cost projections

- [ ] **Issue**: Downloadable reports
  - PDF report generation
  - Excel workbook with multiple sheets
  - Shareable links

## Phase 4: Prompt Engineering Playground 🛠️

**Priority**: Medium  
**Timeline**: Q2 2025  
**Goal**: Support iterative prompt optimization

### Issues to Create

#### 4.1 Versioning
- [ ] **Issue**: Prompt version control
  - Git-like versioning for prompts
  - Diff view between versions
  - Rollback capability

- [ ] **Issue**: Prompt templates
  - Save reusable prompt templates
  - Variable placeholders
  - Template library

#### 4.2 A/B Testing
- [ ] **Issue**: A/B test framework
  - Define prompt variants (A, B, C)
  - Split traffic across variants
  - Statistical significance testing

- [ ] **Issue**: Multi-variate testing
  - Test multiple variables simultaneously
  - Factorial experiment design
  - Results analysis

#### 4.3 Prompt Optimization
- [ ] **Issue**: Prompt suggestion engine
  - AI-powered prompt improvement suggestions
  - Best practices enforcement
  - Auto-formatting

- [ ] **Issue**: Performance tracking over iterations
  - Version comparison view
  - Performance trends visualization
  - Optimization recommendations

## Phase 5: Extended LLM Integration 🔌

**Priority**: Medium  
**Timeline**: Q2-Q3 2025  
**Goal**: Support all major LLM providers

### Issues to Create

#### 5.1 New Providers
- [ ] **Issue**: Anthropic Claude integration
  - Claude 3 models (Opus, Sonnet, Haiku)
  - Helicone proxy setup
  - Pricing integration

- [ ] **Issue**: Google Gemini integration
  - Gemini Pro and Ultra models
  - API setup and testing
  - Cost tracking

- [ ] **Issue**: Cohere integration
  - Command and Embed models
  - RAG-specific features
  - Pricing updates

- [ ] **Issue**: HuggingFace support
  - Open-source model hosting
  - Custom model endpoints
  - Self-hosted options

#### 5.2 Model Metadata
- [ ] **Issue**: Model information page
  - Capabilities and limitations
  - Context window, max tokens
  - Training data cutoff dates

- [ ] **Issue**: Model changelogs
  - Track model updates
  - Performance changes over time
  - Deprecation notices

## Phase 6: Intelligent Recommendations 🤖

**Priority**: Low  
**Timeline**: Q3-Q4 2025  
**Goal**: Help users select optimal models automatically

### Issues to Create

#### 6.1 Recommendation Engine
- [ ] **Issue**: Model recommendation based on criteria
  - Input: cost budget, latency requirements, quality threshold
  - Output: ranked model recommendations
  - Explanation of recommendations

- [ ] **Issue**: Use-case specific suggestions
  - Predefined use cases (chatbot, summarization, code generation)
  - Model performance by use case
  - Custom use case definitions

#### 6.2 Optimization
- [ ] **Issue**: Cost-performance optimizer
  - Find optimal model for cost/quality tradeoff
  - Pareto frontier visualization
  - What-if analysis

- [ ] **Issue**: Auto-model selection
  - Automatically route prompts to best model
  - Fallback strategies
  - Confidence thresholds

## Phase 7: Enhanced Documentation 📚

**Priority**: Medium (Ongoing)  
**Timeline**: All phases  
**Goal**: Comprehensive docs for all features

### Issues to Create

- [ ] **Issue**: Feature usage guides (per feature)
- [ ] **Issue**: API documentation (when API is built)
- [ ] **Issue**: Video tutorials and demos
- [ ] **Issue**: Best practices guide
- [ ] **Issue**: Example workflows and case studies
- [ ] **Issue**: Integration guides (CI/CD, etc.)

## Success Metrics

### Phase 2
- 80% of users utilize quality scoring features
- Average feedback provided per run: >1 rating
- 50% reduction in manual quality assessment time

### Phase 3
- Support batches of 100+ prompts
- 90% success rate on batch processing
- 5x increase in total prompts processed

### Phase 4
- 60% of users create prompt templates
- 40% run A/B tests on prompts
- Measurable improvement in prompt quality scores

### Phase 5
- Support 8+ LLM providers
- Coverage of 90% of commercial LLMs
- Model metadata 100% accurate and up-to-date

### Phase 6
- 70% of users leverage recommendations
- 80% agree with model suggestions
- 30% reduction in model selection time

## Community Input

We welcome feedback on this roadmap! Please:
- Comment on prioritization
- Suggest new features
- Vote on issues
- Contribute implementations

## Version History

- **v0.1** (Jan 2025): Initial release with core features
- **Roadmap v1** (Jan 2025): Strategic plan published

---

*This roadmap is a living document and will be updated based on user feedback, market needs, and technical constraints.*
