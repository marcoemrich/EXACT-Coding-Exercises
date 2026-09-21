# Python + pytest

## Prerequisites

- Python 3.11 or higher (`python3 --version`)
- The `venv` module (`python3 -m venv --help`)

On Debian and Ubuntu the standard library's `venv` lives in a separate package,
so a stock `python3` fails with `ensurepip is not available`. Install it
explicitly:

```bash
sudo apt install python3-venv
```

On macOS the python.org installer and Homebrew's `python@3.12` both include it.

## Install

```bash
./setup.sh python-pytest
```

Setup creates a `.venv/` in the repository root and installs the pinned
versions from `requirements.txt`, so every participant gets identical tools.
Activate it once per shell:

```bash
source .venv/bin/activate
```

Without activation, prefix the commands below with `.venv/bin/`.

## Commands

| Purpose | Command |
|---|---|
| Run the suite | `pytest` |
| Single test file | `pytest tests/test_example.py` |
| Lint and smell report | `ruff check src/` |
| Cognitive complexity report | `complexipy src/` |

Your IDE's test runner works as well (PyCharm, or VS Code with the Python
extension). Point it at the `.venv` interpreter.

## Expected output

`./setup.sh` ends with the example test:

```
tests/test_example.py .                                                  [100%]

============================== 1 passed in 0.01s ===============================
```

Once you have worked through exercises you will see more tests than this. What
matters is that the suite passes and no test fails.

## Notes for the workflow

- Sources live in `src/`, tests in `tests/`, test files are named
  `test_*.py`. `pyproject.toml` sets `pythonpath = ["src"]`, so a test imports
  production code by module name with no package prefix.
- Inactive test-list entries are `@pytest.mark.skip`.
- `pyproject.toml` carries the measurements and smells for the end-refactor
  pass. `ruff` reports the smells; `complexipy` reports cognitive complexity per
  function, so those scores are measurements, not smells.
- Ruff reports, it does not gate the suite. The refactor decision stays with you
  and the agent.
