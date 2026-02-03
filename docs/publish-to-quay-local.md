# Publish OCI image to Quay.io (local test)

This document explains how to locally reproduce the CI workflow steps to:
- build the project,
- create a minimal `FROM scratch` OCI image that contains only the `dist/` folder,
- authenticate to Quay.io,
- and push the image tagged as `:latest` and `:<short-sha>`.

Requirements:
- Podman or Docker (on Fedora, Podman is recommended).
- Access to the Quay organization `assisted-migration` with a user/robot account that has write/create permissions.
- Node.js 20, Corepack, and Yarn enabled.

Organization reference: [assisted-migration on Quay](https://quay.io/organization/assisted-migration).

## 1) Prepare the environment

```bash
cd ~/migration-planner-ui
corepack enable
yarn install --immutable
yarn build:all
```

## 2) Define variables

Pick the repository name within the organization (must be unique and usually lowercase with hyphens if needed):

```bash
# Replace <your-repo> with the name you want to use inside the org
export IMAGE="quay.io/assisted-migration/<your-repo>"

# Quay user/robot and token (with write/create permissions)
export QUAY_USERNAME="assisted-migration+<robot>"
export QUAY_PASSWORD="<robot-token>"
```

## 3) Choose the dist folder

The workflow prioritizes `apps/agent-ui/dist`. If you built from the repo root with `yarn build:all`, this path should exist with files.

```bash
export DIST_DIR="apps/agent-ui/dist"
test -d "$DIST_DIR" || { echo "Missing $DIST_DIR"; exit 1; }
ls -A "$DIST_DIR" >/dev/null || { echo "$DIST_DIR is empty"; exit 1; }
```

If you need to use a different `dist`, change it (e.g., `apps/demo/dist`).

## 4) Login to Quay

With Podman (recommended on Fedora):

```bash
podman logout quay.io || true
echo "$QUAY_PASSWORD" | podman login -u "$QUAY_USERNAME" --password-stdin quay.io
podman login --get-login quay.io
```

With Docker:

```bash
docker logout quay.io || true
echo "$QUAY_PASSWORD" | docker login -u "$QUAY_USERNAME" --password-stdin quay.io
```

## 5) Build a minimal image (FROM scratch, dist only)

Podman:

```bash
podman build -t "$IMAGE:latest" -f - "$DIST_DIR" <<'EOF'
FROM scratch
COPY . /dist
EOF
```

Docker:

```bash
docker build -t "$IMAGE:latest" -f - "$DIST_DIR" <<'EOF'
FROM scratch
COPY . /dist
EOF
```

## 6) Tag with short SHA and push

```bash
SHORT_SHA=$(git rev-parse --short HEAD)

# Tags
podman tag "$IMAGE:latest" "$IMAGE:$SHORT_SHA" 2>/dev/null || true
docker  tag "$IMAGE:latest" "$IMAGE:$SHORT_SHA" 2>/dev/null || true

# Push (use your preferred runtime)
podman push "$IMAGE:latest" || docker push "$IMAGE:latest"
podman push "$IMAGE:$SHORT_SHA" || docker push "$IMAGE:$SHORT_SHA"
```

Notes:
- If the repository does not exist and your robot has create permission, the first push will create it automatically.
- If you get 403/404, you likely lack create permission: create the repo in the Quay UI and retry the push.

## 7) Verify image contents (optional)

Podman:

```bash
cid=$(podman create "$IMAGE:$SHORT_SHA")
mnt=$(podman mount "$cid")
ls -R "$mnt/dist" | head
podman umount "$cid" && podman rm "$cid"
```

Skopeo:

```bash
skopeo copy "docker://$IMAGE:$SHORT_SHA" dir:_img
tar -tf _img/*/layer.tar | head
```

## 8) Run the GitHub Actions workflow locally with act (optional)

If you want to simulate the full pipeline:

```bash
act push -j build-and-push \
  -s QUAY_USERNAME="$QUAY_USERNAME" \
  -s QUAY_PASSWORD="$QUAY_PASSWORD" \
  -s QUAY_IMAGE="$IMAGE" \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

Requirements:
- `act` installed.
- A compatible runtime (Docker in most cases; with Podman it may require additional setup).

## Troubleshooting

- `authentication required` / `denied: requested access to the resource is denied`:
  - Re-run login and verify `podman login --get-login quay.io`.
  - Confirm `$IMAGE` points to `quay.io/assisted-migration/<your-repo>`.
  - Ensure the robot has write/create permissions or pre-create the repo in the UI.

- Quay in “read-only” mode:
  - Pushes will fail. Wait and try again later. Check the org status: [assisted-migration](https://quay.io/organization/assisted-migration).

- `dist` missing or empty:
  - Run `yarn build:all` from the repo root and verify `apps/agent-ui/dist`.

