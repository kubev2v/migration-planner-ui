#!/bin/bash
set -e

echo "🔨 Building all workspaces..."
yarn build:all

echo "📝 Generating Dockerfile..."
cat > Dockerfile.scratch <<'EOF'
FROM scratch
COPY . /apps/agent-ui/dist
EOF

echo "🐳 Building Docker image..."
IMAGE_NAME="${1:-migration-planner-agent-ui}"
IMAGE_TAG="${2:-latest}"

docker build \
  -f Dockerfile.scratch \
  -t "${IMAGE_NAME}:${IMAGE_TAG}" \
  ./apps/agent-ui/dist

echo "✅ Docker image built successfully!"
echo "   Image: ${IMAGE_NAME}:${IMAGE_TAG}"
echo ""
echo "To run the image locally, you can use:"
echo "   docker run -p 8080:8080 ${IMAGE_NAME}:${IMAGE_TAG}"
echo ""
echo "To push to a registry:"
echo "   docker tag ${IMAGE_NAME}:${IMAGE_TAG} <registry>/<repo>:${IMAGE_TAG}"
echo "   docker push <registry>/<repo>:${IMAGE_TAG}"

