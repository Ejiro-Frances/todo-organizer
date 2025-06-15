import React from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import PriorityBadge from "./prioritybadge";
import TaskStatusBadge from "./taskstatusbadge";
import TaskEditForm from "./taskeditform";
import { type Task } from "@/types/types";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
// import { Button } from "./ui/button";

type Props = {
  task: Task;
  isEditing: boolean;
  editForm: any;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  isBusy: boolean;
};

const TaskItem: React.FC<Props> = ({
  task,
  isEditing,
  editForm,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  onToggle,
  isBusy,
}) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 p-4 rounded-xl mb-4">
      {isEditing ? (
        <TaskEditForm
          editForm={editForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.status === "DONE"}
            onChange={onToggle}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">{task.name}</h3>
              <PriorityBadge priority={task.priority} />
            </div>
            {task.description && (
              <p className="text-sm text-gray-700">{task.description}</p>
            )}
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-xs mt-4">
                {task.tags && (
                  <span className="text-blue-600">Tags: {task.tags}</span>
                )}
                <TaskStatusBadge status={task.status} />
                <span>
                  {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
                </span>

                <button
                  onClick={onEdit}
                  disabled={isBusy}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <CiEdit size={16} />
                </button>
                <button
                  onClick={onDelete}
                  disabled={isBusy}
                  // variant="destructive"
                  className="text-red-500 hover:underline"
                  title="delete"
                >
                  <MdOutlineDelete size={16} />
                </button>
              </div>
              <Link
                to="/task/$taskId"
                params={{ taskId: task.id }}
                className="text-blue-600 underline hover:text-blue-800 text-xs"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
