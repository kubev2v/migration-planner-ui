# Migration Planner UI Makefile

CONTAINER_RUNTIME := $(shell command -v podman 2> /dev/null || echo docker)
# The OpenAPI Generator CLI container image, adapted from https://openapi-generator.tech/#tryDocker
IMAGE := quay.io/jkilzi/openapi-generator-cli
TAG := 7.18.0
# Arguments to pass to the OpenAPI Generator CLI
ARGS :=

# Interact directly with the tool
.PHONY: openapi-generator-cli
openapi-generator-cli:
	$(CONTAINER_RUNTIME) run --name openapi-generator-cli --rm -v $(PWD):/opt/app-root/src/workspace $(IMAGE):$(TAG) $(ARGS)

# Generate something
.PHONY: generate
generate:
	$(MAKE) openapi-generator-cli ARGS="generate $(ARGS)"

# Updates the API client
.PHONY: api-client
api-client:
	$(MAKE) generate ARGS="--generator-key api-client"

# Updates the Agent client
.PHONY: agent-client
agent-client:
	$(MAKE) generate ARGS="--generator-key agent-client"

# Updates the Image client
.PHONY: image-client
image-client:
	$(MAKE) generate ARGS="--generator-key image-client"

# Clean up OpenAPI Generator CLI container image
.PHONY: clean
clean:
	$(CONTAINER_RUNTIME) rmi $(IMAGE)

# Show help
.PHONY: help
help:
	@echo "Migration Planner UI Makefile"
	@echo ""
	@echo "Available targets:"
	@echo "  openapi-generator-cli   Interact directly with the CLI tool"
	@echo "  api-client              Update the API client (e.g., make api-client)"
	@echo "  agent-client            Update the Agent client (e.g., make agent-client)"
	@echo "  image-client            Update the Image client (e.g., make image-client)"
	@echo "  generate                Run openapi-generator, optionally pass --generator-key <key> or other arguments"
	@echo "                          See openapitools.json for keys (e.g., make generate ARGS=\"--generator-key api-client\")"
	@echo "  clean                   Remove the OpenAPI Generator CLI container image"
	@echo "  help                    Show this help message"
	@echo ""
	@echo "Container runtime: $(CONTAINER_RUNTIME)"

# Default target to show help
.DEFAULT_GOAL := help
