---
name: test-list
description: TDD Test List Phase - Create a comprehensive test list covering every example and rule from the specification
---

# TDD Test List Phase

You are now in the **Test List Phase** of TDD. Follow these instructions to create a comprehensive test list.

## Your Mission

Create a test list using `it.todo()` that covers **every rule and every example** from the specification:
1. Read the specification (`prompt.md`) thoroughly -- every rule, every example, every clarifying question (?)
2. Turn each example into at least one `it.todo()` test case
3. Order tests from simplest to most complex
4. Use `it.todo()` only -- NO executable tests yet

## Context: $ARGUMENTS

## Process

### Step 1: Understand the Feature
Read the complete specification. Pay special attention to integration examples and clarifying
questions (marked with ?) -- these disambiguate rules that may seem open to interpretation in isolation.
- What are all the operations the system must support?
- What rules govern each operation?
- Which examples in the spec illustrate these rules?

### Step 2: Identify Test Cases from the Spec
Walk through the specification section by section. For each rule and each example:
- Create a test case that verifies the described behavior
- Include the **expected values from the spec** in the test description
- If a clarifying question (?) resolves an ambiguity, create a test for the clarified interpretation
- If the spec uses an example-mapping format (rules, examples, questions), every listed example must have a corresponding test

### Step 3: Order Tests (Simple -> Complex)
Arrange tests in increasing complexity:
1. Simplest case (often empty/zero/single item)
2. Individual rules in isolation
3. Rules with modifiers
4. Combinations of multiple rules
5. Multi-step scenarios (e.g., operations that reference earlier results)

### Step 4: Write Test File
Create the test file with `it.todo()` entries:

```typescript
import { describe, it, expect } from "vitest";
import { functionName } from "./implementation.js";

describe("Feature Name", () => {
  it.todo("should [behavior] -- [expected value from spec]");
  it.todo("should [next behavior] -- [expected value from spec]");
  // ... ordered simple -> complex, covering ALL spec examples
});
```

### Step 5: Provide Summary

After creating the test list, output:

```
Test List Created:
**Feature**: [feature name]
**Test File**: [filename].spec.ts
**Tests**: [count]

**Test Cases** (ordered simple -> complex):
1. [first test description]
2. [second test description]
3. [third test description]
...

**Next Step**: Invoke `red` skill to activate the first test.
```

### Step 6: Apply HITL Checkpoint

Consult `.pi/rules/human-in-the-loop.md`. If the current Autonomy Level includes a stop after Test-List
(the default `full-hitl` does), present the checkpoint template from that file
and wait for explicit user approval before proceeding to the first Red phase.
If the level does not stop after Test-List, proceed directly to Red.

## Important Guidelines

### DO
- Cover **every spec example** with at least one test
- Cover **every operation** described in the spec
- Give **every clarifying question (?)** a corresponding test
- Order tests **simple -> complex**
- Use `it.todo()` for all tests
- Include **expected values** in descriptions
- Keep tests **independent**
- One behavior per test

### DON'T
- Write executable tests (use `it.todo()`)
- Think about implementation instead of behavior
- Miss an entire operation described in the spec
- Order randomly

## Completion

After Step 6 (HITL checkpoint), proceed to Red phase if approved or if the
Autonomy Level does not require a stop:

```
Test List Phase Complete. Proceeding to Red phase with the first test.
```
