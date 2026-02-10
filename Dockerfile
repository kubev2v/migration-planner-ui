# Build stage: Build the UI application
FROM registry.access.redhat.com/ubi9/nodejs-20:latest AS builder

USER root

# Install yarn via corepack
RUN npm install -g corepack && corepack enable

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn .yarn
COPY packages ./packages
COPY apps ./apps
COPY biome.json openapitools.json ./

# Install dependencies
RUN yarn install --immutable

# Build all workspaces
RUN yarn build:all

# Final stage: Create minimal image with only the dist files
FROM scratch
COPY --from=builder /workspace/apps/agent-ui/dist /apps/agent-ui/dist

