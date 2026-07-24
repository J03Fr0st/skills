#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"

cd "$REPO"
if [ ! -d skills ]; then
  exit 0
fi

find . -name SKILL.md -not -path '*/node_modules/*' | sed 's|^\./||' | sort
