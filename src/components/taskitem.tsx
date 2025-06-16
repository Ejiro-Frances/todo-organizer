import React from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import PriorityBadge from "./prioritybadge";
import TaskStatusBadge from "./taskstatusbadge";
import TaskEditForm from "./taskeditform";
import { type Task } from "@/types/types";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Checkbox } from "./ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="bg-white/90 shadow border border-gray-200 rounded-xl mb-4 overflow-hidden">
      {isEditing ? (
        <TaskEditForm
          editForm={editForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <div
          className={`flex gap-4 p-4 ${task.status === "DONE" ? "bg-gray-200" : ""}`}
        >
          {/* Checkbox */}
          <Checkbox
            checked={task.status === "DONE"}
            onCheckedChange={onToggle}
            className="mt-1 shrink-0"
          />

          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <PriorityBadge priority={task.priority} />
            </div>

            {task.description && (
              <p className="text-sm text-gray-700 mt-1">{task.description}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-4 items-center text-xs text-gray-600">
              {task.tags && (
                <span className="text-blue-800 font-semibold uppercase">
                  {task.tags}
                </span>
              )}
              <TaskStatusBadge status={task.status} />
              <span>
                {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-between items-end gap-2 text-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onEdit}
                  disabled={isBusy}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <CiEdit size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Edit task</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onDelete}
                  disabled={isBusy}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdOutlineDelete size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete task</TooltipContent>
            </Tooltip>

            <Link
              to="/task/$taskId"
              params={{ taskId: task.id }}
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
