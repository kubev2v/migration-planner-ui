import "@patternfly/react-core/dist/styles/base.css";

import { AgentApi } from "@migration-planner-ui/agent-client/apis";
import { Configuration } from "@migration-planner-ui/api-client/runtime";
import { Container, Provider as DependencyInjectionProvider } from "@migration-planner-ui/ioc";
import { Spinner } from "@patternfly/react-core";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AgentUIVersion } from "../common/AgentUIVersion.tsx";
import { router } from "./Router.tsx";
import { Symbols } from "./Symbols.ts";

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
  if (!root) {
    throw new Error(
      "Root element not found. Make sure the HTML contains an element with id='root'.",
    );
  }

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
    </React.StrictMode>,
  );
}

main();
