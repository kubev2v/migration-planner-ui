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
        "../pages/AgentLoginPage.tsx"
      );

      return {
        Component: AgentLoginPage,
      };
    },
  },
  {
    path: "/error/:code",
    lazy: async () => {
      const { default: ErrorPage } = await import("../pages/ErrorPage.tsx");

      return {
        Component: ErrorPage,
      };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const { default: ErrorPage } = await import("../pages/ErrorPage.tsx");

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
