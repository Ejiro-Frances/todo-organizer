import { createFileRoute } from "@tanstack/react-router";
import TaskDetailsPage from "@/pages/taskdetailspage";

export const Route = createFileRoute("/task/$taskId")({
  component: Details,
});

function Details() {
  const { taskId } = Route.useParams();
  return <TaskDetailsPage taskId={taskId} />;
}
