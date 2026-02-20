---
description: Refactor code using Simple Design Rules and Absolute Priority Premise
---

# Refactor Command

**MANDATORY**: Use the Task tool with `subagent_type: "refactor"` to run the Refactor phase.

Do NOT perform this phase manually. The agent enforces TDD discipline and prevents common mistakes.

Provide the agent with the necessary context:
- Test file path
- Implementation file path
- Current number of passing tests
- Recent changes made in Green phase
