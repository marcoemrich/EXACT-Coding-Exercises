---
description: Enter the Red phase of TDD - create a failing test, make prediction, verify test fails
---

# Red Phase Command

When this command is triggered, enter the Red phase of TDD:

## Red Phase (TDD Step 2-3)

### Purpose
Create a failing test and verify it fails for the right reason. This ensures we're truly starting from scratch and our test is working correctly.

### What to Do

#### Step 1: Activate One Test
- Convert exactly **ONE** `it.todo()` to executable test code
- All other tests remain as `it.todo()` descriptions
- Never have more than one failing test at a time

#### Step 2: Make a Prediction (Guessing Game)
Before running the test, explicitly state:
- Which test will fail
- Type of error expected:
  - **Compilation Error**: Function doesn't exist yet
  - **Runtime/Assertion Error**: Function exists but returns wrong value
- Expected vs actual values (if applicable)
- Expected diff output

#### Step 3: Red Phase Part A - Compilation Error
- Start with a **non-existent function**
- Test should fail with **compilation error**
- This ensures we're truly starting from scratch

#### Step 4: Red Phase Part B - Runtime Error
- Create **empty function** that returns `undefined` or wrong value
- Test should fail with **assertion error**
- This verifies our test is working as expected

### Example Workflow

1. **Activate first test**:
```typescript
it("should return 0 for empty input", () => {
  expect(calculate([])).toBe(0);
});
```

2. **Make prediction**:
- Test will fail with compilation error
- Function `calculate` doesn't exist yet

3. **Run test** - Verify compilation error

4. **Create empty function**:
```typescript
function calculate(numbers: number[]): number {
  return undefined as any;
}
```

5. **Make prediction**:
- Test will fail with assertion error
- Expected: 0
- Received: undefined

6. **Run test** - Verify assertion error

### Important Rules
- **One test at a time** - Only one active test in red phase
- **Must make prediction** - State expected failure before running
- **Verify failure** - Test must fail for the right reason
- **No implementation** - Don't write code to make test pass yet

### Red Flags
- ❌ Multiple active tests at once
- ❌ Skipping predictions
- ❌ Writing implementation before test fails
- ❌ Not verifying the test actually fails

### Psychological Resistance
- **Feels uncomfortable** - This is normal and correct!
- **Hardcoded returns feel "too simple"** - This is exactly right
- **Push through discomfort** - These feelings indicate you're following the discipline correctly

### Next Step
After the test fails correctly, use `/green` command to implement minimal code to make the test pass.

