#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scrub_frames.sh extract exhibition.mp4
#   ./scrub_frames.sh extract exhibition.mp4 12
#   ./scrub_frames.sh rebuild exhibition
#   ./scrub_frames.sh sheet exhibition.mp4

MODE="${1:-}"
INPUT="${2:-}"
FPS="${3:-24}"

if [ -z "$MODE" ] || [ -z "$INPUT" ]; then
  echo "Usage:"
  echo "  $0 extract <video.mp4> [fps]"
  echo "  $0 sheet <video.mp4> [fps]"
  echo "  $0 rebuild <name-without-.mp4> [fps]"
  exit 1
fi

BASE="$(basename "$INPUT")"
NAME="${BASE%.*}"
FRAMES_DIR="frames/$NAME"

case "$MODE" in
extract)
  mkdir -p "$FRAMES_DIR"

  echo "Extracting frames from $INPUT..."
  echo "FPS: $FPS"
  echo "Output: $FRAMES_DIR/frame_0001.png etc."

  ffmpeg -y -i "$INPUT" -vf "fps=$FPS" "$FRAMES_DIR/frame_%04d.png"

  echo "Done."
  ;;

sheet)
  echo "Creating contact sheet for $INPUT..."
  echo "FPS: $FPS"

  ffmpeg -y -i "$INPUT" \
    -vf "fps=$FPS,scale=320:-1,tile=5x6" \
    "${NAME}_contact_sheet.png"

  echo "Created: ${NAME}_contact_sheet.png"
  ;;

rebuild)
  NAME="$INPUT"
  FRAMES_DIR="frames/$NAME"

  if [ ! -d "$FRAMES_DIR" ]; then
    echo "Frames folder not found: $FRAMES_DIR"
    exit 1
  fi

  echo "Rebuilding video from $FRAMES_DIR..."
  echo "FPS: $FPS"

  ffmpeg -y -framerate "$FPS" \
    -i "$FRAMES_DIR/frame_%04d.png" \
    -c:v libx264 \
    -pix_fmt yuv420p \
    "${NAME}_rebuilt.mp4"

  echo "Created: ${NAME}_rebuilt.mp4"
  ;;

*)
  echo "Unknown mode: $MODE"
  echo "Use: extract, sheet, or rebuild"
  exit 1
  ;;
esac
