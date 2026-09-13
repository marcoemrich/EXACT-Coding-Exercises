# Java + JUnit 5 + Maven profile

Load this profile together with the parent Predictive TDD skill when the project uses Java, JUnit 5, and Maven.

## Discover project commands first

Read `pom.xml` before the first cycle. Respect its Java release, dependencies, plugins, source layout, and existing test conventions. Use the Maven wrapper when the project provides one; otherwise use `mvn`.

Typical gates are:

```bash
mvn test
mvn pmd:check
```

Only run configured or available gates. Do not invent plugins or silently change the build merely to obtain a preferred check. For a focused test, use the narrowest Surefire invocation supported by the project, for example:

```bash
mvn -Dtest=FeatureTest#activeBehaviour test
```

Treat Java compilation and test execution as separate signals even when Maven performs both in one invocation. A failure in `testCompile` is not a behavioral assertion failure.

## Source and test layout

Follow the package and module layout already established by the project. In a conventional single-module Maven project:

- production code lives under `src/main/java/`
- tests live under `src/test/java/`
- `<Feature>Test.java` mirrors the package of the class under test

The default package is acceptable only when the exercise already uses it. Do not move existing code into packages as an unrelated cleanup.

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

Use JUnit 5 annotations and assertions. Keep every future behavior disabled; do not use commented-out tests or rely on test-name filters as the test list.

## Predictions with Maven and JUnit

Before each run, predict separately when relevant:

1. production compilation result
2. test compilation and symbol-resolution result
3. JUnit discovery and execution result
4. expected exception, assertion values, or failure message
5. tests run, failed, errored, and skipped

A missing class or method commonly fails in `testCompile` with `cannot find symbol`; do not call that an assertion failure. Add only enough scaffold to reach behavioral Red. When an exception is the intended observable behavior, use `assertThrows` and predict its type.

When a new example is already satisfied by an earlier generalization, predict green, activate it, run the focused test, and record that no production change was necessary.

## Java-oriented Green progression

Let the implementation emerge one active example at a time. Typical legal steps include:

1. a class and method signature sufficient to compile
2. an intentionally wrong result or exception sufficient to reach behavioral Red
3. a hardcoded return for the first Green
4. use of an input parameter
5. a narrow conditional
6. named domain constants or extracted methods when another example forces them
7. a general expression, collection operation, or polymorphic design only when demanded by active behavior
8. explicit validation only when required by the specification

Do not jump to a final abstraction because Java makes scaffolding visible. Keep domain names even when a parameter is temporarily unused. Do not add meaningless reads or branches to appease static analysis.

## PMD and quality checks

When PMD is configured, run the project's declared PMD goal and interpret its actual ruleset. A common check is:

```bash
mvn pmd:check
```

PMD findings are evidence for the Four Rules review, not permission to change observable behavior. Cognitive and cyclomatic complexity are measurements; inspect the configured thresholds before treating a report as a failing smell. Keep test-specific concessions scoped to tests, and do not weaken production rules globally for a temporary Green.

If Checkstyle, SpotBugs, formatter checks, or module-specific verification goals are configured instead of or alongside PMD, use those project-defined gates.

## Full cycle gate

Before closing a cycle, predict and run the complete test suite plus every applicable project-defined quality gate. Prefer the project's established order. A typical Maven project uses:

```bash
mvn test
mvn pmd:check
```

Do not chain uncertain checks while diagnosing a mismatch. Once each signal is understood, a project-provided aggregate such as `mvn verify` is acceptable. Record Maven's exact test counts and distinguish failures, errors, and skipped tests.
