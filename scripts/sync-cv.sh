#!/usr/bin/env bash
# Copy the latest built CV PDF from the local CV repo into this site's
# static/ folder so the /cv.pdf link serves the current version.
#
# Run after a fresh `latexmk -pdf` build (or pull) in ~/GitHub/Brain/CV.
#
#   ./scripts/sync-cv.sh
#
# Assumes ~/GitHub/Brain/CV/main.pdf exists.

set -euo pipefail

SRC="${HOME}/GitHub/Brain/CV/main.pdf"
DEST_DIR="$(cd "$(dirname "$0")/.." && pwd)/static"
DEST="${DEST_DIR}/cv.pdf"

if [[ ! -f "$SRC" ]]; then
  echo "✖ CV PDF not found at $SRC"
  echo "  Build the CV first: cd ~/GitHub/Brain/CV && latexmk -pdf main.tex"
  exit 1
fi

mkdir -p "$DEST_DIR"
cp "$SRC" "$DEST"
echo "✔ Copied $SRC → $DEST"
echo "  $(wc -c < "$DEST" | awk '{printf "%.1f KB", $1/1024}')"
