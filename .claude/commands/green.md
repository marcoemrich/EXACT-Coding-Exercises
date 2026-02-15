---
description: Enter the Green phase of TDD - implement minimal code to make the test pass
---

# Green Phase Command

When this command is triggered, enter the Green phase of TDD:

## Green Phase (TDD Step 3)

### Purpose
Implement the **minimal code** necessary to make the failing test pass. Don't add features for future tests or optimize yet.

### What to Do

#### Step 1: Write Minimal Implementation
- Implement **only what's needed** to make the current test pass
- Use the **simplest possible solution**
- Don't add features for future tests
- Don't optimize or refactor yet

#### Step 2: Run Test
- Verify the test now passes
- All tests should be green

#### Step 3: Verify No Over-Implementation
- Check that you didn't implement features for future tests
- Confirm you used the simplest approach

### Example Workflow

After Red phase with:
```typescript
it("should return 0 for empty input", () => {
  expect(calculate([])).toBe(0);
});

function calculate(numbers: number[]): number {
  return undefined as any; // Red phase - test fails
}
```

**Green Phase - Minimal Implementation**:
```typescript
function calculate(numbers: number[]): number {
  return 0; // Minimal code to make test pass
}
```

### Important Rules
- **Minimal code only** - Just enough to pass the test
- **Baby steps** - Make the smallest possible change
- **No future features** - Don't implement what future tests might need
- **Simple is better** - Hardcoded returns are perfectly fine
- **Tests must pass** - Verify all tests are green

### Common Minimal Implementations
- Return hardcoded values (`return 0`, `return 1`, `return true`)
- Return empty collections (`return []`, `return {}`)
- Return null/undefined if test expects it
- Simple one-line solutions

### Psychological Resistance
- **Feels "too simple"** - This is correct! Minimal steps are the way
- **Urge to implement ahead** - Resist this strongly
- **Feels inefficient** - Actually accelerates development
- **Trust the process** - Simple steps compound into elegant solutions

### Baby Steps Principle
- Make the **smallest possible change** to get to green
- If a test fails, make it pass with the **simplest implementation**
- Don't try to solve multiple problems at once
- Each step should be clear and verifiable

### Red Flags
- ❌ Implementing beyond what tests demand
- ❌ Adding features for future tests
- ❌ Optimizing prematurely
- ❌ Over-engineering the solution
- ❌ Making multiple changes at once

### Common Pitfalls to Avoid
- **Over-engineering** - Don't add features without tests
- **Premature optimization** - Don't optimize until all tests are green
- **Planning ahead** - Don't think about future test cases
- **Complex solutions** - Simple solutions often reveal better approaches

### Next Step
After the test passes, use `/refactor` command to improve the code while keeping tests green.

