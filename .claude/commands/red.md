---
description: Enter the Red phase of TDD - create a failing test, make prediction, verify test fails
---

# Red Phase Command

**MANDATORY**: Use the Task tool with `subagent_type: "red"` to run the Red phase.

Do NOT perform this phase manually. The agent enforces TDD discipline and prevents common mistakes.

Provide the agent with the necessary context:
- Test file path
- Which `it.todo()` to activate
- Current number of passing tests
- Implementation file path
