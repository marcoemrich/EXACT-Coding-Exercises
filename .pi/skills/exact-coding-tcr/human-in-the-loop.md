# Human-in-the-Loop (HITL)

This file is the single source of truth for EXACT Coding TCR checkpoints.

## Autonomy Level

**Current setting:** `full-hitl`

| Level | Stops after |
|---|---|
| `full-hitl` | Test List, Red, and Refactor |
| `refactor-only` | Refactor |
| `red-only` | Red |
| `every-n-tests N` | Every N completed cycles |
| `task-end` | End of task |
| `autonomous` | Never |

Green has no default checkpoint because it is the most mechanical phase.

At a required checkpoint, summarize the verified evidence and wait for explicit human approval:

- **Test List:** show the complete ordered inactive behaviors. After approval, verify and commit the test list using the TCR workflow.
- **Red:** show the active behavior, actual test result, and why the committed failure is the intended behavioral Red.
- **Refactor:** name the Four Rules decision, each structural change made, and the passing test evidence. Report explicitly when no refactoring improved the code.

Do not begin the next TCR phase while waiting for approval. Only `autonomous` may continue without waiting at configured checkpoints.
