import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/testerror")({
  component: RouteComponent,
});

function RouteComponent() {
  throw new Error("💣 Boom! This is a test error.");
}
