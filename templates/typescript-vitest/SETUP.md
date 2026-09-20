# TypeScript + Vitest

## Prerequisites

- Node.js v20 or higher (`node --version`)
- npm

## Install

```bash
./setup.sh typescript-vitest
```

Dependencies are installed with `npm ci` from the committed `package-lock.json`,
so every participant gets byte-identical versions.

## Commands

| Purpose | Command |
|---|---|
| Run the suite | `npm test` |
| Watch mode | `npm run test:watch` |
| Lint and smell report | `npm run lint` |

## Expected output

`./setup.sh` ends with the example test:

```
 ✓ src/example.spec.ts (1 test)

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

Once you have worked through exercises you will see more files and tests than
this. What matters is that everything passes.

## Notes for the workflow

- Test files use the `.spec.ts` suffix; `vitest.config.ts` only picks up
  `src/**/*.spec.ts`.
- Inactive test-list entries are `it.todo()`.
- `eslint.config.js` carries the measurements and smells for the end-refactor
  pass. `sonarjs/cognitive-complexity` is set to threshold 0 on purpose: every
  branching function reports its score in the message text, so those findings
  are measurements, not smells.
