# TDD Execution Mode

This workflow runs the TDD cycle as a sequence of Skill invocations
(`/test-list`, `/red`, `/green`) and one Task subagent (`refactor`, once per
cycle). Whether the cycle pauses for human approval
between phases is controlled by `@.claude/skills/tdd/human-in-the-loop.md` (the
Autonomy Level setting at the top of that file).

## Workflow Sequence

1. **Test List Phase** → Invoke `/test-list` skill (main context)
2. **For each test:**
   - **Red Phase** → Invoke `/red` skill (main context)
   - **Green Phase** → Invoke `/green` skill (main context)
   - **Refactor Phase** → Launch the `refactor` subagent via the Task tool
     (isolated context)
3. **Continue** until all tests are implemented and passing
4. At each phase boundary, consult
   `@.claude/skills/tdd/human-in-the-loop.md` to decide whether to stop or
   continue

## Subagent prompt contracts

The refactor phase runs in an isolated context with no memory of the
test-list, red, or green phases. What to pass it is specified in
`@.claude/skills/tdd/subagent-prompts.md`.

After a subagent returns, read its summary, then consult HITL before
proceeding to the next phase.

## Interactive by default

This workflow is meant to be run interactively and is free to pause at any
phase boundary. It expects a human on the other end: the Autonomy Level
decides where it stops, and the session simply ends once the last test
passes and its refactor checkpoint is done. There is no completion marker to write and no
requirement to finish the whole cycle in one uninterrupted turn.

If you are driving this workflow from an automation harness that needs a
mechanical completion signal, add that instruction in your own prompt — it is
deliberately not part of the workflow.
