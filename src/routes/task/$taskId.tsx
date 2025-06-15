import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import TaskList from "@/components/tasklist";
import { useTaskOperations } from "@/hooks/useTaskOperations";
import { getTask } from "@/lib/api";
import { MdArrowBack } from "react-icons/md";

export const Route = createFileRoute("/task/$taskId")({
  component: TaskDetails,
});

function TaskDetails() {
  const { taskId } = Route.useParams();
  const navigate = useNavigate();

  // Use the shared task operations hook
  const {
    editingTask,
    editForms,
    updatingTaskId,
    deletingTaskId,
    handleToggleTask,
    handleDeleteTask: originalHandleDeleteTask,
    handleEditTask,
    handleSaveEdit,
    handleCancelEdit,
    handleEditChange,
  } = useTaskOperations();

  // Fetch the specific task
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId),
    enabled: !!taskId,
  });
  const handleDeleteTask = async (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      await originalHandleDeleteTask(taskId);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Tasks
        </Link>

        <div className="text-sm text-gray-500">Task Details</div>
      </div>

      {/* Task Details using TaskList component */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Task Details</h1>

        <TaskList
          tasks={[task]} // Pass single task as array
          editingTaskId={editingTask}
          editForms={editForms}
          onEditChange={handleEditChange}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask} // Use our custom delete handler
          onToggle={handleToggleTask}
          updatingTaskId={updatingTaskId}
          deletingTaskId={deletingTaskId}
        />

        {/* Additional details section (optional) */}
        {/* {!editingTask && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Task ID:</span>
                <span className="ml-2 font-mono text-gray-700">{task.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Created:</span>
                <span className="ml-2 text-gray-700">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TaskDetails;

// import { createFileRoute, notFound } from "@tanstack/react-router";
// import TaskDetails from "@/components/taskdetails";
// export const Route = createFileRoute("/task/$taskId")({
//   loader: ({ params }) => {
//     const { tododId } = params;
//     const task = task.find((t) => t.id === taskId);
//     if (!task) {
//       throw notFound();
//     }
//     return { task };
//   },
//   component: TaskDetails,
// });

// function TaskDetails() {
//   const { task } = Route.useLoaderData();

//   return (
//     <div>
//       <TaskDetails />
//       {/* <h1>Task details</h1> */}
//     </div>
//   );
// }
