# EXACT Coding workflow -- GitHub Copilot harness

The Red-Green-Refactor workflow for **Copilot CLI** and **VS Code agent mode**,
from one tree. Version: see `VERSION`.

## Layout

| Path | What it is |
|------|------------|
| `skills/tdd/SKILL.md` | The orchestrator. Start here: `/tdd` |
| `skills/{test-list,red,green}/SKILL.md` | The three main-context phases |
| `skills/example-mapping/SKILL.md` | Requirements exploration, before TDD |
| `agents/refactor.agent.md` | Per-cycle refactor, isolated context |
| `agents/end-refactor.agent.md` | Final metric-driven pass over `src/`, once |
| `rules/human-in-the-loop.md` | Autonomy Level -- the single stop-behaviour source |
| `rules/subagent-prompts.md` | What to pass each isolated agent |
| `rules/tdd-with-junit-and-maven.md` | Java and JUnit 5 conventions |

Copilot discovers `skills/` and `agents/` under `.github/` automatically.
`rules/` is not a Copilot mechanism -- those files are read on demand because
the skills and agents point at them by path.

## Starting a session

Say "let's TDD this kata", or invoke `/tdd` directly. Nothing loads
automatically: a session that never mentions TDD gets no Red-Green-Refactor
discipline, which is what you want when you are fixing a typo.

## What differs between CLI and VS Code

Everything is shared except how a subagent is started.

| | Copilot CLI | VS Code agent mode |
|---|---|---|
| Invoke a phase | `/red`, `/green`, `/test-list` | same, via `/` |
| Delegate refactoring | `/agent` opens a picker; or name the agent in the prompt; or `copilot --agent=refactor` | agents dropdown in the Chat view, or the subagent tool (`#runSubagent`) naming `refactor` |
| Tool permissions | `--allow-tool` and CLI config | VS Code approval prompts and terminal auto-approve settings |

The agents declare no `tools:` list on purpose, so they inherit whatever the
surface grants. That keeps one file working in both places; the cost is that
tool restriction is not enforced from the agent definition the way it is in the
OpenCode and pi harnesses.

## Known gaps against the other harnesses

- **No permission allowlist.** `.claude/settings.json` and `opencode.json` pin
  which commands may run unattended. There is no equivalent checked into this
  tree; batch runs need the surface configured by hand.
- **Delegation is inferred, not forced.** Copilot decides whether to load a
  skill or delegate to an agent. The orchestrator states the requirement
  loudly, but it cannot compel the surface. See "Verifying delegation" below.
- **This tree must not coexist with `.claude/`.** Copilot reads
  `.claude/skills/` and `.claude/agents/` as its own and would see every skill
  twice. That is why each harness lives on its own branch.

## Verifying delegation

Two things can go wrong invisibly: the refactor runs in the main context, or it
runs in a subagent that never loaded `agents/refactor.agent.md` and improvises
instead. Both produce output that looks plausible.

**In the CLI, while it happens.** A real subagent renders as its own block: a
header carrying the model it runs on, e.g. `Refactor(bedrock/claude-opus-5@...)`,
its tool calls indented beneath it, and its own elapsed time. Main-context work
is flush left with no model annotation.

**In the transcript, afterwards.** Both agents must open their report with a
marker line, even when they changed nothing:

```
## Refactor (agent: refactor, cycle N)
## End-Refactor (agent: end-refactor)
```

A generic subagent does not emit these. Over a batch of runs:

```bash
grep -c '^## Refactor (agent: refactor' session.log   # should equal the cycle count
```

If a cycle is missing its marker, that Refactor phase did not run under this
agent definition — treat it as a missing phase, not as a clean cycle.

**Before you start.** `/agent` in the CLI lists the discovered custom agents
(in VS Code, `/agents` opens the Configure Custom Agents menu). If
`refactor` is not among them, nothing below matters: the definition was never
loaded.
