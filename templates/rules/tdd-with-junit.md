# TDD with Kotlin and JUnit 5

## Test File Creation

1. **Create a test file** under `src/test/kotlin`
2. **Use the project package root**: `oli.bitsandbobs.stellarmerchant`
3. **Use JUnit 5 annotations and assertions** (`@Test`, `@Disabled`, `assertEquals`)
4. **Follow the TDD red-green-refactor cycle**
5. **Leverage Kotlin's compiler and type checking** during development

## Running Tests

Run `gradlew.bat test` on Windows or `./gradlew test` on Unix-like systems.

## Example Test Template

The test list comes from the feature specification. Do not add generic validation
or edge-case tests unless the specification calls for them.

```kotlin
package oli.bitsandbobs.stellarmerchant

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test

class SomeFeatureTest {
    @Disabled("TODO: implement first behaviour from the spec")
    @Test
    fun `first behaviour from the spec`() {
        assertEquals(expected, actual)
    }

    @Disabled("TODO: implement second behaviour from the spec")
    @Test
    fun `second behaviour from the spec`() {
        assertEquals(expected, actual)
    }
}
```
