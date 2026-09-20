# Java + JUnit + Maven

Contributed by Oliver Roth.

## Prerequisites

- JDK 17 or higher (`java --version`)
- Maven 3.9 or higher (`mvn --version`)

## Install

```bash
./setup.sh java-junit-maven
```

Setup runs `mvn dependency:go-offline` first. That warms your local `~/.m2`
repository while you still have time to fix a proxy or a blocked mirror —
doing it for the first time during the workshop is the slow path.

## Commands

| Purpose | Command |
|---|---|
| Run the suite | `mvn test` |
| Single test class | `mvn test -Dtest=ExampleTest` |
| Lint and smell report | `mvn pmd:check` |

Your IDE's test runner works as well (IntelliJ IDEA, or VS Code with the
Java extensions).

## Expected output

`./setup.sh` ends with the example test:

```
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

Once you have worked through exercises you will see more tests than this. What
matters is that the build succeeds and no test fails.

## Notes for the workflow

- Sources live in `src/main/java/`, tests in `src/test/java/`, test classes are
  named `<Feature>Test.java`.
- Inactive test-list entries are `@Disabled`.
- `pmd-ruleset.xml` carries the measurements and smells for the end-refactor
  pass. `CognitiveComplexity` uses `reportLevel=1` on purpose: every branching
  method reports its score in the message text, so those findings are
  measurements, not smells.
- `failOnViolation` is false — PMD reports, it does not gate the build. The
  refactor decision stays with you and the agent.
