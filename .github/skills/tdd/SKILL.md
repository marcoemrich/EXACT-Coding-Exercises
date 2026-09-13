---
name: tdd
description: Strict Test-Driven Development workflow (Red-Green-Refactor) with configurable human-in-the-loop checkpoints. Invoke when the user explicitly asks to use TDD, do a TDD kata, or follow the Red-Green-Refactor discipline. Do NOT invoke for general coding tasks where the user has not asked for TDD.
---

# TDD Rules -- Hybrid (exact-hybrid-v2-testlist-fix, GitHub Copilot, exact-coding baseline)

## CRITICAL: Skill + Subagent Usage is MANDATORY

This workflow is a **hybrid** of skill-based and subagent-based execution:

- **`test-list`, `red`, `green`** run as **Skills in the main context** -- they
  share state, so you keep the test list, the last error, and the current
  implementation in working memory.
- **Refactor** runs as a **subagent with isolated context** -- the refactor
  agent sees only the current source and tests, not the red/green history.
  Hypothesis: refactoring benefits most from a fresh perspective free of
  implementation bias.

The skill and subagent invocations are not stylistic. If you write test code,
implementation code, or refactorings directly in the main context instead of
delegating, the workflow loses the architectural separation that makes the
hybrid work.

Do NOT perform TDD phases without invoking the appropriate skill or agent.

### Before Starting Any TDD Work -- Complete This Checklist:

- [ ] Have I been asked to implement something using TDD?
- [ ] Am I about to write tests or implementation code?
- [ ] **STOP** -- invoke the phase skill, or delegate to the refactor agent
- [ ] NEVER write tests, code, or refactorings directly -- ALWAYS delegate

### Which Tool to Use:

| Phase | Mechanism | Invoke With |
|-------|-----------|-------------|
| Example Mapping (optional, before TDD) | Skill | `/example-mapping` |
| Test List | **Skill** (main context) | `/test-list` |
| Red Phase | **Skill** (main context) | `/red` |
| Green Phase | **Skill** (main context) | `/green` |
| Refactor Phase | **Subagent** (isolated context) | the `refactor` agent |
| Final quality pass (optional, manual) | Skill | `/end-refactor` |

**If you find yourself writing test code, implementation code, or a refactoring
without invoking the right tool first, you are doing it WRONG.**

### Surfaces: CLI and VS Code

This harness runs unchanged in **Copilot CLI** and in **VS Code agent mode**.
The only difference is how a subagent is started:

- **Copilot CLI** -- `/agent` (no argument) opens a picker; choose `refactor`.
  Naming the agent in your prompt works too -- Copilot infers it. The model may
  also delegate on its own. Non-interactively: `copilot --agent=refactor`.
- **VS Code agent mode** -- delegate with the subagent tool (`#runSubagent`),
  naming the `refactor` agent so its own prompt and tool set apply.

Either way the agent runs in its own context and reports back. If your surface
offers no way to delegate, say so and stop -- do NOT silently refactor in the
main context instead.

## Overview

This project follows strict Test-Driven Development using the Red-Green-Refactor
cycle. Red and green share one context so predictions, error messages, and
minimal implementations stay coherent -- and refactoring is isolated so the
model evaluates the resulting code on its own merits.

This baseline supports **configurable human-in-the-loop checkpoints** between
phases. See `.github/rules/human-in-the-loop.md` for the Autonomy Level setting
and stop behaviour.

## TDD Workflow

### 0. Example Mapping (optional, before the loop)

When the requirements are not yet settled, run an Example Mapping session first:
`/example-mapping`. It discovers business rules and concrete examples through
conversation and hands its examples to the Test List phase. Skip it when the
spec is already clear -- the loop starts at step 1 either way.

### 1. Test List Phase
**INVOKE SKILL**: `/test-list`

Provide: feature, test file path, implementation file path, requirements.

The skill creates a comprehensive test list using `@Disabled` JUnit tests covering every
rule and example from the specification.

**DO NOT** write the test list yourself.

