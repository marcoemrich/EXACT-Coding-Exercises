---
name: green
description: TDD Green Phase - Implement minimal code to make the failing test pass
---

# TDD Green Phase

You are now in the **Green Phase** of TDD. Follow these instructions to make
the failing test pass with MINIMAL code.

## Why minimality matters

The Green Phase deliberately writes the smallest implementation that turns the
active test green -- even hardcoded returns and incomplete logic. This:

- Exposes refactoring opportunities in the next phase.
- Prevents premature generalization.
- Keeps the red-green-refactor cycle short.

## Your Mission

1. Implement the **minimal code** necessary to make the failing test pass.
2. Use the **simplest possible solution**; hardcoded values are acceptable.
3. Avoid adding features for future tests.
4. Verify all tests pass.
5. Do not optimize or refactor yet.

## Context: $ARGUMENTS

## Green Phase Rules

- **Minimal code only**: Just enough to pass the current test.
- **Baby steps**: Make the smallest possible change.
- **No future features**: Do not implement what future tests might need.
- **Simple is better**: Hardcoded returns are perfectly fine.
- **Tests must pass**: Verify all tests are green.
- **No refactoring yet**: Save improvements for Refactor phase.

## Process

### Step 1: Analyze the Failing Test

Understand what the test expects:

- What input does the test provide?
- What output does it expect?
- What is the **simplest** way to produce that output?

### Step 2: Write Minimal Implementation

Implement only what is needed for the current test:

```kotlin
// First test: "returns zero for empty input"
fun calculate(input: String): Int = 0

// Second test: "returns number for single input"
fun calculate(input: String): Int =
    if (input.isEmpty()) 0 else input.toInt()

// Third test: "adds two numbers"
fun calculate(input: String): Int {
    if (input.isEmpty()) return 0
    val numbers = input.split(",")
    if (numbers.size == 1) return numbers[0].toInt()
    return numbers[0].toInt() + numbers[1].toInt()
}
```

Only add each piece of logic when its test requires it.

### Step 3: Run Tests

Run `gradlew.bat test` on Windows or `./gradlew test` on Unix-like systems and
verify:

- The current test passes.
- All previous tests still pass.

### Step 4: Verify No Over-Implementation

Check yourself:

- Did I implement features for future tests? Remove them.
- Did I add logic not demanded by the current test? Remove it.
- Did I optimize prematurely? Simplify.
- Did I refactor existing code? Revert it and save that for Refactor phase.

### Step 5: Report Completion

```
Green Phase Complete:
**Implementation**: [brief description of what was added]
**Result**: All tests now pass ([X] passing)
**Approach**: [explain why this is minimal]

Proceeding to Refactor phase.
```

## Minimal Implementation Strategies

### Hardcoded Returns (Preferred for Early Tests)

```kotlin
// Test: "returns zero for empty input"
return 0
```

### Simple Conditionals (When Multiple Tests)

```kotlin
// Test: "returns number for single input"
if (input.isEmpty()) return 0
return input.toInt()
```

### Generalization (Only When Forced)

```kotlin
// Test: "adds multiple numbers" -- NOW generalize
return input.split(",").sumOf(String::toInt)
```

## Important Guidelines

### DO

- Write minimal code to make the test pass.
- Use hardcoded values when appropriate.
- Take baby steps.
- Verify all tests pass.

### DON'T

- Implement beyond what tests demand.
- Add features for future tests.
- Optimize prematurely.
- Refactor during Green phase.

## Completion

After completing Green phase, proceed to Refactor phase:

```
Green Phase Complete. Proceeding to Refactor phase.
```

> **HITL note:** Green has no human checkpoint by default -- the default
> Autonomy Level (`full-hitl`) skips it because Green is the most mechanical
> phase. To enable a Green checkpoint, see
> `.github/rules/human-in-the-loop.md`.
