# TDD with Java and JUnit 5

## Test File Creation

1. **Create a test file** under `src/test/java`, named `<Feature>Test.java`
2. **Mirror the package** of the class under test (default package is fine for exercises)
3. **Use JUnit 5 annotations and assertions** (`@Test`, `@Disabled`, `assertEquals`)
4. **Follow the TDD red-green-refactor cycle**
5. **Leverage Java's compiler and type checking** during development

## Running Tests

Run `mvn test`.

## Example Test Template

The test list comes from the feature specification. Do not add generic validation
or edge-case tests unless the specification calls for them.

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

class SomeFeatureTest {
    @Disabled("TODO: implement first behaviour from the spec")
    @Test
    void firstBehaviourFromTheSpec() {
        assertEquals(expected, actual);
    }

    @Disabled("TODO: implement second behaviour from the spec")
    @Test
    void secondBehaviourFromTheSpec() {
        assertEquals(expected, actual);
    }
}
```
