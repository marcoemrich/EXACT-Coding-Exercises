# Exact Coding Exercises - Codex Instructions

## Project Overview

TypeScript TDD exercises using Vitest. This project follows strict Test-Driven Development practices with human-in-the-loop checkpoints.

## Tech Stack

- **Language**: TypeScript
- **Test Framework**: Vitest
- **Build**: tsc
- **Package Manager**: npm

## Running Tests - CRITICAL

Always use npm scripts, never call vitest directly:

- `npm test` - Run all tests (vitest run)
- `npm run test:watch` - Run tests in watch mode

NEVER use `npx vitest`, `vitest --run`, or direct vitest calls.

## TDD Workflow

This project follows strict Red-Green-Refactor TDD. Every feature must go through:

1. **Test List** - Create test cases with `it.todo()` for base functionality only
2. **Red Phase** - Activate ONE test, make predictions, verify it fails
3. **Green Phase** - Implement minimal code to make the test pass
4. **Refactor Phase** - Improve code using Simple Design Rules and APP
5. **Repeat** from step 2 for the next test

### TDD Principles

- One test at a time - never have more than one failing test
- Baby steps - smallest possible changes
- Hardcoded returns are acceptable early on
- No future features - only implement what tests demand
- Predictions are mandatory before running tests
- Refactoring is NEVER optional - must attempt at least one improvement per cycle

## Human-in-the-Loop Rules

### End-of-Phase Confirmation (MANDATORY)

Stop after EVERY TDD phase and wait for explicit approval:

- **After Red**: Summarize test activated, prediction made, failure type. Ask: "Red phase complete. Should I proceed to Green phase?"
- **After Green**: Summarize implementation approach, confirm tests pass. Ask: "Green phase complete. Should I proceed to Refactor phase?"
- **After Refactor**: Summarize refactorings attempted/completed, mass calculations. Ask: "Refactor phase complete. Should I proceed to the next test?"

### Failed Prediction Recovery

If prediction fails (actual result differs from expected):
1. Stop immediately
2. Explain what was predicted vs. what happened
3. Assess implications
4. Ask user how to proceed

### Core Principle

Never proceed without permission. No autonomous multi-phase execution. Each phase must be individually approved.

## Test List Phase

When creating a test list:
- Focus on BASE FUNCTIONALITY ONLY - no advanced features or edge cases
- Use `it.todo("description")` for all tests
- Order tests from simplest to most complex (empty -> single -> two -> multiple)
- One behavior per test
- Clear, specific descriptions
- No implementation thinking

Example:
```typescript
import { describe, it, expect } from "vitest";
import { functionName } from "./module.js";

describe("Feature Name", () => {
  it.todo("should return 0 for empty input");
  it.todo("should return value for single input");
  it.todo("should return sum for two inputs");
  it.todo("should handle multiple inputs");
  // NOT: edge cases, advanced features, error handling
});
```

## Red Phase

When activating a test:

### Step 1: Activate ONE test
- Convert one `it.todo()` to executable test code
- Leave all others as `it.todo()`

### Step 2: Predict Compilation Error
Before running, state:
- Which test will fail
- Expected error type: Compilation error
- Expected error message

### Step 3: Verify Compilation Error
Run `npm test`, verify prediction was correct.

### Step 4: Create Empty Function
- Function signature only, returning undefined/wrong value
- NO actual logic

### Step 5: Predict Runtime Error
Before running, state:
- Expected assertion error
- Expected vs. actual values

### Step 6: Verify Runtime Error
Run `npm test`, verify prediction was correct.

### Step 7: Stop and Report
```
Red Phase Complete:
Test Activated: "test name"
Prediction: [error type] - Correct/Incorrect
Result: Test fails as expected

Red phase complete. Should I proceed to Green phase?
```

## Green Phase

When implementing to make a test pass:

- Write MINIMAL code - just enough to pass the current test
- Hardcoded returns are perfectly fine
- No features for future tests
- No optimization or refactoring
- Verify ALL tests pass (current + previous)

Progression example:
```typescript
// Test 1: return 0 for empty -> return 0;
// Test 2: return value for single -> if (empty) return 0; return input[0];
// Test 3: sum two -> if/else chain
// Test 4: sum multiple -> NOW generalize
```

Stop and report:
```
Green Phase Complete:
Implementation: [what was added]
Result: All tests pass (X passing)
Approach: [why this is minimal]

Green phase complete. Should I proceed to Refactor phase?
```

## Refactor Phase

When refactoring after Green:

### Step 1: Naming Evaluation (FIRST PRIORITY)
- Does the function name clearly describe what it does based on ALL current tests?
- Rename if purpose has become clearer

### Step 2: Calculate APP Mass (Before)
```
Mass = (constants x 1) + (bindings x 1) + (invocations x 2) +
       (conditionals x 4) + (loops x 5) + (assignments x 6)
```

### Step 3: Apply Simple Design Rules (priority order)
1. **Tests Pass** - never break working code
2. **Reveals Intent** - clarity trumps everything (including APP)
3. **No Duplication** - extract common functionality
4. **Fewest Elements** - remove unnecessary abstractions

### Step 4: Implement ONE improvement at a time, run tests after each

### Step 5: Calculate APP Mass (After)

### Step 6: Document decision
- What was improved and why, OR
- Why no improvement was possible (with detailed explanation)

Stop and report:
```
Refactor Phase Complete:
Refactoring: [improvements made or "none possible" with reasoning]
Mass Change: [before -> after]
Tests: All passing

Refactor phase complete. Should I proceed to the next test?
```

## Example Mapping (Pre-TDD)

Before starting TDD, optionally conduct an Example Mapping session:
- Discover business rules, concrete examples, and open questions
- You are a FACILITATOR - NEVER invent rules or examples
- Every rule and example must come FROM the user
- When unclear, ASK - never silently fill gaps
- Present summary for confirmation before writing output

Categories:
- **Story** (yellow): Feature being explored
- **Rules** (blue): Business rules discovered
- **Examples** (green): Concrete input -> output examples
- **Questions** (red): Open questions needing clarification

## Code Review Process

Three-stage serial review:
1. **Code Review**: Analyze for quality, patterns, best practices
2. **Evaluation**: Assess recommendations against project goals
3. **Conclusion**: Synthesize findings with final recommendation (Approve / Approve with changes / Request modifications / Reject)

## Code Style

- Import with explicit `.js` extensions for local modules
- Use Vitest testing functions (`describe`, `it`, `expect`)
- TypeScript strict mode
- Prefer self-documenting code over comments

## TDD Mindset Reminders

- Hardcoded returns feel "too simple" - this is correct
- The urge to implement ahead is strong - resist it
- Minimal steps feel inefficient - they actually accelerate development
- Predictions feel unnecessary - they build crucial understanding
- Discomfort indicates you're following the discipline correctly
- Trust the process - simple steps compound into elegant solutions

## Common Failure Modes to Avoid

- Skipping Refactor phase (NEVER skip it)
- Implementing beyond what tests demand
- Multiple active tests at once
- Skipping predictions
- Planning beyond base functionality
- Premature abstraction
- Not using npm scripts for tests
