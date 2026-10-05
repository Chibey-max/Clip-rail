#!/usr/bin/env bash
# Copies ABIs from contracts/out into packages/abi/*.json (I-0.5, I-1.7). Run from anywhere.
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
dest="$here/../packages/abi"
cd "$here" && forge build --silent
for name in CampaignVault CreatorReputation MockUSDC; do
  jq '.abi' "out/$name.sol/$name.json" > "$dest/$name.json"
  echo "wrote packages/abi/$name.json"
done
