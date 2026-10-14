#!/usr/bin/env bash
set -euo pipefail
bun run check
actionlint
git diff --check
bun run build
SANITY_STUDIO_PROJECT_ID=demo1234 SANITY_STUDIO_DATASET=production bun run studio:build
bun run test
