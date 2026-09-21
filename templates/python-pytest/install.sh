#!/usr/bin/env bash
set -euo pipefail

for tool in python3; do
  command -v "$tool" >/dev/null || {
    echo "Missing $tool. See templates/python-pytest/SETUP.md for prerequisites." >&2
    exit 1
  }
done

# `python3 -m venv` needs the standard library's ensurepip, which Debian and
# Ubuntu split into a separate package. Check before creating the environment
# so the failure names the missing package instead of a stack trace.
python3 -c 'import ensurepip' 2>/dev/null || {
  echo "python3 -m venv is unavailable (ensurepip missing)." >&2
  echo "On Debian and Ubuntu: sudo apt install python3-venv" >&2
  echo "See templates/python-pytest/SETUP.md for prerequisites." >&2
  exit 1
}

python3 -m venv .venv
./.venv/bin/pip install --quiet --upgrade pip
./.venv/bin/pip install --quiet -r requirements.txt
