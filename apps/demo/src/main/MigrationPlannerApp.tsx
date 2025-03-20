import React from "react";
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

export interface MigrationPlannerAppProps {
  basePath?: string;
  container?: Container;
}

function getConfiguredContainer(basePath: string): Container {
  const plannerApiConfig = new Configuration({ basePath });
  const container = new Container();
  container.register(Symbols.SourceApi, new SourceApi(plannerApiConfig));
  container.register(Symbols.AgentApi, new AgentApi(plannerApiConfig));
  return container;
}

export const MigrationPlannerApp: React.FC<MigrationPlannerAppProps> = ({
  basePath = "/planner",
  container = getConfiguredContainer(basePath)
}) => (
  <React.StrictMode>
    <DependencyInjectionProvider container={container}>
      <React.Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </DependencyInjectionProvider>
  </React.StrictMode>
);