---
description: Refactor code using Simple Design Rules and Absolute Priority Premise
---

# Refactor Command

When this command is triggered, apply the following refactoring principles:

# Rules of Simple Design

## Description
Kent Beck's Four Rules of Simple Design - fundamental principles for writing clean, maintainable code. These rules are applied in priority order and work synergistically with TDD.

## The Four Rules (in priority order)

### 1. Tests Pass
- All tests must pass
- The code must work correctly
- This is the highest priority rule - never compromise working code
- If tests don't pass, fix them before applying other rules

### 2. Reveals Intent
- Code should clearly express what it does
- Use meaningful names for variables, functions, and classes
- Structure code to be self-documenting
- Prefer explicit over clever code
- Comments should explain "why", not "what"

### 3. No Duplication (DRY)
- Don't repeat yourself
- Extract common functionality into reusable components
- Look for both obvious duplication and conceptual duplication
- Knowledge should have a single, unambiguous representation

### 4. Fewest Elements
- Minimize the number of classes, methods, and other code elements
- Remove unnecessary abstractions
- Keep it simple - don't over-engineer
- Only add complexity when it serves a clear purpose

## Application Guidelines

### Priority Order
- Apply rules in order: 1 → 2 → 3 → 4
- Never violate a higher-priority rule to satisfy a lower-priority one
- If rule #3 conflicts with rule #2, choose clarity over DRY

### Integration with TDD
- **Red Phase**: Focus on rule #1 (make tests pass)
- **Green Phase**: Still focus on rule #1 (minimal working code)
- **Refactor Phase**: Apply rules #2, #3, #4 while preserving #1

## Examples

### Rule 2: Reveals Intent
```typescript
// Bad
function calc(w: string[]): boolean {
  return w.every((x, i) => i === 0 || diff(x, w[i-1]) === 1);
}

// Good
function isValidWordChain(words: string[]): boolean {
  return words.every((word, index) =>
    index === 0 || differsByOneLetter(word, words[index - 1])
  );
}
```

### Rule 3: No Duplication
```typescript
// Bad
function differsByOneLetter(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;
  let differences = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) differences++;
  }
  return differences === 1;
}

function isAdjacent(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++;
  }
  return diffs === 1;
}

// Good - Extract common logic
function countDifferences(word1: string, word2: string): number {
  if (word1.length !== word2.length) return Infinity;
  return word1.split('').reduce((count, char, i) =>
    char !== word2[i] ? count + 1 : count, 0
  );
}

function differsByOneLetter(word1: string, word2: string): boolean {
  return countDifferences(word1, word2) === 1;
}
```

### Rule 4: Fewest Elements
```typescript
// Bad - Unnecessary abstraction
class WordValidator {
  validate(word: string): boolean { return word.length > 0; }
}
class ChainValidator {
  private wordValidator = new WordValidator();
  validate(chain: string[]): boolean { /* ... */ }
}

// Good - Simple functions
function isValidWord(word: string): boolean {
  return word.length > 0;
}

function isValidChain(chain: string[]): boolean {
  return chain.every(isValidWord) &&
         chain.every((word, i) => i === 0 || differsByOneLetter(word, chain[i-1]));
}
```

