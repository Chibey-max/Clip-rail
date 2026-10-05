#!/usr/bin/env bash
# Runs the oracle every 60 s from a laptop or VM (live demos, or when GitHub's schedule runs late).
# Usage: cre/scripts/oracle-loop.sh [testnet|mainnet]   (needs cre/.env, the CRE CLI and bun)
set -uo pipefail
target="${1:-testnet}"
cd "$(dirname "$0")/.."
while true; do
  echo "== $(date -u +%FT%TZ) oracle $target"
  cre workflow simulate oracle --target "$target" --broadcast --non-interactive --trigger-index 0 \
    || echo "run failed; retrying next tick"
  sleep 60
done
