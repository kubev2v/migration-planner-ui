import "@patternfly/react-core/dist/styles/base.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Configuration } from "@migration-planner-ui/api-client/runtime";
import { AgentApi, SourceApi } from "@migration-planner-ui/api-client/apis";
import { Spinner } from "@patternfly/react-core";
import {
  Container,
  Provider as DependencyInjectionProvider,
} from "@migration-planner-ui/ioc";
import { router } from "./Router";
import { Symbols } from "./Symbols";
import { useAccountsAccessToken } from "../hooks/useAccountsAccessToken"; // Importa el hook

function getConfiguredContainer(accessToken: string): Container {
  const plannerApiConfig = new Configuration({
    basePath: `/planner`,
    headers: {
      Authorization: `Bearer ${accessToken}`, // Use access token here
    },
  });

  const container = new Container();
  
  container.register(Symbols.SourceApi, new SourceApi(plannerApiConfig));
  container.register(Symbols.AgentApi, new AgentApi(plannerApiConfig));

  //For UI testing we can use the mock Apis
  //container.register(Symbols.SourceApi, new MockSourceApi(plannerApiConfig));
  //container.register(Symbols.AgentApi, new MockAgentApi(plannerApiConfig));

  return container;
}

// eslint-disable-next-line react-refresh/only-export-components
function App(): JSX.Element {
  const { accessToken } = useAccountsAccessToken();

  if (!accessToken) {
    return <Spinner />; 
  }

  const container = getConfiguredContainer(accessToken);

  return (
    <DependencyInjectionProvider container={container}>
      <React.Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </DependencyInjectionProvider>
  );
}

function main(): void {
  const root = document.getElementById("root");
  if (root) {
    root.style.height = "inherit";
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

main();