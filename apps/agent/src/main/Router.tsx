/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    lazy: async () => {
      const { default: AgentLoginPage } = await import(
        "#/pages/AgentLoginPage"
      );

      return {
        Component: AgentLoginPage,
      };
    },
  },
  {
    path: "/error/:code",
    lazy: async () => {
      const { default: ErrorPage } = await import("#/pages/ErrorPage");

      return {
        Component: ErrorPage,
      };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const { default: ErrorPage } = await import("#/pages/ErrorPage");

      return {
        element: (
          <ErrorPage
            code="404"
            message="We lost that page"
            actions={[
              {
                children: "Go back",
                component: "a",
                onClick: (_event): void => {
                  history.back();
                },
              },
            ]}
          />
        ),
      };
    },
  },
]);
