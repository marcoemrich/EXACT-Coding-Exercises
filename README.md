# EXACT Coding - Exercises

Exercise setup for the **EXACT Coding** workshop: **EX**ample-guided, **A**I-**C**ollaborative & **T**est-driven Development.

## Workshop

Test-Driven, AI-Assisted Development for Maintainable Code.

This hands-on workshop introduces EXACT Coding -- a pragmatic workflow for AI-assisted development focusing on readability, refactorability, and maintainability. Participants work in pairs and groups of three (driver + two navigators) through short modules with extensive exercises.

### Topics

- Test-Driven Development (TDD)
- Example Mapping
- Mob/Ensemble Programming
- AI Tools (Claude Code and Cursor)
- EXACT Coding Workflow

### Contributors

- Oliver Roth -- Java, JUnit and Maven port of the Copilot harness (`harness/copilot-java`)
- Dennis Effing -- fixes to the OpenCode agent definitions and config

## Setup

There are two ways to set up the project: using the **Dev Container** (recommended) or a **local installation**.

### Option A: Dev Container (recommended)

The repo includes a Dev Container configuration with Node.js, Claude Code, and a restrictive firewall pre-installed.

#### Prerequisites

- [Docker](https://www.docker.com/)
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- Claude Code API key or Portkey configuration (see below)

#### API Key Configuration

**Option 1: Direct API key** -- set the environment variable on your host before opening the container:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

**Option 2: Portkey proxy** -- configure in `~/.claude/settings.json` on your host:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.portkey.ai",
    "ANTHROPIC_AUTH_TOKEN": "dummy",
    "ANTHROPIC_CUSTOM_HEADERS": "x-portkey-api-key: <your-key>"
  }
}
```

The container automatically mounts `~/.claude/` from your host, so your settings are available inside the container.

#### Starting the Dev Container

1. Open the project folder in VS Code (**File -> Open Folder**, not as workspace)
2. VS Code will prompt: "Reopen in Container" -- click it
3. Or manually: `Ctrl+Shift+P` -> **"Dev Containers: Reopen in Container"**
4. Wait for the container to build (first time takes a few minutes)

After startup, run `npm install` in the terminal, then verify with the checks below.

### Option B: Local Installation

#### Prerequisites

- Node.js (v20 or higher)
- npm
- Claude Code (`npm install -g @anthropic-ai/claude-code`)

#### Installation

```bash
npm install
```

### Running Tests

```bash
npm test
```

### Watch Mode

```bash
npm run test:watch
```

## Verify Your Setup

Run the following checks to make sure everything is working (both local and Dev Container).

**1. Node.js installed?**

```bash
node --version
# Expected: v20 or higher (e.g. v24.9.0)
```

**2. Claude Code installed and API key configured?**

```bash
claude -p "respond with: setup ok"
# Expected: "setup ok" (or similar short response)
```

If this hangs or returns an authentication error, your API key is not configured correctly. See the [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) for setup instructions.

**3. Dependencies installed and tests passing?**

```bash
npm install
npm test
```

Expected test output:

```
 ✓ src/example.spec.ts (1 test)

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

(If you have already worked through exercises, you will see more files and tests
than this — what matters is that everything passes.)

If all checks pass, you're ready for the workshop!


## Agent Configuration

This repository distributes **EXACT Coding Predictive TDD v1** as the universal
maintained workflow: one shared context, falsifiable predictions before
deterministic checks, and inline refactoring under the Four Rules of Simple
Design. The historical Opus/Hybrid branches remain available for reproduction,
but are superseded as the maintained product line.

Each PTDD branch carries exactly one agent configuration. This branch is part
of **Predictive TDD v1**, distribution version **2026-09-19**.

| Agent | Predictive TDD v1 branch | Config | Start EXACT Coding with |
|---|---|---|---|
| Claude Code | `main` | `.claude/` | `/exact-coding`, or ask for EXACT Coding |
| GitHub Copilot (TypeScript) | `harness/copilot` | `.github/` | `/exact-coding`, or ask for EXACT Coding |
| Cursor | `harness/cursor` | `.cursor/` | `/exact-coding`, or ask for EXACT Coding |
| OpenCode | `harness/opencode` | `.opencode/` | `/exact-coding` |
| pi | `harness/pi` | `.pi/` | `/skill:exact-coding`, or ask for EXACT Coding |

Every branch ships **two refactor profiles**. `exact-coding` is the default;
append `-isolated-refactor` to the same invocation for the subagent variant
(`/exact-coding-isolated-refactor`, `/skill:exact-coding-isolated-refactor`).
See "Choosing a refactor profile" below.

```bash
git checkout main                 # Claude Code
git checkout harness/copilot      # GitHub Copilot
git checkout harness/cursor       # Cursor
git checkout harness/opencode     # OpenCode
git checkout harness/pi           # pi
```

Keeping line and harness combinations on separate branches prevents agents that
scan several vendors' directories from loading duplicate workflows.

### Predictive TDD v1 workflow

The workflow first creates a complete ordered test list with all future
behaviors inactive. It then handles exactly one behavior per cycle:

