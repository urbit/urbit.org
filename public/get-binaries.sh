#!/bin/sh
# Urbit cross-platform installer (macOS, Linux, Windows via sh environments)
# Intended usage:
#   curl -fsSL https://urbit.org/get-runtime.sh | sh
#
# Interactive modes:
#   1) Basic install (default) - installs for the detected host platform
#   2) Custom download - choose a download location and runtime target
#
# Optional env vars:
#   INSTALL_DIR=/custom/path
#   URBIT_URL_BASE=https://urbit.org/install
#   URBIT_INSTALL_MODE=basic|custom
#   TARGET_RUNTIME_SLUG=macos-aarch64|macos-x86_64|linux-aarch64|linux-x86_64|windows
#   DOWNLOAD_DIR=/custom/download/path

set -eu

INSTALL_DIR="${INSTALL_DIR:-$HOME/.local/bin}"
URBIT_URL_BASE="${URBIT_URL_BASE:-https://urbit.org/install}"
URBIT_INSTALL_MODE="${URBIT_INSTALL_MODE:-}"
TARGET_RUNTIME_SLUG="${TARGET_RUNTIME_SLUG:-}"
DOWNLOAD_DIR="${DOWNLOAD_DIR:-}"
START_DIR="$(pwd -P 2>/dev/null || pwd)"

log() { printf '%s\n' "$*"; }
err() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || err "Missing required command: $1"
}

need_cmd curl
need_cmd uname

TTY_AVAILABLE=0
if { exec 3<>/dev/tty; } 2>/dev/null; then
  TTY_AVAILABLE=1
fi

prompt() {
  message="$1"
  default_value="${2:-}"

  if [ "$TTY_AVAILABLE" -ne 1 ]; then
    printf '%s' "$default_value"
    return 0
  fi

  printf '%s' "$message" >&3
  if IFS= read -r response <&3; then
    if [ -n "$response" ]; then
      printf '%s' "$response"
    else
      printf '%s' "$default_value"
    fi
  else
    printf '%s' "$default_value"
  fi
}

normalize_runtime_slug() {
  case "$1" in
    1|macos-aarch64|darwin-aarch64|macos-arm64)
      printf '%s' "macos-aarch64"
      ;;
    2|macos-x86_64|darwin-x86_64|macos-amd64)
      printf '%s' "macos-x86_64"
      ;;
    3|linux-aarch64|linux-arm64)
      printf '%s' "linux-aarch64"
      ;;
    4|linux-x86_64|linux-amd64)
      printf '%s' "linux-x86_64"
      ;;
    5|windows|windows-x86_64|win64)
      printf '%s' "windows"
      ;;
    *)
      return 1
      ;;
  esac
}

runtime_url_for_slug() {
  slug="$1"
  if [ "$slug" = "windows" ]; then
    printf '%s' "${URBIT_URL_BASE}/windows/latest"
  else
    printf '%s' "${URBIT_URL_BASE}/${slug}/latest"
  fi
}

runtime_target_name() {
  slug="$1"
  if [ "$slug" = "windows" ]; then
    printf '%s' "urbit.exe"
  else
    printf '%s' "urbit"
  fi
}

OS="$(uname -s 2>/dev/null || echo unknown)"
ARCH="$(uname -m 2>/dev/null || echo unknown)"

case "$ARCH" in
  x86_64|amd64) ARCH_NORM="x86_64" ;;
  arm64|aarch64) ARCH_NORM="aarch64" ;;
  *) ARCH_NORM="$ARCH" ;;
esac

DETECTED_RUNTIME_SLUG=""

case "$OS" in
  Darwin)
    case "$ARCH_NORM" in
      aarch64) DETECTED_RUNTIME_SLUG="macos-aarch64" ;;
      x86_64) DETECTED_RUNTIME_SLUG="macos-x86_64" ;;
      *) err "Unsupported macOS architecture: $ARCH" ;;
    esac
    ;;
  Linux)
    case "$ARCH_NORM" in
      aarch64) DETECTED_RUNTIME_SLUG="linux-aarch64" ;;
      x86_64) DETECTED_RUNTIME_SLUG="linux-x86_64" ;;
      *) err "Unsupported Linux architecture: $ARCH" ;;
    esac
    ;;
  MINGW*|MSYS*|CYGWIN*)
    DETECTED_RUNTIME_SLUG="windows"
    ;;
  *)
    if [ "${WINDIR:-}" != "" ]; then
      DETECTED_RUNTIME_SLUG="windows"
    else
      err "Unsupported OS: $OS"
    fi
    ;;
esac

INSTALL_MODE="basic"
if [ -n "$URBIT_INSTALL_MODE" ]; then
  case "$URBIT_INSTALL_MODE" in
    basic|custom) INSTALL_MODE="$URBIT_INSTALL_MODE" ;;
    *) err "Invalid URBIT_INSTALL_MODE: $URBIT_INSTALL_MODE" ;;
  esac
elif [ "$TTY_AVAILABLE" -eq 1 ]; then
  log "Detected platform: OS=$OS ARCH=$ARCH"
  log ""
  log "Choose an option:"
  log "  1) Basic install (recommended)"
  log "  2) Custom download (choose location and architecture)"
  mode_choice="$(prompt 'Press Enter for basic install, or choose [1/2]: ' '1')"
  case "$mode_choice" in
    1|"") INSTALL_MODE="basic" ;;
    2) INSTALL_MODE="custom" ;;
    *)
      log "Unrecognized choice, using basic install."
      INSTALL_MODE="basic"
      ;;
  esac
fi

