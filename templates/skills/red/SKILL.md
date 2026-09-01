---
name: red
description: TDD Red Phase - Activate ONE test from the test list and make it fail with explicit predictions
---

# TDD Red Phase

You are now in the **Red Phase** of TDD. Follow these instructions to activate
ONE test and make it fail.

## Your Mission

1. Activate exactly ONE test from the test list.
2. Make explicit predictions about how it will fail.
3. Verify the test fails for the right reason.
4. Maintain strict discipline -- NO implementation during Red phase.

## Context: $ARGUMENTS

## Red Phase Rules

- **One test at a time**: Remove `@Disabled` from exactly ONE test.
- **All other tests remain disabled**: Never have more than one failing test.
- **Two-stage failure**: First compilation error, then runtime/assertion error.
- **Make predictions**: Explicitly state expected failures before running tests.
- **No implementation**: Do not write production code to make the test pass yet.

## Process

### Step 1: Activate One Test

Identify the next disabled test and make it executable:

```kotlin
// Convert from:
@Disabled("TODO: implement returns zero for empty input")
@Test
fun `returns zero for empty input`() {
    // Add assertion in this phase.
}

// To:
@Test
fun `returns zero for empty input`() {
    assertEquals(0, calculate(""))
}
```

Leave all other tests disabled.

### Step 2: Predict Compilation Error

Before running the test, state your prediction:

```
Red Phase - Compilation Error Prediction:
- Test: "returns zero for empty input"
- Expected: Compilation error
- Reason: Function `calculate` does not exist yet
- Error: "Unresolved reference: calculate"
```

### Step 3: Run Test - Verify Compilation Error

Run `gradlew.bat test` on Windows or `./gradlew test` on Unix-like systems and
verify:

- Compilation error as predicted, OR
- Prediction wrong -> follow the Prediction Failure Protocol below.

### Step 4: Create Empty Function

Create the smallest function stub with no logic:

```kotlin
fun calculate(input: String): Int = TODO("Implement")
```

### Step 5: Predict Runtime Error

Before running again, state your prediction:

```
Red Phase - Runtime Error Prediction:
- Test: "returns zero for empty input"
- Expected: Runtime failure
- Expected value: 0
- Actual value: NotImplementedError
```

### Step 6: Run Test - Verify Runtime Error

Run the Gradle test command and verify the failure as predicted.

### Step 7: Report Completion

You MUST output the full Step 7 block with `Correct` or `Incorrect` chosen for
each prediction. Do not abbreviate or combine the two prediction lines.

```
Red Phase Complete:
**Test Activated**: "returns zero for empty input"
**Compilation Prediction**: Unresolved reference: calculate Correct
**Runtime Prediction**: Expected 0, received NotImplementedError Correct
**Result**: Test fails as expected

Proceeding to Green phase.
```

### Step 8: Apply HITL Checkpoint

Consult `.github/rules/human-in-the-loop.md`. If the current Autonomy Level
includes a stop after Red phase, present the checkpoint template from that file
and wait for explicit user approval before proceeding to Green. If the level
does not stop after Red, proceed directly to Green phase.

## Important Guidelines

### DO

- Activate exactly ONE test at a time.
- Make explicit predictions before running tests.
- Verify the test fails for the right reason.
- Keep all other tests disabled.

### DON'T

- Activate multiple tests.
- Skip making predictions.
- Write production implementation to make the test pass.
- Continue if prediction fails without explanation.

## Prediction Failure Protocol

If your prediction was wrong:

```
Prediction Failed:
- Predicted: [what you expected]
- Actual: [what happened]
- Discrepancy: [explanation]

Investigating the discrepancy before proceeding.
```

Then apply the **Prediction Failure Recovery** procedure in
`.github/rules/human-in-the-loop.md`. In every Autonomy Level except
`autonomous`, this is a hard stop -- the human decides whether you continue or
investigate first.

## Completion

After Step 8, proceed to Green phase if approved or if the Autonomy Level does
not require a stop:

```
Red Phase Complete. Proceeding to Green phase.
```
