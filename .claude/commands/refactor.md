---
description: Refactor code using Simple Design Rules and Absolute Priority Premise
---

# Refactor Command

**MANDATORY**: Use the Task tool with `subagent_type: "refactor"` to run the Refactor phase.

Do NOT perform this phase manually. The agent enforces TDD discipline and prevents common mistakes.

**This must be a separate agent call.** After each Green phase, the orchestrator must explicitly launch the Refactor agent — never combine Green+Refactor into one Task.

Provide the agent with the necessary context:
- Test file path
- Implementation file path
- Current number of passing tests
- Recent changes made in Green phase