SELECTED_RUNTIME_SLUG="$DETECTED_RUNTIME_SLUG"
if [ "$INSTALL_MODE" = "custom" ]; then
  if [ -n "$TARGET_RUNTIME_SLUG" ]; then
    SELECTED_RUNTIME_SLUG="$(normalize_runtime_slug "$TARGET_RUNTIME_SLUG")" || \
      err "Unsupported TARGET_RUNTIME_SLUG: $TARGET_RUNTIME_SLUG"
  elif [ "$TTY_AVAILABLE" -eq 1 ]; then
    log ""
    log "Choose a runtime target:"
    log "  1) macOS (Apple Silicon) - macos-aarch64"
    log "  2) macOS (Intel)         - macos-x86_64"
    log "  3) Linux (ARM64)         - linux-aarch64"
    log "  4) Linux (x86_64)        - linux-x86_64"
    log "  5) Windows               - windows"
    target_choice="$(prompt "Press Enter for detected target (${DETECTED_RUNTIME_SLUG}), or choose [1-5]: " "$DETECTED_RUNTIME_SLUG")"
    SELECTED_RUNTIME_SLUG="$(normalize_runtime_slug "$target_choice")" || \
      err "Unsupported runtime target: $target_choice"
  fi
fi

TARGET_DIR="$INSTALL_DIR"
if [ "$INSTALL_MODE" = "custom" ]; then
  TARGET_DIR="${DOWNLOAD_DIR:-$START_DIR}"
  if [ -z "$DOWNLOAD_DIR" ] && [ "$TTY_AVAILABLE" -eq 1 ]; then
    log ""
    TARGET_DIR="$(prompt "Download directory [default: ${START_DIR}]: " "$START_DIR")"
  fi
fi

TARGET_NAME="$(runtime_target_name "$SELECTED_RUNTIME_SLUG")"
RUNTIME_URL="$(runtime_url_for_slug "$SELECTED_RUNTIME_SLUG")"

log "Detected platform: OS=$OS ARCH=$ARCH"
if [ "$INSTALL_MODE" = "basic" ]; then
  log "Using runtime URL: $RUNTIME_URL"
  log "Installing to: $TARGET_DIR"
else
  log "Selected runtime target: $SELECTED_RUNTIME_SLUG"
  log "Using runtime URL: $RUNTIME_URL"
  log "Downloading to: $TARGET_DIR"
fi

TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t urbit-install)"
cleanup() {
  rm -rf "$TMP_DIR"
  if [ "$TTY_AVAILABLE" -eq 1 ]; then
    exec 3>&-
    exec 3<&-
  fi
}
trap cleanup EXIT INT TERM

PAYLOAD="$TMP_DIR/urbit.pkg"
EXTRACT_DIR="$TMP_DIR/extract"
mkdir -p "$EXTRACT_DIR" "$TARGET_DIR"

log "Downloading runtime..."
curl -fL "$RUNTIME_URL" -o "$PAYLOAD"

extract_with_tar() {
  command -v tar >/dev/null 2>&1 || return 1
  tar -xzf "$PAYLOAD" -C "$EXTRACT_DIR" 2>/dev/null || return 1
  return 0
}

extract_with_unzip() {
  command -v unzip >/dev/null 2>&1 || return 1
  unzip -q "$PAYLOAD" -d "$EXTRACT_DIR" 2>/dev/null || return 1
  return 0
}

log "Preparing runtime payload..."
if extract_with_tar; then
  log "Detected tar.gz payload"
elif extract_with_unzip; then
  log "Detected zip payload"
else
  log "Payload is not a tar/zip archive; treating as direct executable"
  cp "$PAYLOAD" "$EXTRACT_DIR/$TARGET_NAME"
fi

URBIT_SRC=""
for candidate in \
  "$EXTRACT_DIR/$TARGET_NAME" \
  "$EXTRACT_DIR/urbit" \
  "$EXTRACT_DIR/urbit.exe" \
  "$EXTRACT_DIR"/vere* \
  "$EXTRACT_DIR"/vere*.exe \
  "$EXTRACT_DIR"/*/urbit \
  "$EXTRACT_DIR"/*/urbit.exe \
  "$EXTRACT_DIR"/*/vere* \
  "$EXTRACT_DIR"/*/vere*.exe
do
  if [ -f "$candidate" ]; then
    URBIT_SRC="$candidate"
    break
  fi
done

if [ -z "$URBIT_SRC" ]; then
  for candidate in "$EXTRACT_DIR"/* "$EXTRACT_DIR"/*/*; do
    if [ -f "$candidate" ] && [ -x "$candidate" ]; then
      URBIT_SRC="$candidate"
      break
    fi
  done
fi

[ -n "$URBIT_SRC" ] || err "Could not find urbit executable in downloaded payload"

TARGET="$TARGET_DIR/$TARGET_NAME"
cp "$URBIT_SRC" "$TARGET"
chmod +x "$TARGET" 2>/dev/null || true

if [ "$INSTALL_MODE" = "basic" ]; then
  log "Installed runtime to: $TARGET"

  case ":$PATH:" in
    *":$TARGET_DIR:"*) IN_PATH=1 ;;
    *) IN_PATH=0 ;;
  esac

  if [ "$IN_PATH" -ne 1 ]; then
    log ""
    log "NOTE: $TARGET_DIR is not currently on your PATH."
    log "Add this to your shell profile (~/.profile, ~/.bashrc, or ~/.zshrc):"
    log "  export PATH=\"$TARGET_DIR:\$PATH\""
  fi
else
  log "Downloaded runtime to: $TARGET"
fi

log ""
log "Done. Verify install with:"
if [ "$INSTALL_MODE" = "basic" ] && [ "$TARGET_NAME" = "urbit" ]; then
  log "  urbit --version"
else
  log "  \"$TARGET\" --version"
fi
