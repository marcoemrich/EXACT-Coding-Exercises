# Subagent Prompt Contracts

The refactor subagent runs in an **isolated context**. It has no memory of
the test-list, red, or green phases. Everything it needs must be in the
prompt.

This file defines what to pass. It is workflow methodology, not lab
infrastructure — it stays when the workflow is exported.

## Workflow Sequence

1. **Test List Phase** → Read `.pi/skills/test-list/SKILL.md` (main context)
2. **For each test:**
   - **Red Phase** → Read `.pi/skills/red/SKILL.md` (main context)
   - **Green Phase** → Read `.pi/skills/green/SKILL.md` (main context)
   - **Refactor Phase** → Launch the `refactor` subagent via the `subagent` tool with `agent: "refactor"`, `agentScope: "both"` (isolated context)
3. **Continue** until all tests are implemented and passing

## Required Prompt Context for the Refactor Subagent (per cycle)

```
Test file: [path]
Implementation file: [path]
Passing tests: [count]
Recent changes: [one-line summary of the Green phase]
```

After the subagent returns, read its summary and proceed directly to the
next Red phase.
