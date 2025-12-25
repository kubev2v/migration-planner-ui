# Migration Planner UI

A monorepo containing the in-agent UI application and shared packages for the Migration Planner project.

## Project Structure

This project is organized as a **monorepo** using Yarn workspaces, which allows us to manage multiple related packages and applications in a single repository. The structure is divided into two main directories:

- **`apps/`** - Contains standalone applications (e.g., `agent-ui`)
- **`packages/`** - Contains reusable packages that can be shared across applications

This monorepo structure provides several benefits:
- **Code sharing**: Common functionality can be extracted into packages and reused across multiple apps
- **Consistent tooling**: Shared development tools and configurations ensure consistency across the codebase
- **Atomic changes**: Related changes across packages and apps can be made in a single commit
- **Simplified dependency management**: Dependencies are hoisted and shared where possible, reducing duplication

## Tooling

### Top-Level Tools

The root `package.json` provides workspace-wide scripts and dev dependencies that standardize development across all packages and apps:

**Available Scripts:**
- `yarn build:all` - Build all packages and apps
- `yarn bundle:all` - Bundle all packages for publishing
- `yarn clean:all` - Clean all build artifacts
- `yarn check:all` - Run linting checks across all workspaces
- `yarn check:fix:all` - Auto-fix linting issues
- `yarn format:all` - Format code across all workspaces
- `yarn api-client:update` - Regenerate the API client from OpenAPI spec
- `yarn agent-client:update` - Regenerate the Agent client from OpenAPI spec
- `yarn image-client:update` - Regenerate the Image client from OpenAPI spec

**Shared Dev Dependencies:**
- `@biomejs/biome` - Linting and formatting (configured in `biome.json`)
- `@openapitools/openapi-generator-cli` - OpenAPI code generation
- `typescript` - TypeScript compiler (version ~5.5.0)
- `vite` - Build tool for applications
- Various type definitions (`@types/*`)

### Package-Specific Tools

Each package and app can define its own scripts and dependencies, but they inherit the shared tooling from the root. This separation is intentional and serves to:

- **Standardize packages**: All packages follow similar patterns (build, bundle, clean scripts)
- **Align dependency versions**: Shared dev dependencies ensure consistent TypeScript versions, build tools, and linting rules across the entire monorepo
- **Reduce duplication**: Common tools are defined once at the root level rather than in each package

**Common Package Scripts:**
- `build` - Compile TypeScript to JavaScript
- `bundle` - Build and package for distribution
- `clean` - Remove build artifacts
- `check` - Run linting checks using Biome
- `check:fix` - Auto-fix linting issues using Biome
- `format` - Format code using Biome

**App-Specific Scripts:**
Apps may include additional scripts like `start` and `preview` for development workflows.

## Packages

**Key Features:**
- Generated from OpenAPI spec using `typescript-fetch` generator
- Type-safe API calls and models
- ES6 module support
- Isomorphic code: Works in both Node.js and browser environments

### `@migration-planner-ui/api-client`

TypeScript client for the Migration Planner API, auto-generated from the OpenAPI specification. Provides type-safe API methods and models for interacting with the main Migration Planner backend.

### `@migration-planner-ui/agent-client`

TypeScript client for the Migration Planner Agent API. Similar to `api-client`, but specifically for agent-related operations. Auto-generated from the Agent API OpenAPI specification.

### `@migration-planner-ui/image-client`

TypeScript client for the Migration Planner Image API. Auto-generated from the Image API OpenAPI specification, providing type-safe access to image-related operations.

### `@migration-planner-ui/ioc`

A lightweight dependency injection (IoC) container solution for React applications, inspired by InversifyJS. Provides a simple way to manage dependencies and inject them into React components.

**Key Features:**
- Singleton-scoped dependency injection container
- React Context-based provider pattern
- `useInjection` hook for accessing dependencies in components
- Minimal API surface for easy adoption

## Applications

### `agent-ui`