1. **Red** — activate one behavior, state a falsifiable prediction, and verify
   the behavior fails for the predicted reason.
2. **Green** — make the smallest production change that satisfies it.
3. **Refactor** — review and, where useful, refactor inline under the Four Rules
   of Simple Design.
4. **Close** — predict and run the complete suite and applicable stack gates.

A test already satisfied by an earlier generalization is valid evidence. The
workflow confirms it instead of manufacturing a failure.

The Predictive TDD loop deliberately has **no APP mass objective, no refactor
subagent, and no metric-driven end pass**. Those are product-method choices,
not missing port features.

### Choosing a refactor profile

The Refactor phase can run in the main context or in a separate subagent. Both
profiles are otherwise the same workflow over the same files.

| | `exact-coding` (default) | `exact-coding-isolated-refactor` |
|---|---|---|
| Refactor runs | inline, in the main context | in a subagent with a fresh context |
| Cost | baseline | 3–4.5× the time, 2.5× the tokens |
| Structure | good | measurably better |

The subagent sees the code, the tests and the specification, but not the
reasoning that produced the implementation — so it reviews the result rather
than defending it. That is where the structural gain comes from, and it is also
why it costs more: the context has to be rebuilt after every Green.

Measured on Claim Office, ten runs per inline cell and five per isolated cell:

| What we measured | inline | **isolated** | inline | **isolated** |
|---|---:|---:|---:|---:|
| | *Opus 5* | *Opus 5* | *SOL* | *SOL* |
| Hidden acceptance scenarios passed | 99 % | 96 % | 100 % | 100 % |
| Cognitive complexity, hardest function | 2.8 | **2.2** | 3.9 | **2.6** |
| Cognitive complexity, average | 1.47 | **1.13** | 1.83 | **1.24** |
| Average function length (lines) | 5.95 | **4.6** | 6.42 | **4.21** |
| Longest function (lines) | 18.9 | **15.2** | 18.4 | **15.8** |
| Code smells found by the linter | 0 | 0 | 0 | 0 |
| Time per task | 20 min | 92 min | 25 min | 82 min |
| Tokens used | 21.4 M | 48.4 M | 6.9 M | 17.5 M |
| Runs that finished in budget | 100 % | 80 % | 100 % | 100 % |

**Use the default** for everyday work and for anything on a clock. **Use the
isolated profile** when the structure of the result matters more than the bill —
a kata you want to study afterwards, a piece of code that will be read often, a
workshop exercise about refactoring.

Two caveats on the isolated profile: on Opus 5 one of five runs hit our time
budget, and correctness did not improve on either model. It buys structure, not
correctness.

### Manual extra: `end-refactor` (not part of the workflow)

> **You have to start this yourself. The workflow never runs it.**

Every branch ships `skills/end-refactor/SKILL.md`: a measured cleanup across the
whole `src/` (ESLint smells, cognitive complexity, McCabe, APP mass, one change
at a time). Ask for it by name when a piece of work is finished and you want
more than the inline per-cycle refactor. It sits outside the loop on purpose —
it costs noticeably more time and tokens, and Predictive TDD does not depend
on it.

### Optional: Example Mapping before the loop

Every branch also ships `skills/example-mapping/SKILL.md`, a conversation that
collects business rules and concrete examples before any test is written:
`/example-mapping` in Claude Code and Copilot, the `example-mapping` skill in
Cursor, OpenCode and pi. It facilitates a session over story, rules, examples
and questions, plus New Story cards for behavior that turns out to belong to a
different story. The result goes to a markdown file. It asks you for the rules
and examples; it does not invent them.

Note that this runs as an **interview**, not as a Three Amigos workshop: since
the domain expert is right there in the conversation, open questions get asked
immediately rather than parked. A red card is what happens when you cannot
answer — not the default move.

Concrete examples are the single biggest lever for getting a task right (see
the measurements below). It feeds the test list and is never invoked
automatically.

### Stack profiles

Workflow methodology and language/tooling are separate. TypeScript and Vitest
syntax, inactive-test conventions, commands, compiler behavior, and lint advice
live only in:

```text
<agent-config>/skills/predictive-tdd/stacks/typescript-vitest.md
```

The TDD orchestration selects and reads the matching profile before changing
code. This makes another language a new stack profile rather than a duplicated
workflow.

### Why this workflow: what we measured

We did not pick this workflow on gut feeling. We ran AI agents on the same
programming task many times, without anyone intervening, and measured the
resulting code. The task is **Claim Office**, an insurance-claims command-line
tool we wrote ourselves, so the model cannot know it from training. Its spec
contains deliberate ambiguities, and correctness is checked by 15 acceptance
scenarios the agent never sees.

#### This exact workflow, ten runs per model

Predictive TDD v1 as shipped, on the two models it is validated on. Ten runs
per cell — the largest sample in our data.