## Red Flags
- Code that's hard to name (violates rule #2)
- Copy-paste programming (violates rule #3)
- Classes with single methods (may violate rule #4)
- Deep inheritance hierarchies (may violate rule #4)
- Premature abstractions (violates rule #4)

## Remember
- Simple ≠ Easy
- Simple means "not complex" or "not compound"
- These rules help achieve simplicity through disciplined practice

---

# Absolute Priority Premise (APP)

## Description
Micah Martin's Absolute Priority Premise - an improvement on the Transformation Priority Premise that provides objective heuristics to compare code quality by assigning mass values to code components.

## Core Concept
The APP assigns "mass" to different code components. Lower total mass indicates better, simpler code. The premise is that code with less mass is objectively better than code with more mass.

## The Six Components (with Mass Values)

### 1. Constant (Mass: 1)
- Literal values in code
- Examples: `5`, `"hello"`, `true`, `[]`
- Lowest mass - preferred building block

### 2. Binding/Scalar (Mass: 1)
- Variables, parameters, local names
- Examples: `amount`, `userName`, `result`
- Names that refer to values

### 3. Invocation (Mass: 2)
- Function/method calls
- Examples: `calculate()`, `user.getName()`, `Math.max(a, b)`
- Calling existing functionality

### 4. Conditional (Mass: 4)
- Control flow decisions
- Examples: `if`, `switch`, `case`, `cond`, `?:`
- Branching logic

### 5. Loop (Mass: 5)
- Iteration constructs
- Examples: `while`, `for`, `forEach`, `map`
- Repetitive execution

### 6. Assignment (Mass: 6)
- Mutating variables (highest mass)
- Examples: `x = 5`, `count++`, `list.add(item)`
- State changes - most complex

## Calculation Rules

### Total Mass = Sum of All Components
```
Total Mass = (constants × 1) + (bindings × 1) + (invocations × 2) +
             (conditionals × 4) + (loops × 5) + (assignments × 6)
```

### Comparison Guidelines
- **Lower mass = Better code**
- **Functional style naturally scores lower** (no assignments/loops)
- **Immutable approaches preferred** over mutable ones
- **Simple expressions preferred** over complex control structures

## Special Counting Rules

### Method Declarations
- A method/function counts as both:
  - **Constant (1)** for the code it represents
  - **Binding (1)** for its name

### Assignment Distinctions
- **Not every assignment counts as Assignment (6)**
- `final` fields and local variables are just **Bindings (1)**
- Only **re-assignments that modify values** count as Assignment (6)
- Local variable assignments may count as **Binding (1)** in some cases

### Class Definitions
- Class definition = **Constant (1)** for code + **Binding (1)** for name
- (Usually ignored in algorithm comparisons)

## Real-World Example: Word Wrap Kata

### Recursive Implementation (Mass: 53)
```java
final char BLANK = ' ';           // constant(1) + binding(1) = 2
final char NEWLINE = '\n';        // constant(1) + binding(1) = 2

String wrapRecursive(String line, int maxLineLen) {
    if (line.length() <= maxLineLen) {     // conditional(4) + invocation(2) + constant(1) = 7
        return line;                       // binding(1) = 1
    }

    int indexOfBlank = line.lastIndexOf(BLANK, maxLineLen);  // binding(1) + invocation(2) = 3
    int split;                             // binding(1) = 1
    int offset;                            // binding(1) = 1
    if (indexOfBlank > -1) {              // conditional(4) + binding(1) + constant(1) = 6
        split = indexOfBlank;              // binding(1) + binding(1) = 2
        offset = 1;                        // binding(1) + constant(1) = 2
    } else {
        split = maxLineLen;                // binding(1) + binding(1) = 2
        offset = 0;                        // binding(1) + constant(1) = 2
    }
    return line.substring(0, split) + NEWLINE  // invocation(2) + invocation(2) + ... = 8
         + wrap(line.substring(split + offset), maxLineLen);
}
```

**Component Count**:
- Constants: 7 × 1 = 7
- Bindings: 8 × 1 = 8
- Invocations: 10 × 2 = 20
- Conditionals: 2 × 4 = 8
- Loops: 0 × 5 = 0
- Assignments: 0 × 6 = 0

**Total Mass: 53**

### Algorithm Comparison Results
- **Recursive solution**: 53 (lowest mass)
- **Tail recursive**: 71
- **Loop version**: 68
- **Optimized loop**: 80
- **Buffer loop**: 105
- **Regular expression**: 69
- **Highly structured**: 167

## Integration with TDD and Simple Design

### With TDD Process
- **Red Phase**: Focus on passing tests (mass irrelevant)
- **Green Phase**: Write minimal code (naturally low mass)
- **Refactor Phase**: Apply APP to guide improvements toward lower mass

### With Simple Design Rules
1. **Tests Pass** (Rule #1) - Always highest priority
2. **Reveals Intent** (Rule #2) - May increase mass for clarity
3. **No Duplication** (Rule #3) - Extract to reduce mass
4. **Fewest Elements** (Rule #4) - Aligns with APP's low mass goal

### Priority Resolution
- **Simple Design Rule #2 trumps APP** - Clarity over low mass
- **Use APP within refactor phase** to guide toward simpler solutions
- **APP helps choose between equivalent clear solutions**

## Language Considerations
- **Functional languages** (Clojure, Haskell) naturally score lower
- **Imperative languages** (Java, C#) may need adjusted weights
- **Consider language idioms** when applying APP

## Guidelines for Use

### When to Apply APP
- **During refactoring** to choose between working solutions
- **When comparing algorithms** of similar functionality
- **To guide toward simpler implementations**
- **Not during initial TDD red/green phases**

### When NOT to Use APP
- **Never sacrifice clarity** for lower mass
- **Don't optimize prematurely** based on mass alone
- **Performance requirements** may override mass considerations
- **Domain complexity** may require higher mass solutions

### Red Flags
- **Obsessing over mass** during initial development
- **Sacrificing readability** for lower scores
- **Ignoring performance** implications
- **Applying rigidly** without context

## Important Caveats

### Limitations of APP
- **Not a direct indication of readability** - simpler code is better, but context matters
- **Ignores performance characteristics** - memory usage, runtime performance not considered
- **Validity unclear for general purpose code** - works best for algorithm comparisons
- **Four Rules of Simple Design encourage explaining variables** - clarity more important than fewer elements
- **Favors functional programming** - penalty on loops and assignments may not suit all contexts

### When APP May Not Apply
- **Algorithms with different performance characteristics** (Word Wrap example)
- **Domain complexity requirements** may require higher mass solutions
- **Memory usage vs. code simplicity** trade-offs
- **Team familiarity** with certain patterns may trump mass considerations

## Benefits
- **Objective measurement** of code complexity
- **Guides toward functional approaches**
- **Encourages immutability**
- **Complements other design principles**
- **Helps compare equivalent solutions**

## Remember
- APP is a **tool, not a rule**
- **Context matters** more than absolute scores
- **Combine with other principles** for best results
- **Lower mass is generally better**, but not always
- **Use during refactoring**, not initial development
- **The best set of specific mass values are unknown** - these are Micah's suggested weights

## Sources and References

### Primary Sources
- **Micah Martin's original work** (2012) - [Transformation Priority Premise Applied](mdc:https:/8thlight.com/insights/transformation-priority-premise-applied) - 8th Light blog post with Coin Changer Kata example
- **8th Light University presentations** - Part One and Part Two (referenced but links not currently accessible)

### Secondary Sources
- **Peter Kofler's detailed analysis** - [Absolute Priority Premise, an Example](mdc:https:/blog.code-cop.org/2016/08/absolute-priority-premise-example.html) - comprehensive explanation with Word Wrap kata examples and tool implementation

---

## How to Use This Command

When you trigger `/refactor`, the AI will:
1. Apply Kent Beck's Four Rules of Simple Design (in priority order)
2. Use Absolute Priority Premise (APP) to measure and guide code improvements
3. Focus on reducing code mass while maintaining clarity
4. Ensure all tests pass before and after refactoring
5. Document mass calculations and refactoring decisions

**Priority**: Simple Design Rule #2 (Reveals Intent) always trumps APP - clarity over low mass.

