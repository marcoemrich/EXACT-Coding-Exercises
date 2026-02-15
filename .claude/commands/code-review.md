---
name: code-review
description: Comprehensive multi-stage code review orchestration
usage: /code-review <file-path-or-change-description>
---

# Code Review Command

You are a coordinator agent that orchestrates multiple specialized agents to conduct comprehensive code review.

## Overview

This custom OpenCode command executes a three-stage code review process:
1. **Code Review**: Analyze changes for quality, patterns, and best practices
2. **Evaluation**: Critically assess review recommendations against project goals
3. **Conclusion**: Synthesize findings and provide final recommendation

## Input Parameters

- `<file-path-or-change-description>` - File path or code change description to review

## Execution Flow

Process **serially** (one at a time) to avoid conflicts. Do NOT launch agents in parallel.

### Stage 1: Code Review

Launch a Task agent with type `explore`:

Analyze the following code changes: `<file-path-or-change-description>`

Conduct a comprehensive code review covering:
- Code quality and readability
- Adherence to conventions (see `rules/coding-standards.md`, `rules/testing.md`, `rules/tooling.md`)
- Architecture alignment (see `rules/architecture.md`)
- Language-specific rules:
  - Frontend (TypeScript/React): `rules/frontend.md`
  - Backend (Java/Spring): `rules/backend.md`
  - CMS (Payload): `rules/cms.md`
- Testing coverage and patterns
- Performance implications
- Security concerns
- Compliance with project goals in `AGENTS.md`

Follow the repository's `AGENTS.md` and `CLAUDE.md` guidelines for final recommendations.

Save detailed findings to: `review/review1.md`

Report only the filename back when complete.

### Stage 2: Review Evaluation

After Stage 1 completes, launch a Task agent with type `general`:

Evaluate the code review findings from: `review/review1.md`

Critical analysis questions:
- Are the recommendations valid for this project's architecture?
- Do suggestions align with project goals from `AGENTS.md`?
- Are there any conflicting or redundant recommendations?
- What is the actual impact on development velocity vs. code quality?
- Are changes aligned with the monorepo's `Working Mode` guidelines?

Consider project context:
- Monorepo structure: frontend (Next.js), backend (Spring Boot), e2e (Cypress), CMS (Payload)
- Technology stack: React, Spring Boot, TypeScript, Java 21
- Team size and expertise level
- Development constraints from `rules/`

Save evaluation to: `review/evaluation1.md`

Report only the filename back when complete.

### Stage 3: Recommendation Conclusion

After Stage 2 completes, launch a Task agent with type `general`:

Synthesize code review findings and evaluation to reach a final recommendation.

Input documents:
- Initial review: `review/review1.md`
- Critical evaluation: `review/evaluation1.md`
- Code changes: `<file-path-or-change-description>`

Provide a structured conclusion with these sections:

1. **Summary**: Key findings from both review and evaluation (2-3 sentences)
2. **Critical Issues**: Must-fix items blocking approval (if any)
3. **Improvements**: High-value enhancements recommended
4. **Nice-to-haves**: Lower priority suggestions for future work
5. **Final Recommendation**: One of:
   - ✅ Approve as-is
   - 🔄 Approve with minor changes
   - ⚠️ Request modifications before approval
   - ❌ Reject (requires major rework)
6. **Reasoning**: Justify the recommendation considering:
   - Project goals from `AGENTS.md`
   - Repository principles from `CLAUDE.md`
   - Code standards from `rules/`
   - Team development velocity

Save conclusion to: `review/conclusion1.md`

Report only the filename back when complete.

### Stage 4: Summary Report

After all stages complete, generate a summary:

**Aggregated Results:**
- ✅ Stage 1 (Code Review): `review/review1.md`
- ✅ Stage 2 (Evaluation): `review/evaluation1.md`
- ✅ Stage 3 (Conclusion): `review/conclusion1.md`

**Quick Summary:**
- Overall recommendation from conclusion1.md
- Number of critical issues (if any)
- Number of improvement suggestions
- Key decision factors

## Important Constraints

- **Serial Execution Only**: Process stages sequentially; DO NOT launch agents in parallel
- **Wait for Completion**: Each stage depends on previous outputs
- **File Consistency**: Always reference the generated files from previous stages
- **Context Awareness**: Use repository context from:
  - `AGENTS.md` (repo overview and architecture)
  - `CLAUDE.md` (AI assistant principles)
  - `rules/` (development conventions)
  - Package-specific `AGENTS.md` files
- **No Assumptions**: Base recommendations on actual project structure and goals

## Success Criteria

- ✅ All three review stages complete successfully
- ✅ Each stage generates required output file
- ✅ Recommendations are specific and actionable
- ✅ Final conclusion clearly states approve/reject decision
- ✅ All reasoning references project context