| What we measured | Opus 5 (Claude Code) | GPT-5.6 SOL (pi) |
|---|---:|---:|
| Hidden acceptance scenarios passed | 99 % | 100 % |
| Internal tests passing | 100 % | 100 % |
| Cognitive complexity, hardest function¹ | 2.8 | 3.9 |
| Cognitive complexity, average¹ | 1.47 | 1.83 |
| Code smells found by the linter | 0 | 0 |
| Average function length (lines) | 5.95 | 6.42 |
| Longest function (lines) | 18.9 | 18.4 |
| Tokens used | 21.4 M | 6.9 M |
| Time per task | 20 min | 25 min |

¹ *Cognitive complexity (SonarJS): roughly, how hard a function is to read.
A value below 5 means every function stays easy to follow.*

Zero linter findings in all twenty runs, and no function that is hard to read
on either model.

#### Structure beats "just use TDD"

The floor is the same agent told only to work test-driven, with no further
structure. Measured on the SOL line with pi; five runs per cell. Lower is
better.

| What we measured | "Just use TDD" | **Predictive TDD** |
|---|---:|---:|
| **GPT-5.6 SOL** | | |
| Hidden acceptance scenarios passed | 100 % | 100 % |
| Cognitive complexity, hardest function¹ | 11.4 | **4.8** |
| Cognitive complexity, average¹ | 3.40 | **2.10** |
| Code smells found by the linter | 4.2 | **0.0** |
| Tokens used | 0.27 M | 4.9 M |
| Time per task | 3.6 min | 18 min |
| **GPT-6 Astra** | | |
| Hidden acceptance scenarios passed | 100 % | 100 % |
| Cognitive complexity, hardest function¹ | 13.8 | **3.2** |
| Cognitive complexity, average¹ | 6.10 | **2.36** |
| Code smells found by the linter | 16.6 | **0.0** |
| Tokens used | 0.53 M | 7.5 M |
| Time per task | 5.7 min | 30 min |

- **"Just use TDD" is not enough.** Without structure the agent writes long,
  deeply branched functions and leaves linter findings behind.
- **Readability is where the workflow pays.** The hardest function drops by a
  factor of two to four, and the average function drops with it — so this is
  not one outlier being smoothed away.
- **Correctness is not where it pays.** On this task both reach 100 %. What
  makes the difference for correctness is the spec (see below), not the loop.
- **It costs tokens and time**, roughly 15× the tokens and 5× the time.

*(These two cells were measured on an earlier version of the same line, before
the test-list cross-check was added. They are the best floor comparison we
have; the shipped version is measured in the table above.)*

#### Concrete examples matter more than any workflow

For getting the task *right*, it matters far less whether tests come before or
after the code than whether the spec contains concrete examples:

| Task | Spec as prose | Spec as examples |
|---|---:|---:|
| Claim Office (Opus 4.7) | 21 % | **97 %** |
| Claim Office (Opus 4.6) | 23 % | **87 %** |

*(Measured on the TDD line that preceded this one. The effect is a property of
the specification, not of the TDD skill — it is why Example Mapping comes
first, and it has held across every model and workflow we have measured it on.)*

#### What these numbers do not show

- The agents ran **unattended**. The shipped workflow stops for your approval by
  default, and many misses we saw are the kind a single clarifying question
  prevents.
- Small, self-contained tasks, **TypeScript only**. No legacy code.
- Results are **per model**. Rankings between workflows have flipped between
  model versions before — including within this workflow line.

### Human-in-the-loop

The default Autonomy Level is `full-hitl`: stop after Test List, Red, and
Refactor, and whenever a prediction is wrong. Green has no default stop. Change
the single setting in the `human-in-the-loop` file beside the TDD workflow (or
under the harness's rules directory for Cursor/OpenCode).

### pi: one extra step

pi has no built-in subagent mechanism. Predictive TDD refactors inline and does
not need one, so nothing extra is required for the workflow itself. **On first
use pi may ask whether you trust the project — say yes**, otherwise project-local
skills are not loaded.

### Copilot: CLI and VS Code

The `harness/copilot` branch runs in both **Copilot CLI** and **VS Code agent
mode** from the same `.github/` tree. `harness/copilot-java` is the same tree
ported to Java, JUnit 5 and Maven. Skills live in `.github/skills/`. In the CLI
and in VS Code alike the skills appear under `/`.

### Invocation and provenance

The workflow is opt-in. Ordinary coding sessions do not load Predictive TDD
unless you ask for it. Provider credentials, routing, model selection, and
permission policy are intentionally not shipped.

This distribution is generated from
`exact-ptdd-v1-pi` in the `agentic_coding_lab` repository. It was promoted
after `RQ-test-list-dimensions-replication` at n=10 per workflow and platform
cell on Claim Office. The canonical methodology is validated on **GPT-5.6 SOL
with pi** and **native Opus 5 with Claude Code**. Copilot, Cursor, and OpenCode
are semantic ports of the same method; they are not presented as independent
cross-harness experiment cells.

### Credits

The Guessing Game and Predictive TDD approach used here is inspired by
[Ted M. Young's Predictive TDD and TDD Game](https://tdd.cards/) and
[Jon Jagger's cyber-dojo](https://cyber-dojo.org/).

---

Built with EXACT Coding: **EX**ample-guided, **A**I-**C**ollaborative &
**T**est-driven Development.
