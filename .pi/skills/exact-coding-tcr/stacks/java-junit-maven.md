# Java + JUnit 5 + Maven profile

Load this profile together with the parent EXACT Coding TCR skill when the project uses Java, JUnit 5, and Maven.

## Discover project commands first

Read `pom.xml` before the first cycle. Respect its Java release, dependencies, plugins, source layout, and existing test conventions. Use the Maven wrapper when present; otherwise use `mvn`.

Typical gates are:

```bash
mvn test
mvn pmd:check
```

Only run configured or available gates. Do not invent plugins or silently change the build to obtain a preferred check. Use `mvn test` as the full-suite command unless the project defines another command used by CI.

## Source and test layout

Follow the package and module layout already established by the project. In a conventional single-module Maven project:

- production code lives under `src/main/java/`
- tests live under `src/test/java/`
- `<Feature>Test.java` mirrors the package of the class under test

Use the default package only when the project already does. Do not move existing code into packages as unrelated cleanup.

## Test-list convention

Represent future examples as JUnit 5 tests annotated with `@Disabled`. Activate exactly one behavior per cycle by removing `@Disabled` from that test.

For the up-front Test List phase, create the complete test file with inactive entries only:

```java
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

class FeatureTest {
    @Disabled("TODO: expected result from the specification")
    @Test
    void handlesTheFirstBehaviour() {
        // Add the observation when this behavior enters Red.
    }

    @Disabled("TODO: next expected result from the specification")
    @Test
    void handlesTheNextBehaviour() {
        // Add the observation when this behavior enters Red.
    }
}
```

Use JUnit 5 annotations and assertions. Keep every future behavior disabled; do not use commented-out tests or test-name filters as the test list.

## Interpret RED correctly

Inspect Maven's actual result before committing or reverting:

1. distinguish production compilation from `testCompile`
2. distinguish symbol-resolution errors from JUnit assertion failures
3. inspect expected exceptions, expected and actual values, and failure messages
4. record tests run, failed, errored, and skipped

A missing class or method commonly fails in `testCompile` with `cannot find symbol`; do not call that an assertion failure. It is a valid RED only when it is the intended failure for the current baby step. Otherwise revert and choose a smaller or corrected step.

When an exception is the specified observable behavior, use `assertThrows` and verify its type. When an activated example is already satisfied by an earlier generalization, follow the already-green exception in the parent skill and commit it as `[GREEN]` after the full suite passes.

## Java-oriented GREEN progression

Let the implementation emerge one active example at a time. Typical small steps include:

1. a class and method signature sufficient to compile
2. an intentionally wrong result or exception sufficient to reach behavioral RED
3. a hardcoded return for the first GREEN
4. use of an input parameter
5. a narrow conditional
6. named domain constants or extracted methods when another example forces them
7. a general expression, collection operation, or polymorphic design only when demanded by active behavior
8. explicit validation only when required by the specification

Do not jump to a final abstraction because Java makes scaffolding visible. Keep domain names even when a parameter is temporarily unused. Do not add meaningless reads or branches to appease static analysis.

## PMD and quality checks

When PMD is configured, use the project's declared PMD goal, commonly:

```bash
mvn pmd:check
```

PMD findings are evidence for the Four Rules review, not permission to change observable behavior. Inspect configured complexity thresholds before treating a report as a failing smell. Keep test-specific concessions scoped to tests and do not weaken production rules globally for a temporary GREEN.

Use configured Checkstyle, SpotBugs, formatter, or module-specific verification goals where applicable.

## TCR phase gate

For every phase, stage all changes before checking them:

```bash
git add -A
mvn test
```

- **RED:** commit only when the suite fails for the intended reason; otherwise `git reset --hard HEAD`.
- **GREEN:** commit only when the complete suite passes; otherwise reset.
- **REFACTOR:** run the complete suite and applicable quality gates; commit only when all pass, otherwise reset.

Before completion, run every applicable project-defined quality gate in the established order. Record Maven's exact test counts and distinguish failures, errors, and skipped tests.
