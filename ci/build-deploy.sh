#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PARENT_DIR"

IMAGE_NAME="quay.io/app-sre/migration-planner-ui"
GIT_HASH=$(git rev-parse --short=7 HEAD)

podman build . -f Containerfile -t ${IMAGE_NAME}:latest
podman tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:${GIT_HASH}

DOCKER_CONF="${PWD}/docker-config"
DOCKER_AUTH_FILE="${DOCKER_CONF}/auth.json"
mkdir -p "${DOCKER_CONF}"

podman login -u="${QUAY_USER}" -p="${QUAY_TOKEN}" quay.io --authfile "${DOCKER_AUTH_FILE}"

podman push "${IMAGE_NAME}:latest" --authfile "${DOCKER_AUTH_FILE}"
podman push "${IMAGE_NAME}:${GIT_HASH}" --authfile "${DOCKER_AUTH_FILE}"