### 2. Red Phase
**INVOKE SKILL**: `/red`

Provide: test file path, which `@Disabled` test to activate, current passing-test
count, implementation file path.

The skill activates exactly ONE test, makes explicit predictions, and verifies
failure.

**DO NOT** write test code yourself.

### 3. Green Phase
**INVOKE SKILL**: `/green`

Provide: test file path, failing test name, current error, implementation file
path.

The skill implements minimal code to make the test pass -- hardcoded returns are
fine for early tests.

**DO NOT** write implementation code yourself.

### 4. Refactor Phase
**DELEGATE TO THE `refactor` AGENT** (isolated context).

The agent has no memory of red/green. Give it everything it needs:

```
Test file: src/test/java/<Feature>Test.java
Implementation file: src/main/java/<Feature>.java
Passing tests: <count>
Recent Green phase: <one-line summary of what was just added>

Refactor the implementation while keeping all tests green.
```

The agent will:
- MUST attempt at least one refactoring (or document why none is possible)
- Evaluate naming FIRST
- Apply the Four Rules of Simple Design in priority order
- Calculate APP (Absolute Priority Premise) mass before and after

**DO NOT** refactor code yourself. After the agent returns, read its summary,
run the tests for sanity, and proceed to the next Red phase.

**Verify the marker.** The report must start with
`## Refactor (agent: refactor, cycle N)`. If it does not, the work did not come
from this agent definition — the surface delegated to a generic subagent, or
nothing was delegated at all. Say so plainly instead of accepting the result,
and retry with the agent named explicitly -- `/agent` and pick `refactor` in
the CLI, or the agents dropdown in VS Code.

### 5. Repeat
Return to step 2 (Red phase) for the next test. **Invoke `/red` again.**

### Optional: Final Quality Pass

When all tests are implemented and passing, the work is done — the per-cycle
refactor has already polished every step. If you additionally want a measured
cleanup across the *whole* production tree, the `/end-refactor` skill is
available. It is **opt-in and manual** — never start it on your own, only when
the user asks for it. It costs noticeably more time and tokens than a per-cycle
refactor and pays off mainly on multi-file code.

## Core TDD Principles

### TDD Mindset
TDD practices will feel counterintuitive:
- **Hardcoded returns feel "too simple"** -- This is correct!
- **The urge to implement ahead is strong** -- Resist this
- **Minimal steps feel inefficient** -- They actually accelerate development
- **Predictions feel unnecessary** -- They build crucial understanding

### Common TDD Failure Modes
- **NOT USING SKILLS / SUBAGENTS** -- The most critical failure mode
- Multiple active tests at once
- Implementing beyond what tests demand
- Skipping predictions
- Avoiding refactoring
- Refactoring in the main context instead of via the subagent

## Human-in-the-Loop

Between phases, consult `.github/rules/human-in-the-loop.md` to decide whether
to pause for human approval. The default Autonomy Level is `full-hitl`, which
stops after Test-List, Red and Refactor (not Green) and on prediction failures.
Switch levels by editing the setting at the top of that file.

For unattended batch runs, set the level to `autonomous` to disable all stops.

## Technical Setup

See `.github/rules/tdd-with-junit-and-maven.md` for Java and JUnit conventions. Run
tests with `mvn test`.

## Workflow Sequence

1. **Test List Phase** -> `/test-list`
2. **For each test:**
   - **Red Phase** -> `/red`
   - **Green Phase** -> `/green`
   - **Refactor Phase** -> delegate to the `refactor` agent
3. **Continue** until all tests are implemented and passing

What to pass the refactor agent is specified in `.github/rules/subagent-prompts.md`.

## Remember

- **ALWAYS USE SKILLS** for test-list/red/green; **ALWAYS DELEGATE** the refactor phase
- Never write tests, implementation, or refactorings directly
- The refactor agent runs in an isolated context -- give it everything in the prompt
- Consult `.github/rules/human-in-the-loop.md` at every phase boundary
- Trust the process -- discomfort is a signal you're doing it right
