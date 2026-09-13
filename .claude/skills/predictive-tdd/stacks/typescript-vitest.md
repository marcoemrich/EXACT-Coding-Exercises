# TypeScript + Vitest profile

Load this profile together with the parent Predictive TDD skill when the project uses TypeScript and Vitest.

## Discover project commands first

Prefer scripts already declared in `package.json`. Read that file once before the first cycle and use only the scripts it actually declares. Typical gates are:

```bash
pnpm test
pnpm run typecheck
pnpm run lint
```

Not every project declares all three. `pnpm test` is the one gate that always applies. Where a gate has no script but the tool is installed, invoke it directly (for example `pnpm exec tsc --noEmit` or `pnpm exec eslint src/`); where the tool is absent, skip the gate rather than inventing an invocation.

Use the project's package manager rather than assuming one. For a focused test, use the narrowest supported Vitest invocation before running the complete suite.

Never hide dependency incompatibilities with `--force` or `--legacy-peer-deps`. Check declared peer ranges and select mutually supported versions. Record any deliberate downgrade or pin.

## Test-list convention

Represent future examples with `it.todo()` and activate exactly one per cycle:

```typescript
import { describe, expect, it } from "vitest";
import { behavior } from "./behavior.js";

describe("behavior", () => {
  it("handles the active example", () => {
    expect(behavior(0)).toBe(0);
  });

  it.todo("handles the next example");
});
```

Use the import extension and module conventions already established by the project.

For the up-front Test List phase, create the complete file with inactive entries only:

```typescript
import { describe, it, expect } from "vitest";
import { functionName } from "./implementation.js";

describe("Feature Name", () => {
  it.todo("should [behavior] -- [expected value from spec]");
  it.todo("throws RangeError when [invalid condition from spec]");
  it.todo("should [next behavior] -- [expected value from spec]");
  // ... ordered simple -> complex, covering ALL spec examples
});
```

Use `.spec.ts` for the test-file suffix and report `[filename].spec.ts` in the Test List summary. `RangeError` is a representative TypeScript observable error type, not a default contract: require it only when the specification establishes that error behavior or after explicitly stating why it is the most defensible reading.

## Predictions with Vitest

Before each run, predict separately when relevant:

1. module resolution or transform result
2. runtime assertion result
3. expected and received values
4. test-file and test counts
5. remaining todo count

A missing implementation module may fail during import before Vitest discovers tests. Do not call that an assertion failure.

When a new example is already satisfied by an earlier generalization, predict green, activate it, run Vitest, and record that no production change was necessary.

## TypeScript checks

Run the configured TypeScript check after behavior reaches green and after refactoring. A common script is:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

When no such script is declared but TypeScript is installed, run `pnpm exec tsc --noEmit` directly.

Treat transpilation by the test runner and static type checking as separate signals: passing tests do not prove that the compiler accepts the project.

Keep domain parameter names even during hardcoded Green steps. Do not rename a parameter to an underscore-prefixed technical name merely because the current minimal implementation does not use it.

When a hardcoded Green leaves a required domain parameter temporarily unused, respect the project's actual lint configuration:

- Prefer a narrow, documented suppression of the specific unused-parameter rule on that declaration.
- Remove the suppression as soon as a later behavior causes the implementation to use the parameter.
- Do not add meaningless calculations, branches, calls, or `void` expressions merely to satisfy the linter; they obscure intent and may conflict with other quality rules such as `sonarjs/void-use`.
- Do not weaken the unused-parameter policy globally for a temporary TDD state.

## ESLint and smell detection

For strict TypeScript analysis, prefer flat configuration with type-aware rules. A strict baseline commonly combines:

- core recommended correctness rules
- TypeScript strict type-checked rules
- TypeScript stylistic type-checked rules
- focused smell-detection rules
- test-specific rules for spec files

A preset named `strict` does not necessarily enable rules such as magic-number detection, complexity limits, or project-specific smells. Enable desired policies explicitly.

Allow concrete literals in test examples when they express specification input and output, while requiring named domain constants in production code where literals otherwise duplicate knowledge.

Keep test-specific overrides scoped to spec files. Do not weaken production rules globally to accommodate tests.

Typed lint rules require a TypeScript version supported by the parser and plugin. Verify peer dependency ranges before installation.

Strict template-expression rules may reject direct interpolation of numeric values. Predict the lint result, run it, and use an explicit conversion when the project policy requires one.

## TypeScript-oriented Green progression

Let implementations emerge one active example at a time. Typical legal steps include:

1. hardcoded return
2. use of an input parameter
3. narrow conditional
4. named domain constants
5. a general expression or recursive relation when forced by another example
6. explicit boundary validation when required by the specification

Do not jump to the final formula merely because TypeScript makes it easy to express. If a previous step naturally generalizes and a later test starts green, verify that fact instead of manufacturing a failure.

## Full cycle gate

Before closing a cycle, predict and then run every gate this project actually provides, in project-defined order:

```bash
pnpm run lint      # or: pnpm exec eslint src/
pnpm test
pnpm run typecheck # or: pnpm exec tsc --noEmit
```

Do not chain them while diagnosing a new or uncertain failure if chaining would hide later signals. Once each gate is understood, a chained final verification is acceptable.

Record exact counts from Vitest and distinguish failed, passed, skipped, and todo tests.
