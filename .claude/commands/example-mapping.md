---
description: Conduct an Example Mapping session to explore a feature before TDD - discover rules, examples, and open questions collaboratively
---

# Example Mapping Command

When this command is triggered, conduct an interactive Example Mapping session with the user.

## What is Example Mapping?

Example Mapping (by Matt Wynne) is a collaborative technique to explore a feature BEFORE implementation. It uses four categories of cards to structure the discovery:

- **Story (yellow)**: The feature or user story being explored
- **Rules (blue)**: Business rules and acceptance criteria discovered during discussion
- **Examples (green)**: Concrete examples that illustrate a rule - these become tests later
- **Questions (red)**: Open questions and uncertainties that need clarification

## Why Example Mapping Before TDD?

Example Mapping is the **bridge between requirements and test lists**:
1. **Example Mapping** discovers rules and concrete examples through conversation
2. **Test List** (`/test-list`) converts those examples into `it.todo()` test cases
3. **Red-Green-Refactor** implements them one by one

Without Example Mapping, developers often:
- Miss important business rules
- Start coding before understanding the domain
- Write tests for the wrong things
- Discover edge cases too late

## How to Conduct the Session

### CRITICAL: You are a FACILITATOR, not an inventor

You do NOT know the domain. The user does. Your job is to ASK, not to assume.

- **NEVER invent a rule** - Ask the user what the rules are
- **NEVER invent an example** - Ask the user for concrete examples
- **NEVER assume boundary behavior** - Ask what happens at the edges
- **NEVER fill in gaps yourself** - If something is unclear, create a red card (question) and ASK the user

If the user provides partial information (e.g., a card image, a brief description), you MUST ask follow-up questions to fill in the gaps. Do NOT silently fill them in with assumptions.

### Step 1: Identify the Story
- Ask the user: What feature or behavior are we exploring?
- Write a concise user story in "As a... I want... so that..." format
- If the user provides a card, image, or description, use that as the starting point
- **Ask the user to confirm** the story before proceeding

### Step 2: Discover Rules (INTERACTIVE)
- **Do NOT list rules yourself** - Ask the user to explain the rules
- Start with open questions:
  - "What are the business rules for this feature?"
  - "How does the scoring/calculation/behavior work?"
- Then probe deeper with targeted questions:
  - "What happens when the input is empty/zero?"
  - "Are there any limits, caps, or constraints?"
  - "Are there special cases or thresholds?"
  - "Does this feature interact with anything else?"
- **Use AskUserQuestion** to present specific options when you need clarification
- Each distinct rule gets its own blue card
- **Confirm each rule with the user** before recording it

### Step 3: Find Examples for Each Rule (INTERACTIVE)
- For each rule, **ask the user** for concrete examples with specific values
- Do NOT generate example values yourself - ask:
  - "Can you give me a concrete example with specific numbers/values?"
  - "What would the input and expected output look like?"
  - "What about the boundary - what happens at the edge of this rule?"
- If the user gives vague examples, ask for specifics:
  - "You said 'a few cards give points' - how many exactly? How many points?"
- Examples should be testable: given X, expect Y
- Include both positive examples (rule applies) and boundary examples

### Step 4: Track and Resolve Questions (INTERACTIVE)
- When something is unclear, **immediately** create a red card (question)
- **Do NOT continue past an unclear point** - stop and ask
- Use AskUserQuestion to resolve questions in real time
- Present options when possible to make it easy for the user to answer
- Move resolved questions to rules/examples
- Keep unresolved questions visible in the final output
- **If the user cannot answer a question**, keep it as a red card - do NOT guess the answer

### Step 5: Review with the User
Before writing the file:
- **Present a summary** of all discovered rules, examples, and open questions to the user
- **Ask the user**: "Is this complete? Did I miss anything?"
- **Only then** write the output file

### Step 6: Evaluate the Map
After the session, evaluate:
- **Too many red cards** -> Feature not understood well enough, needs more discussion
- **Too many blue cards** -> Feature is too large, consider splitting
- **Few cards overall** -> Feature is well understood, ready for implementation
- **Good balance** -> Proceed to test list creation

## Asking Clarifying Questions

**This is the CORE of Example Mapping.** The entire value of Example Mapping comes from the conversation. An Example Mapping where the AI fills in all the answers itself is WORTHLESS.

### Mandatory Questions
You MUST ask the user at least these categories of questions:
1. **Zero/empty case**: "What happens when there are no items / the input is empty?"
2. **Boundaries**: "Is there a maximum? What happens beyond it?"
3. **Special cases**: "Are there any special thresholds, bonuses, or exceptions?"
4. **Interactions**: "Does this feature interact with or depend on other features?"

### How to Ask
- Use the **AskUserQuestion tool** for structured questions with options
- Use **plain text questions** for open-ended exploration
- **Batch related questions** (up to 4) in a single AskUserQuestion call
- **Never proceed to writing the file** until all critical questions are answered or explicitly marked as open

## Output Format

Write the result to a markdown file at the location the user specifies (or default to `src/<feature-name>-example-mapping.md`).

Use this structure:

```markdown
# Example Mapping: <Feature Name>

## Story (gelb)

<User story or feature description>

## Rules (blau)

### Regel 1: <Rule Name>
<Description of the rule>

### Regel 2: <Rule Name>
<Description of the rule>

## Examples (gruen)

### Zu Regel 1: <Rule Name>
- <Input> -> <Expected Output>
- <Input> -> <Expected Output>

### Zu Regel 2: <Rule Name>
- <Input> -> <Expected Output>
- <Input> -> <Expected Output>

## Questions (rot)

- <Open question 1>
- <Open question 2>
(or: "Keine offenen Fragen - alle Unklarheiten wurden geklaert.")
```

## Health Indicators

After writing the file, report the health of the Example Mapping:

| Indicator | Status | Meaning |
|-----------|--------|---------|
| Red cards (Questions) | Many -> Not ready | Feature needs more clarification |
| Blue cards (Rules) | Many (>6) -> Too big | Consider splitting the feature |
| Green cards (Examples) | Few -> Thin coverage | Need more concrete examples |
| Overall | Balanced -> Ready | Proceed to `/test-list` |

## Next Step

After completing the Example Mapping, suggest:
- If healthy: "Example Mapping complete. Use `/test-list` to convert examples into TDD test cases."
- If too many questions: "There are still open questions. Resolve them before proceeding."
- If too large: "Consider splitting this feature into smaller stories."

## Important Rules

- **NEVER assume, ALWAYS ask** - Every rule and example MUST come from the user, not from you
- **When in doubt, ask** - If you are even slightly unsure about a rule or behavior, ask. Do NOT guess.
- **No silent gap-filling** - If information is missing, ask for it. Do NOT fill it in yourself.
- **Use concrete values** - "3 Zombies -> 9 Punkte" not "some zombies -> some points"
- **Keep it focused** - One feature per session
- **Track everything** - Every rule, example, and question gets recorded
- **Timebox mentally** - If the session drags on, the feature might be too large
- **Language**: Follow the user's language (German/English)

## Anti-Patterns to Avoid

- **Inventing rules**: "I assume the score caps at 6" -> WRONG. Ask: "Is there a cap?"
- **Guessing examples**: "For 3 cards you probably get 9 points" -> WRONG. Ask: "How many points for 3 cards?"
- **Skipping questions**: Seeing ambiguity but not asking about it -> WRONG. Always create a red card and ask.
- **Proceeding without confirmation**: Writing the file without the user reviewing the summary -> WRONG. Always confirm first.
