#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PARENT_DIR"

export MIGRATION_PLANNER_UI_IMAGE="${MIGRATION_PLANNER_UI_IMAGE:-quay.io/app-sre/migration-planner-ui}"
GIT_HASH=$(git rev-parse --short=7 HEAD)

podman build . -f Containerfile -t ${MIGRATION_PLANNER_UI_IMAGE}:latest
podman tag ${MIGRATION_PLANNER_UI_IMAGE}:latest ${MIGRATION_PLANNER_UI_IMAGE}:${GIT_HASH}

DOCKER_CONF="${PWD}/docker-config"
DOCKER_AUTH_FILE="${DOCKER_CONF}/auth.json"
mkdir -p "${DOCKER_CONF}"

podman login -u="${QUAY_USER}" -p="${QUAY_TOKEN}" quay.io --authfile "${DOCKER_AUTH_FILE}"

podman push "${MIGRATION_PLANNER_UI_IMAGE}:latest" --authfile "${DOCKER_AUTH_FILE}"
podman push "${MIGRATION_PLANNER_UI_IMAGE}:${GIT_HASH}" --authfile "${DOCKER_AUTH_FILE}"