A React-based user interface application for the Migration Planner Agent. Built with Vite, React Router, and PatternFly components.

**Key Technologies:**
- React 18
- Vite
- React Router
- PatternFly React components
- Emotion CSS

## Adding a New Package or App

The best approach for adding a new package or app is to **copy an existing similar one** and adapt it to your needs. This ensures consistency with existing patterns and configurations.

**Steps:**

1. **Choose a similar package/app** as a template (e.g., copy `packages/api-client` for a new client package, or `apps/agent-ui` for a new app)

2. **Copy the directory** to your desired location (`packages/` for packages, `apps/` for apps)

3. **Update the following:**
   - `package.json`: Update `name`, `description`, and any package-specific dependencies
   - `tsconfig.json`: Adjust TypeScript configuration if needed
   - Source code: Replace with your implementation
   - README.md: Update documentation

4. **Add TypeScript project reference** in the root `tsconfig.json`:
   ```json
   {
     "references": [
       { "path": "./your-new-package/tsconfig.json" }
     ]
   }
   ```

5. **Ensure scripts follow conventions:**
   - `build` – Compile TypeScript
   - `bundle` – Build and package (for packages)
   - `clean` – Remove build artifacts
   - `check` – Run static analysis/linting (e.g., type checks, code lint)
   - `format` – Format code automatically

6. **Run from root** to verify:
   ```bash
   yarn install
   yarn build:all
   ```

## OpenAPI Generator CLI

This project uses the [OpenAPI Generator CLI](https://openapi-generator.tech/) to automatically generate TypeScript clients from OpenAPI specifications. This ensures that our API clients stay in sync with the backend API definitions.

### Why We Use It

- **Type Safety**: Generated clients provide full TypeScript type definitions based on the OpenAPI spec
- **Consistency**: Ensures API clients match the backend API exactly
- **Maintainability**: When the API changes, we regenerate clients rather than manually updating code
- **Speed**: Reduces boilerplate and potential errors from manual client implementation

### How We Use It

The OpenAPI Generator CLI is configured via `openapitools.json` at the root of the project. Each client package has its own generator configuration:

- **`api-client`**: Generates from the main Migration Planner API spec
- **`agent-client`**: Generates from the Agent API spec
- **`image-client`**: Generates from the Image API spec

### Usage

**Via Yarn Scripts (Recommended):**
```bash
# Update a specific client
yarn update:api-client
yarn update:agent-client
yarn update:image-client
```

**Via Makefile (isolated container execution, no extra dependencies needed):**
The Makefile provides a way to run the OpenAPI Generator CLI in isolation using Docker/Podman, ensuring consistent execution across different environments:

```bash
# Update a specific client
make api-client
make agent-client
make image-client

# Or use the generic generate target
make generate ARGS="--generator-key api-client"

# Interact directly with the tool
make openapi-generator-cli ARGS="list"
```

**Why you should use the Makefile?**

The Makefile runs the OpenAPI Generator CLI in a containerized environment, which:
- **Ensures consistency**: Same tool version across all developers and CI/CD
- **Avoids local installation**: No need to install the CLI tool locally
- **Isolates dependencies**: The generator runs in its own container, avoiding conflicts
- **Uses pinned versions**: The container image tag is pinned to a specific version (v7.18.0) for reproducibility

The container automatically mounts the project directory, so generated files are written directly to the appropriate package directories as configured in `openapitools.json`.

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Build all packages:**
   ```bash
   yarn build:all
   ```

3. **Start an application:**
   ```bash
   cd apps/agent-ui
   yarn start
   ```

4. **Run linting:**
   ```bash
   yarn check:all
   ```

## Development Workflow

- **Making changes**: Work in the appropriate package or app directory
- **Testing**: Run package-specific scripts or use workspace scripts from root
- **Linting/Formatting**: Use `yarn check:all` and `yarn format:all` from root
- **Updating API clients**: Use `yarn update:*-client` scripts or Makefile targets when backend APIs change
