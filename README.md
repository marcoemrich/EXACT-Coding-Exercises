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
of **Predictive TDD v1**, distribution version **2026-09-16**.

| Agent | Predictive TDD v1 branch | Config | Start EXACT Coding with |
|---|---|---|---|
| Claude Code | `main` | `.claude/` | `/exact-coding`, or ask for EXACT Coding |
| GitHub Copilot (TypeScript) | `harness/copilot` | `.github/` | `/exact-coding`, or ask for EXACT Coding |
| Cursor | `harness/cursor` | `.cursor/` | `/exact-coding`, or ask for EXACT Coding |
| OpenCode | `harness/opencode` | `.opencode/` | `/exact-coding` |
| pi | `harness/pi` | `.pi/` | `/skill:exact-coding`, or ask for EXACT Coding |

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

Predictive TDD v1 deliberately has **no APP mass objective, no refactor
subagent, and no metric-driven end-refactor pass**. Those are product-method
choices, not missing port features.

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

### Human-in-the-loop

The default Autonomy Level is `full-hitl`: stop after Test List, Red, and
Refactor, and whenever a prediction is wrong. Green has no default stop. Change
the single setting in the `human-in-the-loop` file beside the TDD workflow (or
under the harness's rules directory for Cursor/OpenCode).

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
