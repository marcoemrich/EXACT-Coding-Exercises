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

### Trainers

Ferdi Ade & Marco Emrich

## Setup

### Prerequisites

- Node.js
- npm
- Claude Code (`npm install -g @anthropic-ai/claude-code`)

### Installation

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

Run the following checks to make sure everything is working.

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

If all checks pass, you're ready for the workshop!

## Claude Code Configuration

This repo ships with a preconfigured `.claude/` directory that enforces the EXACT Coding workflow when using Claude Code. The configuration consists of **Rules**, **Agents**, and **Commands**.

### Rules (`.claude/rules/`)

Rules are loaded automatically into Claude's context at startup. They define the guardrails for the entire session.

| File | Purpose |
|------|---------|
| `tdd.md` | Core TDD workflow -- mandates the use of specialized agents for every TDD phase |
| `human-in-the-loop.md` | Checkpoint rules -- Claude must stop after every phase (Red, Green, Refactor) and wait for explicit approval |
| `tdd_with_ts_and_vitest.md` | TypeScript & Vitest conventions (test file naming, imports, test execution) |

### Agents (`.claude/agents/`)

Agents are specialized sub-agents that run in an **isolated context**. Each agent focuses on exactly one TDD phase, preventing context pollution and enforcing discipline.

| Agent | Phase | Description |
|-------|-------|-------------|
| `test-list` | Test List | Creates `it.todo()` entries for base functionality, ordered simple to complex |
| `red` | Red | Activates ONE test, makes a prediction (Guessing Game), verifies it fails for the right reason |
| `green` | Green | Implements the minimal code to make the failing test pass (hardcoded returns are fine!) |
| `refactor` | Refactor | Applies the Four Rules of Simple Design and calculates APP mass before/after |
| `code-improvement-scanner` | Review | Analyzes code for readability, performance, and best practice improvements |

### Commands (`.claude/commands/`)

Commands are slash commands that can be invoked manually during a Claude Code session (e.g. `/red`, `/green`, `/refactor`). They provide the same functionality as agents but run in the **main context** instead of an isolated one.

| Command | Usage |
|---------|-------|
| `/test-list` | Create a test list with `it.todo()` entries |
| `/red` | Enter Red phase -- activate a test and predict the failure |
| `/green` | Enter Green phase -- write minimal implementation |
| `/refactor` | Refactor using Simple Design Rules and APP |
| `/code-review` | Multi-stage code review (Review -> Evaluation -> Conclusion) |

### Agents vs. Commands

| | Agents | Commands |
|---|--------|----------|
| Context | Isolated (fresh context per phase) | Shared (main conversation context) |
| Invocation | Automatic (via rules) | Manual (`/command-name`) |
| Best for | Strict TDD discipline | Quick, interactive use |

### TDD Workflow

The typical EXACT Coding workflow with Claude Code:

1. **Start** -- Claude automatically uses the `test-list` agent to create `it.todo()` entries
2. **Red** -- The `red` agent activates one test, predicts the failure, verifies it fails
3. **Green** -- The `green` agent writes minimal code to make the test pass
4. **Refactor** -- The `refactor` agent improves the code (naming, duplication, APP mass)
5. **Repeat** -- Back to step 2 for the next test

After every phase, Claude stops and asks for approval before continuing (Human-in-the-Loop).
