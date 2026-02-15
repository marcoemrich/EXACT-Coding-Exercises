#!/bin/bash
# Exports Claude Code env vars from ~/.claude/settings.json into the shell profile.
# Supports both Portkey proxy setup (env block in settings.json) and direct API key.

SETTINGS="$HOME/.claude/settings.json"
PROFILE="$HOME/.bashrc"

if [[ -f "$SETTINGS" ]] && command -v jq &>/dev/null; then
    # Extract env vars from settings.json if present
    env_keys=$(jq -r '.env // {} | keys[]' "$SETTINGS" 2>/dev/null)
    if [[ -n "$env_keys" ]]; then
        echo "# Claude Code env vars (from settings.json)" >> "$PROFILE"
        while IFS= read -r key; do
            value=$(jq -r ".env[\"$key\"]" "$SETTINGS")
            echo "export $key=\"$value\"" >> "$PROFILE"
        done <<< "$env_keys"
        echo "Claude Code env vars exported from settings.json"
    fi
fi
