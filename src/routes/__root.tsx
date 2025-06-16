import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFound from "@/pages/notfound";
import ErrorBoundary from "@/components/errorboundary";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});
