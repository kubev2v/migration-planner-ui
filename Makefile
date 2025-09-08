# Migration Planner UI Makefile

# Default container image for development tasks
DEV_IMAGE := migration-planner-ui-dev
CONTAINER_RUNTIME := $(shell command -v podman 2> /dev/null || echo docker)
CLEANUP := true

# Build lightweight development container image for API client updates
.PHONY: build-dev-image
build-dev-image:
	@echo "Building API client development container..."
	$(CONTAINER_RUNTIME) build \
		--tag $(DEV_IMAGE) \
		--file Containerfile.api-client \
		.

# Run yarn api-client:update in a containerized environment
.PHONY: api-client-update
api-client-update: build-dev-image
	@echo "Running yarn api-client:update in containerized environment..."
	$(CONTAINER_RUNTIME) run \
		--rm \
		--volume $(PWD):/workspace:Z \
		--workdir /workspace \
		--env HOME=/opt/app-root/src \
		$(DEV_IMAGE) \
		openapi-generator-cli generate
	@echo "API client update completed successfully!"
	@if [ "$(CLEANUP)" = "true" ]; then \
		echo "Cleaning up development image..."; \
		$(MAKE) clean-dev-image; \
	fi

# Alternative target for running with local OpenAPI spec
.PHONY: api-client-update-local
api-client-update-local: build-dev-image
	@if [ ! -f "$(OPENAPI_SPEC)" ]; then \
		echo "Error: OPENAPI_SPEC file not found. Usage: make api-client-update-local OPENAPI_SPEC=/path/to/openapi.yaml"; \
		exit 1; \
	fi
	@echo "Running yarn api-client:update with local OpenAPI spec: $(OPENAPI_SPEC)"
	@echo "Backing up current openapitools.json..."
	@cp openapitools.json openapitools.json.backup
	@echo "Copying local OpenAPI spec to project root..."
	@cp "$(OPENAPI_SPEC)" ./openapi-local.yaml
	@echo "Updating openapitools.json to use local spec..."
	@sed -i.tmp 's|"inputSpec": "https://raw.githubusercontent.com/kubev2v/migration-planner/main/api/v1alpha1/openapi.yaml"|"inputSpec": "./openapi-local.yaml"|' openapitools.json
	$(CONTAINER_RUNTIME) run \
		--rm \
		--volume $(PWD):/workspace:Z \
		--workdir /workspace \
		--env HOME=/opt/app-root/src \
		$(DEV_IMAGE) \
		openapi-generator-cli generate
	@echo "Restoring original openapitools.json..."
	@mv openapitools.json.backup openapitools.json
	@echo "Cleaning up temporary files..."
	@rm -f openapitools.json.tmp openapi-local.yaml
	@echo "API client update with local spec completed successfully!"
	@if [ "$(CLEANUP)" = "true" ]; then \
		echo "Cleaning up development image..."; \
		$(MAKE) clean-dev-image; \
	fi

# Clean up development images
.PHONY: clean-dev-image
clean-dev-image:
	$(CONTAINER_RUNTIME) rmi $(DEV_IMAGE) 2>/dev/null || true

# Show help
.PHONY: help
help:
	@echo "Migration Planner UI Development Tasks"
	@echo ""
	@echo "Available targets:"
	@echo "  api-client-update       - Run yarn api-client:update in containerized environment"
	@echo "  api-client-update-local - Run yarn api-client:update with local OpenAPI spec"
	@echo "                           Usage: make api-client-update-local OPENAPI_SPEC=/path/to/openapi.yaml"
	@echo "  build-dev-image        - Build API client development container image"
	@echo "  clean-dev-image        - Remove API client development container image"
	@echo "  help                   - Show this help message"
	@echo ""
	@echo "Options:"
	@echo "  CLEANUP=true|false     - Auto-cleanup dev image after update (default: true)"
	@echo "                           Usage: make api-client-update CLEANUP=false"
	@echo ""
	@echo "Container runtime: $(CONTAINER_RUNTIME)"

# Default target
.DEFAULT_GOAL := help
