import { createFileRoute } from "@tanstack/react-router";
import TaskBoard from "@/pages/taskboard";
import "@/index.css";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <TaskBoard />
    </div>
  );
}
