#!/usr/bin/env bash
set -euo pipefail

for tool in node npm; do
  command -v "$tool" >/dev/null || {
    echo "Missing $tool. See templates/typescript-vitest/SETUP.md for prerequisites." >&2
    exit 1
  }
done

npm ci
