# EXACT Coding - Exercises

Exercise setup for the **EXACT Coding** workshop: **EX**ample-guided, **A**I-**C**ollaborative & **T**est-driven Development.

## Workshop

Test-Driven, AI-Assisted Development for Maintainable Code.

This hands-on workshop introduces EXACT Coding -- a pragmatic workflow for AI-assisted development focusing on readability, refactorability, and maintainability. Participants work in pairs and groups of three (driver + two navigators) through short modules with extensive exercises.

### Topics

- Test-Driven Development (TDD)
- Example Mapping
- Mob/Ensemble Programming
- AI Tools (Github Copilot)
- EXACT Coding Workflow

### Trainers

Ferdi Ade & Marco Emrich

## Setup

#### Prerequisites

- Java 17 or higher
- Maven

#### Installation

```bash
mvn test
```

### Running Tests

```bash
mvn test
```

### Watch Mode

```bash
mvn test -DskipTests=false
```

## Verify Your Setup

Run the following checks to make sure everything is working.

**1. Java installed?**

```bash
java --version
# Expected: version 17 or higher
```

**2. Maven installed and tests passing?**

```bash
mvn test
```

Expected test output:

```
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0

```

(If you have already worked through exercises, you will see more files and tests
than this — what matters is that everything passes.)

If all checks pass, you're ready for the workshop!


## Agent Configuration

This repo ships the EXACT Coding TDD workflow preconfigured for **five coding
agents**. They are equivalent — use whichever you have. Version **2026-08-12**.

**Claude Code is the default and lives on `main`.** Every other agent has its
own branch, carrying exactly one configuration:

| Agent | Branch                 | Directory | Start a TDD session with |
|-------|------------------------|-----------|--------------------------|
| Claude Code | `main`                 | `.claude/` | Ask for TDD in plain language ("let's TDD this kata") |
| GitHub Copilot | `harness/copilot`      | `.github/` | `/tdd`, or ask for TDD in plain language |
| GitHub Copilot | `harness/copilot-java` | `.github/` | `/tdd`, or ask for TDD in plain language |
| Cursor | `harness/cursor`       | `.cursor/` | Ask for TDD in plain language |
| OpenCode | `harness/opencode`     | `.opencode/` | The `tdd` command |
| pi | `harness/pi`           | `.pi/` | `/skill:tdd`, or ask for TDD in plain language |

```bash
git checkout harness/copilot-java   # or: cursor, opencode, pi
```

**Why one branch per agent.** Two reasons. Copilot reads `.claude/skills/` and
`.claude/agents/` as its own, so a tree holding both configurations offers
Copilot every skill twice. And keeping each harness alone in its tree is what
makes the workflows comparable: whatever a session does, only one configuration
could have caused it. The harness branches therefore carry no `.claude/`.

Model- or surface-specific variants get a suffix on the same scheme, for example
`harness/copilot-vscode`.

**You have to ask for the workflow.** None of them load it automatically. A
session where you never mention TDD gets no Red-Green-Refactor discipline, no
prediction blocks, no checkpoints — which is what you want when you are just
fixing a typo. Say "using TDD" and the whole workflow comes in.

### The workflow

Five phases: Test-List once, then Red-Green-Refactor per test, then a single
End-Refactor pass over everything at the end.

| Phase | Runs in | What happens |
|-------|---------|--------------|
| Test List | Main context | Turns the spec into `it.todo()` entries, ordered simple to complex |
| Red | Main context | Activates ONE test, predicts the failure (the Guessing Game), verifies it fails for the right reason |
| Green | Main context | Writes the minimal code to pass — hardcoded returns are fine |
| Refactor | **Isolated subagent** | Four Rules of Simple Design, naming first, APP mass before/after |
| End-Refactor | **Isolated subagent** | Runs once at the end over the whole `src/`, measuring ESLint smells, cognitive complexity, APP mass and McCabe complexity around each change |

Test-List, Red and Green share one context on purpose — the predictions, error
messages, and minimal implementations only make sense together. Both refactor
phases run in a **fresh, isolated context** on purpose: the refactorer sees the
code as it stands, not the history of how it got there, which is what lets it
judge the result on its own merits.

The End-Refactor pass exists because a per-cycle refactor only ever sees one
file mid-flight. After the last test passes, the design has stabilised and
cross-file duplication and complexity hot spots become visible for the first
time.

### Human-in-the-Loop

The default is **`full-hitl`**: the agent stops and waits for your approval
after Test-List, after Red, and after Refactor — and immediately whenever a
prediction turns out wrong. It does **not** stop after Green; Green is the most
mechanical phase, and stopping there mostly produces "yes, continue".

A wrong prediction is always a hard stop. It means the model's picture of the
system disagrees with reality, and continuing usually compounds the
misunderstanding.

Other levels: `refactor-only`, `red-only`, `every-n-tests N`, `task-end`,
`autonomous`. Change one line at the top of your agent's HITL file:

| Agent | File |
|-------|------|
| Claude Code | `.claude/skills/tdd/human-in-the-loop.md` |
| GitHub Copilot | `.github/rules/human-in-the-loop.md` |
| Cursor | `.cursor/rules/human-in-the-loop.mdc` |
| OpenCode | `.opencode/rules/human-in-the-loop.md` |
| pi | `.pi/rules/human-in-the-loop.md` |

That file is the single source of truth. The phase files point at it but contain
no stop logic themselves, so changing the level changes the whole workflow.

### Example Mapping

Separate from TDD, for exploring a feature *before* you write any tests:
`/example-mapping` in Claude Code and Copilot, or the `example-mapping` skill in
Cursor, OpenCode and pi. It facilitates a session over story, rules, examples and
questions, plus New Story cards for behaviour that turns out to belong to a
different story. The result goes to a markdown file. It asks you for the rules
and examples; it does not invent them.

Note that this runs as an **interview**, not as a Three Amigos workshop: since
the domain expert is right there in the conversation, open questions get asked
immediately rather than parked. A red card is what happens when you cannot
answer — not the default move.

### pi: one extra step

pi has no built-in subagent mechanism, so the refactor phases rely on a small
extension bundled at `.pi/extensions/subagent/`. **On first use pi asks whether
you trust the project — say yes.** If you decline, pi has no way to delegate and
you end up with a workflow that silently skips refactoring.

The other four agents have subagents natively and need nothing extra.

### Copilot: CLI and VS Code

The `harness/copilot` branch runs in both **Copilot CLI** and **VS Code agent
mode** from the same `.github/` tree. Skills live in `.github/skills/`, the two
refactor agents in `.github/agents/`. In the CLI you can force a phase with
`/red`, `/green` and so on, and delegate explicitly with `/agent refactor`; in
VS Code the same skills appear under `/` and the agents are invoked as
subagents. See `.github/README.md` for the differences that remain.

### Where the workflow comes from

The configuration is generated from the workflow research in
`agentic_coding_lab_project` and validated against Claude Opus 4.8. Each
directory carries its own `README.md` and `VERSION`. For the lineage and the
experiments behind it, see `research/workflow-dev/workflow-construction.md` in
that repo.
