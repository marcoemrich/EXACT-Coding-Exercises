#!/usr/bin/env bash
set -euo pipefail

for tool in java mvn; do
  command -v "$tool" >/dev/null || {
    echo "Missing $tool. See templates/java-junit-maven/SETUP.md for prerequisites." >&2
    exit 1
  }
done

# Warm the local Maven repository before the workshop starts. A cold ~/.m2
# downloads JUnit, Surefire and PMD on first use, which is the slowest possible
# moment to discover a proxy or a blocked mirror.
mvn -q -B dependency:go-offline
