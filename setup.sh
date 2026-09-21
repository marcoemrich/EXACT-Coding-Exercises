#!/usr/bin/env bash
# Set up the exercise project for one language stack.
#
# The repository ships without a project skeleton so that every harness branch
# stays language-neutral. This script copies one skeleton from templates/ into
# the repository root, installs its dependencies and runs the example test.
set -euo pipefail

cd "$(dirname "$0")"
TEMPLATES="$PWD/templates"

available() {
  find "$TEMPLATES" -mindepth 1 -maxdepth 1 -type d -printf '  %f\n' | sort
}

STACK="${1:-}"
if [ -z "$STACK" ] || [ ! -d "$TEMPLATES/$STACK" ]; then
  {
    echo "usage: ./setup.sh <stack>"
    echo
    echo "available stacks:"
    available
  } >&2
  exit 64
fi

if [ -e package.json ] || [ -e pom.xml ] || [ -e pyproject.toml ]; then
  {
    echo "This directory already has a project set up."
    echo "Running setup again would overwrite your work. Use a fresh clone instead."
  } >&2
  exit 1
fi

echo "==> installing $STACK"
cp -R "$TEMPLATES/$STACK/files/." .
"$TEMPLATES/$STACK/install.sh"

echo "==> verifying"
"$TEMPLATES/$STACK/verify.sh"

echo
echo "Setup complete. See templates/$STACK/SETUP.md for what to expect."
