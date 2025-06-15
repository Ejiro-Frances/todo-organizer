import { createFileRoute } from "@tanstack/react-router";
import TaskBoard from "@/components/taskboard.tsx";

import "../styles.css";

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
