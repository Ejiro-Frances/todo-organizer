import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getTask } from "@/lib/api";
import TaskDetailsCard from "@/components/taskdetails";
import { MdArrowBack } from "react-icons/md";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/task/$taskId")({
  component: TaskDetailsPage,
});

function TaskDetailsPage() {
  const { taskId } = Route.useParams();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId),
    enabled: !!taskId,
  });

  // Loading
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <MdArrowBack className="w-5 h-5" />
            Back to Tasks
          </Link>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found
  if (error || !task) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <MdArrowBack className="w-5 h-5" />
            Back to Tasks
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold mb-2">Task Not Found</h2>
          <p className="text-red-600">
            The task you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  // Success
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Tasks
        </Link>
      </div>
      <TaskDetailsCard task={task} />
    </div>
  );
}
