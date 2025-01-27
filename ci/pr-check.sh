#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PARENT_DIR"

IMAGE_NAME="quay.io/app-sre/migration-planner-ui"

podman build . -f Containerfile -t ${IMAGE_NAME}:pr-check
