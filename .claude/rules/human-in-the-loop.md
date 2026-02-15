# Human-in-the-Loop TDD Rules

## Description
These rules ensure the human stays engaged and can provide guidance at critical decision points during Test-Driven Development. The AI should pause and explicitly ask for user feedback in these specific situations.

## Rule 1: End-of-Phase Confirmation

### When to Apply
At the **end of every TDD phase** (Red, Green, or Refactor), before proceeding to the next phase or test.

### What to Do
1. **Stop after completing the current phase**
2. **Summarize what was just completed in this phase**:

   **After Red Phase**:
   - Which test was activated
   - Prediction made and whether it was correct
   - Type of failure achieved (compilation/runtime error)

   **After Green Phase**:
   - Implementation approach taken (minimal code added)
   - Confirmation that test now passes
   - Any trade-offs or decisions made

   **After Refactor Phase**:
   - Refactorings attempted/completed:
     - Naming changes made
     - Mass calculations (before/after if applicable)
     - Structural improvements
     - Any refactoring opportunities that were rejected and why

3. **Explicitly ask for permission to continue**:
   - **After Red**: "Red phase complete. Should I proceed to Green phase?"
   - **After Green**: "Green phase complete. Should I proceed to Refactor phase?"
   - **After Refactor**: "Refactor phase complete. Should I proceed to the next test?"

### Why This Matters
- **Human maintains full control** - No phase proceeds without explicit approval
- **Educational opportunity** - Human can guide each individual step
- **Prevents over-implementation** - Each phase does only what's required
- **Quality assurance** - Human reviews every phase before proceeding
- **Fine-grained control** - Human can intervene at any point in the process

### Examples
```
🔴 Red Phase Complete:
**Test Activated**: "should return sum for two numbers"
**Prediction**: Runtime assertion error (Expected: 3, Received: 1) ✅ Correct
**Result**: Test fails as expected with assertion error

Red phase complete. Should I proceed to Green phase?
```

```
🟢 Green Phase Complete:
**Implementation**: Added split/map/reduce logic for comma-separated numbers
**Result**: All tests now pass
**Approach**: Minimal implementation using built-in array methods

Green phase complete. Should I proceed to Refactor phase?
```

```
🔄 Refactor Phase Complete:
**Refactoring**:
- Evaluated naming: kept `sumCommaSeparatedNumbers` (already clear)
- Mass calculation: remains at 38 (no improvements found)
- Considered helper functions but would increase complexity

Refactor phase complete. Should I proceed to the next test?
```

## Rule 2: Failed Prediction Recovery

### When to Apply
When the **"Guessing Game" prediction fails** - the actual test result differs significantly from what was predicted.

### What to Do
1. **Stop the TDD cycle immediately**
2. **Explain the prediction failure**:
   - What was predicted (error type, expected/actual values)
   - What actually happened
   - Why the prediction was wrong (if clear)
3. **Assess the implications**:
   - Does this indicate a misunderstanding of the code?
   - Does this suggest the test or implementation has issues?
   - Is this a learning opportunity about the system behavior?
4. **Explicitly ask**:
   - "My prediction was incorrect. Should I continue with the TDD process, or would you like me to investigate this discrepancy further?"
   - "Do you want me to explain why I think my prediction failed?"
   - "Should I adjust my understanding and continue, or take a different approach?"

### Why This Matters
- **Predictions build understanding** - Failures indicate gaps in comprehension
- **Early error detection** - Unexpected behavior might reveal bugs or design issues
- **Learning opportunity** - Human can provide insights about system behavior
- **Maintains TDD discipline** - Ensures predictions remain meaningful and accurate

### Example
```
❌ Prediction Failed:
- Predicted: Runtime assertion error (Expected: 3, Received: 1)
- Actual: Runtime assertion error (Expected: 3, Received: NaN)
- Issue: I incorrectly assumed parseInt("1,2") would return 1, but it actually returned NaN

This suggests I misunderstood how parseInt handles comma-separated strings. Should I continue with the TDD process, or would you like me to investigate this behavior further?
```

## Integration with TDD Process

### Modified TDD Process
1. **Red Phase** (compilation/runtime error) → **🛑 HUMAN CHECKPOINT**
2. **Green Phase** (minimal implementation) → **🛑 HUMAN CHECKPOINT**
3. **Refactor Phase** (mandatory improvements) → **🛑 HUMAN CHECKPOINT**
4. **Repeat** only with explicit human approval

### Modified Guessing Game
1. **Make explicit prediction**
2. **Run test**
3. **Compare prediction vs actual**
4. **🛑 HUMAN CHECKPOINT**: If prediction failed significantly (immediate stop)
5. **Continue current phase only after approval**

### Core Principle: Never Proceed Without Permission
- **Stop after every single phase** (Red, Green, Refactor)
- **Implement only what the current phase requires**
- **No lookahead or anticipatory coding**
- **No additional features without explicit human approval**
- **Each phase must be approved before continuing to next phase**

## Guidelines

### When to ALWAYS Stop (Rule 1)
- **After every TDD phase** - Red, Green, and Refactor (MANDATORY)
- **Before proceeding to next phase** - Human must approve continuation
- **Before writing any additional code** - Even if path seems obvious

### When to IMMEDIATELY Stop (Rule 2)
- **Significant prediction failures** - fundamental misunderstanding of behavior
- **Any unexpected test results** - if actual differs meaningfully from predicted
- **Compilation errors not anticipated** - suggests misunderstanding of codebase

### Never Continue Without Approval
- **No autonomous multi-phase execution** - Each phase requires explicit approval
- **No anticipatory implementation** - Only implement what current phase demands
- **No "obvious next steps"** - Human decides what constitutes next steps
- **No batch processing** - Each phase must be individually approved

## Benefits
- **Maintains human agency** in the TDD process
- **Prevents AI from making poor design decisions** in isolation
- **Creates learning opportunities** for both human and AI
- **Ensures code quality standards** are met
- **Builds confidence** in the TDD process through transparency
