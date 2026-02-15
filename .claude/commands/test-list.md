---
description: Create a test list for TDD - write test cases using it.todo() before any implementation
---

# Test List Command

When this command is triggered, help create a test list following TDD principles:

## Test List Phase (TDD Step 1)

### Purpose
Create a list of test cases using `it.todo()` for **BASE FUNCTIONALITY ONLY** before writing any implementation. This helps understand the scope of the core feature (not advanced features).

### What to Do
1. **Identify the core functionality** - Focus on the basic behavior, not edge cases or advanced features
2. **Create test cases** using `it.todo()` - These are placeholders, not executable tests yet
3. **One test per core behavior** - Each test should describe one specific behavior
4. **Keep it simple** - Don't include advanced features in the initial test list

### Example Structure
```typescript
describe("FeatureName", () => {
  it.todo("should return 0 for empty string");
  it.todo("should return number for single number");
  it.todo("should return sum for two numbers");
  it.todo("should return sum for multiple numbers");
  // NOT: advanced features like custom delimiters, ignore >1000, etc.
});
```

### Important Rules
- **NO implementation yet** - Only create test descriptions
- **BASE functionality only** - Don't plan advanced features
- **Use `it.todo()`** - Not executable tests yet
- **Clear descriptions** - Each test name should clearly describe the expected behavior
- **Independent tests** - Each test should be independent and not depend on others

### Common Pitfalls to Avoid
- ❌ Planning beyond base functionality
- ❌ Including advanced features in initial test list
- ❌ Writing executable tests immediately
- ❌ Thinking about implementation details

### Next Step
After creating the test list, use `/red` command to activate the first test and begin the Red-Green-Refactor cycle.

