import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import PriorityBadge from "./prioritybadge";
import TaskStatusBadge from "./taskstatusbadge";
import { type Task } from "@/types/types";
import { useTaskOperations } from "@/hooks/useTaskOperations";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Button } from "./ui/button";
import TaskEditForm from "./taskeditform";

type TaskDetailsCardProps = {
  task: Task;
};

const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ task }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    editingTask,
    editForms,
    handleEditTask,
    handleEditChange,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteTask: originalHandleDeleteTask,
  } = useTaskOperations();

  const navigate = useNavigate();

  const handleDeleteTask = async (taskId: string) => {
    try {
      await originalHandleDeleteTask(taskId);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="relative bg-gray-50 p-8 rounded-md shadow">
      {editingTask === task.id ? (
        <TaskEditForm
          editForm={editForms[task.id]}
          onChange={(field, value) => handleEditChange(task.id, field, value)}
          onSave={() => handleSaveEdit(task.id)}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <div className="absolute top-5 right-5">
            <PriorityBadge priority={task.priority} />
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 capitalize">
              {task.name}
            </h2>
            {task.description && (
              <p className="text-sm text-gray-700 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {task.tags && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Tag: {task.tags}
              </span>
            )}
            <TaskStatusBadge status={task.status} />
            <span>
              Created:{" "}
              {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
            </span>
          </div>

          <div className="flex justify-end gap-8">
            <Button onClick={() => handleEditTask(task)}>
              <CiEdit size={18} />
              <span>Edit</span>
            </Button>
            <Button variant="destructive" onClick={() => setDeleteModal(true)}>
              <MdOutlineDelete size={18} />
              <span>Delete</span>
            </Button>
          </div>
        </>
      )}

      {deleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
          <div className="bg-white rounded-md p-5">
            Are you sure you want to delete?
            <div className="flex gap-4 mt-5">
              <Button
                variant="outline"
                onClick={() => setDeleteModal(false)}
                className="text-xs"
              >
                NO, do not delete
              </Button>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                variant="destructive"
                className="text-xs"
              >
                YES, delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailsCard;
