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

This repo ships the EXACT Coding TDD workflow preconfigured for **five coding
agents**. They are equivalent — use whichever you have. Version **2026-09-13**.

**Claude Code is the default and lives on `main`.** Every other agent has its
own branch, carrying exactly one configuration:

| Agent | Branch | Directory | Start a TDD session with |
|-------|--------|-----------|--------------------------|
| Claude Code | `main` | `.claude/` | `/tdd`, or ask for TDD in plain language |
| GitHub Copilot (TypeScript) | `harness/copilot` | `.github/` | `/tdd`, or ask for TDD in plain language |
| GitHub Copilot (Java) | `harness/copilot-java` | `.github/` | `/tdd`, or ask for TDD in plain language |
| Cursor | `harness/cursor` | `.cursor/` | `/tdd`, or ask for TDD in plain language |
| OpenCode | `harness/opencode` | `.opencode/` | `/tdd` |
| pi | `harness/pi` | `.pi/` | `/skill:tdd`, or ask for TDD in plain language |

```bash
git checkout harness/copilot   # or: copilot-java, cursor, opencode, pi
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

Test-List once, then Red → Green → Refactor for every test, until the list is done.

| Phase | Runs in | What happens |
|-------|---------|--------------|
| Test List | Main context | Turns the spec into a list of pending tests, ordered simple to complex |
| Red | Main context | Activates ONE test, predicts the failure (the Guessing Game), verifies it fails for the right reason |
| Green | Main context | Writes the minimal code to pass — hardcoded returns are fine |
| Refactor | **Isolated subagent** | Four Rules of Simple Design, naming first, APP mass before/after |

Test-List, Red and Green share one context on purpose: the predictions, error
messages and minimal implementations only make sense together. Refactor runs in
a **fresh, isolated context** on purpose: the refactorer sees the code as it
stands, not the history of how it got there, which lets it judge the result on
its own merits.

#### Manual extra: `end-refactor` (not part of the workflow)

> **You have to start this yourself. The workflow never runs it.**

When a piece of work is finished and you want an extra cleanup across the
whole production code, ask for the `end-refactor` skill by name. It measures
lint findings and complexity, changes one thing at a time and re-measures after
each change.

It is not in the loop for a reason: it takes noticeably more time and tokens,
and in our measurements running it automatically at the end of every task did
not make the average function any smaller. Use it on multi-file code where
duplication across files has had room to build up.

### Why this workflow: what we measured

We did not pick this workflow on gut feeling. We ran AI agents on the same
programming tasks many times, without anyone intervening, and measured the
resulting code. Two tasks:

- **Game of Life**: a well-known exercise. Models have seen it many times
  during training.
- **Claim Office**: an insurance-claims command-line tool we wrote ourselves,
  so the model cannot know it. Its spec contains deliberate ambiguities.
  Correctness is checked by 15 acceptance scenarios the agent never sees.

#### Vibe coding vs. "just use TDD" vs. this workflow

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

#### Why refactor after every step, not once at the end?

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

#### On the newest model: the gap narrows, but it stays

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

#### Concrete examples matter more than any workflow

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

#### What these numbers do not show

- The agents ran **unattended**. The shipped workflow stops for your approval by
  default, and many misses we saw are the kind a single clarifying question prevents.
- Small, self-contained tasks, **TypeScript only**. No legacy code.
- Results are **per model**. Rankings between workflows have flipped between
  model versions before.

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
mode** from the same `.github/` tree. `harness/copilot-java` is the same tree
ported to Java, JUnit 5 and Maven. Skills live in `.github/skills/`, the two
refactor agents in `.github/agents/`. In the CLI you can force a phase with
`/red`, `/green` and so on, and delegate explicitly with `/agent refactor`; in
VS Code the same skills appear under `/` and the agents are invoked as
subagents. See `.github/README.md` for the differences that remain.

### Where the workflow comes from

The configuration is generated from the workflow research in
`agentic_coding_lab_project`. It is exported from the lab workflow
`exact-hybrid-v2-testlist-fix` (version 2026-09-13) and was validated on Claude
Opus 5 with Claude Code. Each agent directory carries its own `README.md` and
`VERSION` where the agent supports it. For the lineage and the full
experiments, see `research/workflow-dev/workflow-construction.md` and
`research/workflow-dev/model-recommendation-matrix.md` in that repo.
