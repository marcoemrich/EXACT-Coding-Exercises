# Exact Coding TDD Baseline — Version 2026-09-13

A ready-to-copy Claude Code workflow for Test-Driven Development with
configurable human-in-the-loop checkpoints. This baseline ships the
`.claude/` directory you can drop into your project.

> **This is the Claude Code subtree.** The same workflow ships for pi
> (`.pi/`), OpenCode (`.opencode/`), and cursor-agent (`.cursor/`) in the
> snapshot this directory came from — see the snapshot-level `README.md`
> there for the harness comparison. The four are independent; you only need
> the one your harness reads. If you received `.claude/` on its own, nothing
> is missing — it is self-contained.

## What it is

Test-List once, then Red → Green → Refactor for every test, until the list is
done. Implemented as Claude Code skills and one Task subagent:

| Phase | Mechanism | Why |
|---|---|---|
| Test List | Skill in main context | Needs the full spec in working memory |
| Red | Skill in main context | Predictions ("Guessing Game") share state with the test list |
| Green | Skill in main context | Builds on the failing test and current error from Red |
| Refactor (every cycle) | Task subagent (isolated) | Fresh perspective — refactor sees the code, not the red/green history |

The Refactor subagent is mandated to attempt at least one improvement per
cycle, evaluates naming first (Beck's Four Rules of Simple Design), and uses
the Absolute Priority Premise (APP) to measure mass before/after.

Between phases, the workflow consults `.claude/skills/tdd/human-in-the-loop.md`
to decide whether to pause for human approval. The default Autonomy Level
(`full-hitl`) stops after Test-List, Red, and Refactor — and on prediction
failures — but **not** after Green (Green is the most mechanical phase;
stopping there mostly produces "yes, continue" with no review value).
Switch the level by editing one line in the HITL file.

### Manual extra: `end-refactor` (not part of the workflow)

> **You have to start this yourself. The workflow never runs it.**

When a piece of work is finished and you want an extra cleanup across the
whole `src/`, invoke it explicitly:

```
Skill({ skill: "end-refactor" })
```

It measures ESLint smells, cognitive complexity, McCabe and APP mass across
`src/`, changes one thing at a time and re-measures after each change. It is
not in the loop for a reason: it takes noticeably more time and tokens, and
in the lab, running it automatically at the end of every task did not make the
average function any smaller. Use it on multi-file code where duplication
across files has had room to build up.

### Optional: Example Mapping before the loop

When a feature is not yet well understood, run Example Mapping before writing
any test:

```
Skill({ skill: "example-mapping" })
```

It is a conversation, not a generator: it discovers business rules, collects
concrete examples for each, and parks genuine unknowns as open questions. The
examples it produces are what the Test List turns into `it.todo()` cases.
Skip it when the spec is already unambiguous — but see below for why concrete
examples matter so much.

## Why this workflow: what was measured

We did not pick this workflow on gut feeling. We ran AI agents on the same
programming tasks many times, without anyone intervening, and measured the
resulting code. Two tasks:

- **Game of Life**: a well-known exercise. Models have seen it many times
  during training.
- **Claim Office**: an insurance-claims command-line tool we wrote ourselves,
  so the model cannot know it. Its spec contains deliberate ambiguities.
  Correctness is checked by 15 acceptance scenarios the agent never sees.

### Vibe coding vs. "just use TDD" vs. this workflow

- **Vibe coding:** "here is the spec, implement it" (in one go, or step by step with a plan).
- **"Just use TDD":** the same agent, told to use TDD, with no further structure.
- **This workflow:** Test List, then Red → Green → Refactor with an isolated refactor step every cycle.

**Model: Claude Opus 4.7**, 5–10 runs per cell. Lower is better.

| What we measured | Vibe coding | "Just use TDD" | **This workflow** |
|---|---:|---:|---:|
| **Game of Life** (known task) | | | |
| Complexity of the hardest function¹ | 16–19 | 22 | **6.5** |
| Longest function (lines) | 32 | 33 | **14** |
| Code smells found by the linter | 4–5 | 6 | **2.4** |
| **Claim Office** (unknown task) | | | |
| Complexity of the hardest function¹ | 11–12 | 20 | **5.7** |
| Longest function (lines) | 40–41 | 52 | **18** |
| Code smells found by the linter | 12–16 | 17 | **1.3** |
| Tokens used | 2 M | 3 M | 35 M |
| Time per task | 4 min | 5 min | 26 min |

¹ *Cognitive complexity (SonarJS): roughly, how hard a function is to read.*

- **"Just use TDD" is not enough.** Without structure, the agent writes the most
  complex code of all three, worse than vibe coding.
- **The enforced refactor step makes the difference.** It cuts the most complex
  function to about a third and removes most linter findings.
- **It costs tokens and time**, roughly 10× on the harder task.

### Why refactor after every step, not once at the end?

An obvious shortcut: let the agent write the code, add tests afterwards, and
clean up once when it is done. Same model (Opus 4.7), 5–7 runs per cell:

| What we measured | Code first, tests after, one cleanup at the end | **This workflow** |
|---|---:|---:|
| **Game of Life:** complexity of the hardest function¹ | 10.6 | **6.5** |
| **Game of Life:** longest function (lines) | 18 | **14** |
| **Claim Office:** complexity of the hardest function¹ | 7.4 | **5.7** |
| **Claim Office:** longest function (lines) | 28 | **18** |
| **Claim Office:** code smells found by the linter | 4.0 | **1.3** |
| **Claim Office:** hidden acceptance scenarios passed | 100 % | 100 % |
| **Claim Office:** tokens used | 2 M | 35 M |

Both get the task right. Cleaning up once at the end smooths the surface;
refactoring after every step breaks functions apart while they are still small.

### On the newest model: the gap narrows, but it stays

**Model: Claude Opus 5** (the model this version was validated on). 6 runs per
cell, this workflow on Claim Office 18 runs. Vibe coding was not measured on
this model.

| What we measured | Claim Office: "use TDD" | Claim Office: **this workflow** | Game of Life: "use TDD" | Game of Life: **this workflow** |
|---|---:|---:|---:|---:|
| Hidden acceptance scenarios passed | 100 % | 96 % | 100 % | 100 % |
| Complexity of the hardest function¹ | 5.3 | **2.8** | 7.2 | **1.8** |
| Average function length (lines) | 8.9 | **3.8** | 6.5 | **4.2** |
| Longest function (lines) | 24 | **16** | 15 | **10** |
| Time per task | 5 min | 44 min | 3 min | 10 min |
| Tokens used | 4 M | 84 M | 2 M | 7 M |

- **The newer model writes much cleaner code on its own**, even with plain "use TDD".
- **This workflow still halves complexity and function length**, and the ranges
  barely overlap, so this is not noise.
- **The 96 % comes from one scenario** that trips every structured workflow on
  this model. It is not a general correctness penalty.

### Concrete examples matter more than any workflow

For getting the task *right*, it hardly matters whether the tests come before
or after the code. What matters is whether the spec contains concrete examples:

| Task | Spec as prose | Spec as examples |
|---|---:|---:|
| Claim Office | 27 % | **94 %** |
| Sphinx Score (a second unknown task) | 15 % | **100 %** |

*(Opus 5, measured with a closely related, more elaborate variant of this
workflow. On Opus 4.7, even working test-first from a prose spec reached only
21 %.)*

**Examples make the code correct, the per-step refactor keeps it simple.** That
is why Example Mapping comes first, and why the refactor step sits inside the loop.

### What these numbers do not show

- The agents ran **unattended**. The shipped workflow stops for your approval by
  default, and many misses we saw are the kind a single clarifying question prevents.
- Small, self-contained tasks, **TypeScript only**. No legacy code.
- Results are **per model**. Rankings between workflows have flipped between
  model versions before.

## Tested parameters

This snapshot derives from `exact-hybrid-v2-testlist-fix-cc`. The recommendation
for that workflow comes from
`research/workflow-dev/workflow-construction.md` in the upstream lab repo
(`agentic_coding_lab_project`). Refer there for the validating
experiments, replicate counts, and outcome metrics.

- **Model:** Claude Opus 5 (no-thinking variant) — primary validation target
- **Harness:** Claude Code CLI 2.1.267
- **Language stack:** TypeScript, Vitest, npm

Different models or harness versions may produce different results.

## Original name and lineage

Source workflow: `exact-hybrid-v2-testlist-fix-cc` from
`agentic_coding_lab_project/experiments/workflows/`.

For the full lineage and the empirical findings that promoted this workflow
to "current best for correctness-critical work", see
`research/workflow-dev/workflow-construction.md` and
`research/workflow-dev/model-recommendation-matrix.md` in the upstream lab repo.

## HITL adaptation

The source workflow was built for unattended batch runs — it ran with no human
gates between phases, start to finish. For interactive use, that
autonomous-by-default behavior is wrong.

This export changes it to:

- **HITL on by default** (`full-hitl`): stops after Test-List, Red, Refactor,
  and on prediction failures.
- **Green skipped by default**: keeps cycles tight; can be re-enabled by
  switching to a custom level.
- **Autonomy Level as a single setting**: one line at the top of
  `.claude/skills/tdd/human-in-the-loop.md` controls the whole workflow.
  Choices include `full-hitl`, `refactor-only`, `red-only`, `every-n-tests N`,
  `task-end`, and `autonomous`.

The HITL logic lives **only** in `.claude/skills/tdd/human-in-the-loop.md`.
Phase files reference it but do not embed stop logic, so you can swap the HITL
file out without touching the workflow files.

## Installation

1. Copy the `.claude/` directory into your project root.
2. Ensure the project has TypeScript, Vitest, and npm set up (see
   `.claude/rules/tdd-with-ts-and-vitest.md`).
3. To use a different Autonomy Level, edit the first non-comment line of
   `.claude/skills/tdd/human-in-the-loop.md` under "Autonomy Level".
4. Start a TDD task by asking Claude to implement a feature **using TDD**. The
   workflow lives in `.claude/skills/tdd/SKILL.md` and is **not** auto-loaded:
   Claude pulls it in when you ask for TDD, and leaves it out of context for
   ordinary coding work.

## File layout

```
.claude/
├── README.md                           This file (travels with the workflow)
├── VERSION                             Date-based version tag
├── settings.json                       Permissions allowlist for this repo (not part of the exported baseline)
├── skills/
│   ├── tdd/
│   │   ├── SKILL.md                    ★ The workflow — gated, loads only when you ask for TDD
│   │   ├── human-in-the-loop.md        ★ Single source of truth for HITL stops
│   │   └── tdd-execution-mode.md       Phase sequence and subagent prompt contract
│   ├── example-mapping/SKILL.md        Optional requirements session — run it before the loop
│   └── end-refactor/SKILL.md           Manual extra — you invoke it, the workflow never does
├── agents/
│   └── refactor.md                     Per-cycle refactor subagent (isolated context)
├── commands/
│   ├── test-list.md                    /test-list skill
│   ├── red.md                          /red skill
│   └── green.md                        /green skill
└── rules/
    └── tdd-with-ts-and-vitest.md       Tech-stack conventions (ambient, not gated)
```

The workflow's own files live **inside** `skills/tdd/`, not under `rules/`.
Claude Code auto-loads everything in `rules/`, so a file left there would be in
context on every session. `tdd-with-ts-and-vitest.md` is the deliberate
exception: TS and Vitest conventions should apply whenever you touch a
`*.spec.ts`, whether or not you asked for a TDD session.

README.md and VERSION live **inside** `.claude/` on purpose: when you copy
`.claude/` into a project, the version info and overview travel with it, and
they don't clash with your project's own `README.md`.

## Version and updates

Version: **2026-09-13** (date-based — also recorded in the `VERSION` file in
this directory).

Future updates ship in their own dated sub-directory next to this one.
Earlier snapshots are kept verbatim — no in-place edits — so books and
articles can refer to a specific version reproducibly.

## License

Same as the surrounding project. If you redistribute this snapshot, please
keep this README intact so readers can trace the version, model, and source.
