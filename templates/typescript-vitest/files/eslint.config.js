import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

// Measurements and smells for the end-refactor pass. cognitive-complexity has
// threshold 0, so every branching function reports its score in the message
// text: those findings are measurements, not smells. Everything else is a smell.
export default [
  { ignores: ["**/*.spec.ts"] },
  tseslint.configs.base,
  {
    files: ["src/**/*.ts"],
    plugins: { sonarjs },
    rules: {
      "sonarjs/cognitive-complexity": ["warn", 0],
      complexity: "warn",
      "max-depth": "warn",
      "max-lines-per-function": "warn",
      "max-params": "warn",
      "sonarjs/no-duplicate-string": "warn",
      "sonarjs/no-collapsible-if": "warn",
      "sonarjs/no-nested-switch": "warn",
      "sonarjs/no-identical-functions": "warn",
    },
  },
];
