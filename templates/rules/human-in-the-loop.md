# Human-in-the-Loop (HITL)

This file is the **single source of truth** for when the TDD workflow stops and
asks the human for approval. It is referenced from `skills/tdd/SKILL.md`,
`skills/red/SKILL.md`, `skills/green/SKILL.md`, `skills/test-list/SKILL.md`,
`agents/refactor.agent.md`, and `agents/end-refactor.agent.md`. To change HITL
behavior, edit only this file.

## Autonomy Level

**Current setting:** `every-n-tests 3`

To change behavior, edit the line above. Supported values:

| Level | Stops after | Notes |
|---|---|---|
| `full-hitl` (default) | Test-List, Red, Refactor, on prediction failure | Green runs through without stop |
| `refactor-only` | Refactor, on prediction failure | Lets test-list/red/green run autonomously, human reviews refactoring decisions only |
| `red-only` | Red, on prediction failure | Use when you want to validate every test before any implementation |
| `every-n-tests N` | After every N completed Red-Green-Refactor cycles (replace N with an integer) | Mid-ground: not every phase, but periodic checkpoints |
| `task-end` | Only at the very end of the task | Prediction failures still reported, but do not stop |
| `autonomous` | Never | Equivalent to the batch experiment mode; no human gates at all |

**Why these levels:** Different working modes need different oversight. Learning
TDD benefits from full HITL (every phase visible). A senior developer who
trusts the model wants `refactor-only` (the only place real design decisions
happen). A long unattended run wants `task-end` or `autonomous`. The setting is
a single configuration point so you do not need to edit five phase files when
your situation changes.

**Prediction failures are special:** in every level except `autonomous`, a
failed Red-phase prediction (the "Guessing Game" — see "Prediction Failure
Recovery" below) triggers an immediate stop regardless of phase. The reason: a
wrong prediction means the model misunderstands the system; continuing without
a human reset usually compounds the misunderstanding.

## How the workflow consumes this file

Each phase file (`skills/test-list/SKILL.md`, `skills/red/SKILL.md`,
`agents/refactor.agent.md`) ends with an instruction to "apply HITL checkpoint
per `.github/rules/human-in-the-loop.md`". `skills/green/SKILL.md` does **not** --
Green is deliberately exempt by default (see below).

When you read this file as part of a phase, follow the matrix above:

1. Look up the current Autonomy Level (top of this file).
2. Check whether the phase you just completed is in the stop list for that level.
3. If yes: produce the appropriate checkpoint summary (templates below) and
   wait for explicit user approval before proceeding.
4. If no: continue silently to the next phase.

## Why Green is exempt by default

In `full-hitl` the default stops after Test-List, Red, and Refactor, but **not
after Green**. Two reasons:

1. **Green is the most mechanical phase.** Once the Red prediction is right,
   the minimal-implementation step is usually one obvious change. A human stop
   here mostly produces "yes, continue" with no real review value.
2. **Cycles double in length without it.** Adding a Green stop turns every test
   into four human approvals (test-list once, then red/green/refactor per
   cycle). That friction discourages running the workflow at all.

You can still enable a Green checkpoint by switching to a custom level — but
the default keeps the cycles tight.

## Checkpoint templates

### After Test-List

```
📋 Test List Phase Complete.

Created [N] test cases (all `@Disabled`) covering [feature].
Ordered simple → complex.

Should I proceed to Red phase with the first test?
```

### After Red

```
🔴 Red Phase Complete:
**Test Activated**: "[test description]"
**Compilation Prediction**: [reason] ✅ Correct / ❌ Incorrect
**Runtime Prediction**: [reason] ✅ Correct / ❌ Incorrect
**Result**: Test fails as expected with [error type]

Should I proceed to Green phase?
```

### After Refactor

```
🔄 Refactor Phase Complete:
**Refactoring**: [improvements applied OR "none possible, because ..."]
**Mass Change**: [before] → [after] (Δ ±N)
**Tests**: All passing ✅

Should I proceed to the next Red phase (next test)?
```

### After Green (only if explicitly enabled)

```
🟢 Green Phase Complete:
**Implementation**: [brief description]
**Result**: All tests now pass ([X] passing)
**Approach**: [why this is minimal]

Should I proceed to Refactor phase?
```

## Prediction Failure Recovery

Trigger: the Red phase produces a different result than what was predicted in
the "Guessing Game" block (compilation prediction or runtime prediction wrong).

In all levels except `autonomous`:

1. **Stop immediately.** Do not proceed to Green.
2. **Report the discrepancy**:

   ```
   ❌ Prediction Failed:
   - Predicted: [what was expected]
   - Actual:    [what happened]
   - Likely cause: [if clear; otherwise "unclear, needs investigation"]
   ```

3. **Ask explicitly**:

   > My prediction was wrong. Should I continue with the TDD process, or would
   > you like me to investigate this discrepancy first?

4. **Wait for the human's decision** before continuing.

**Why this is a hard stop:** A wrong prediction means the model's mental model
of the system disagrees with reality. Continuing without resolving that
disagreement usually multiplies the problem (the Green phase will then be
based on the same wrong assumption). A short pause here saves a much longer
debugging round later.

In `autonomous` mode: log the failure in the Red-phase report, then proceed.
The wrong prediction is treated as data, not as a stop signal.

## Switching levels mid-task

If the human changes the Autonomy Level during a task (e.g. "switch to
refactor-only for the rest"), apply the new level starting from the next phase
boundary. Do not retroactively re-trigger or skip stops for phases already
completed.
