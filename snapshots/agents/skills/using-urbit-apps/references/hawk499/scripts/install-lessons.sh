#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -n "${HAWK499_CODE:-}" ]]; then
  python "$SCRIPT_DIR/hawk499_http.py" \
    --ship-url "${SHIP_URL:-http://localhost:8080}" \
    --cookie-jar "${COOKIE_JAR:-/tmp/hawk499.cookies}" \
    login \
    --code "$HAWK499_CODE"
fi

python "$SCRIPT_DIR/hawk499_http.py" \
  --ship-url "${SHIP_URL:-http://localhost:8080}" \
  --cookie-jar "${COOKIE_JAR:-/tmp/hawk499.cookies}" \
  install-all \
  --namespace "${HAWK499_LESSON_NAMESPACE:-/learn}"
