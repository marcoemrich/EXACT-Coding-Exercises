# Subagent Prompt Contracts

The refactor and end-refactor subagents run in **isolated contexts**. They
have no memory of the test-list, red, or green phases. Everything they need
must be in the prompt.

This file defines what to pass. It is workflow methodology, not lab
infrastructure — it stays when the workflow is exported.

## Workflow Sequence

1. **Test List Phase** → Invoke `/test-list` skill (main context)
2. **For each test:**
   - **Red Phase** → Invoke `/red` skill (main context)
   - **Green Phase** → Invoke `/green` skill (main context)
   - **Refactor Phase** → Delegate to the `refactor` agent (isolated context)
3. **Continue** until all tests are implemented and passing
4. **End-Refactor Phase** → Delegate ONCE to the `end-refactor` agent (isolated context), over the whole `src/main/kotlin/`

## Required Prompt Context for the Refactor Subagent (per cycle)

```
Test file: [path]
Implementation file: [path]
Passing tests: [count]
Recent changes: [one-line summary of the Green phase]
```

After the subagent returns, read its summary and proceed directly to the
next Red phase.

## Required Prompt Context for the End-Refactor Subagent (once, after the last green cycle)

The end-refactor subagent refactors the **whole production tree**. Pass:

```
Implementation files: src/main/kotlin/
Test files: src/test/kotlin/
Passing tests: [count]

Run the final metric-driven refactoring pass over the whole src/main/kotlin/.
Iterate ONE change at a time with pre/post measurement (Detekt, cognitive,
APP, McCabe). Stop when no metric improves further or no improvement is
possible.
```

Launch the end-refactor subagent exactly once, after the last per-cycle
refactor returns. After it returns, read its summary.
