import "@patternfly/react-core/dist/styles/base.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Configuration } from "@migration-planner-ui/api-client/runtime";
import { AgentApi } from "@migration-planner-ui/agent-client/apis";
import { Spinner } from "@patternfly/react-core";
import {
  Container,
  Provider as DependencyInjectionProvider,
} from "@migration-planner-ui/ioc";
import { router } from "./Router";
import { Symbols } from "./Symbols";
import { AgentUIVersion } from "#/common/AgentUIVersion";

export const getConfigurationBasePath = (): string => {
  if (import.meta.env.PROD) {
    return `${window.location.origin}/api/v1`;
  }

  return `${window.location.origin}/agent/api/v1`;
};

function getConfiguredContainer(): Container {
  const agentApiConfig = new Configuration({
    basePath: getConfigurationBasePath(),
  });
  const container = new Container();
  container.register(Symbols.AgentApi, new AgentApi(agentApiConfig));

  return container;
}

function main(): void {
  const root = document.getElementById("root");
  if (root) {
    root.style.height = "inherit";
    const container = getConfiguredContainer();
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <DependencyInjectionProvider container={container}>
          <React.Suspense fallback={<Spinner />}>
            <AgentUIVersion />
            <RouterProvider router={router} />
          </React.Suspense>
        </DependencyInjectionProvider>
      </React.StrictMode>
    );
  }
}

main();
