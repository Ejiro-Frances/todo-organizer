import React from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import TaskEditForm from "./taskeditform";
import { type Task } from "@/types/types";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Checkbox } from "./ui/checkbox";
import { FiBarChart2 } from "react-icons/fi";

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
    <div className="bg-white/90 shadow border border-gray-200 rounded-xl mb-4">
      {isEditing ? (
        <TaskEditForm
          editForm={editForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <div
          className={`relative px-4 py-5 border border-l-4 rounded-xl ${task.status === "DONE" ? "border-[#0EA420]" : task.status === "TODO" ? "border-[#F42D2D]" : "border-[#999999]"}`}
        >
          <div className="pb-4 border-b-2">
            <div className="flex justify-between items-center">
              <h3
                className={`text-xl font-medium capitalize ${task.status === "DONE" ? "line-through text-gray-500" : ""}`}
              >
                {task.name}
              </h3>
              <Checkbox
                checked={task.status === "DONE"}
                onCheckedChange={onToggle}
                className="mt-1 shrink-0 rounded-full fill-[#0EA420]"
              />
            </div>
            {task.description && (
              <p className="truncate text-sm tracking-normal capitalize text-gray-700 mt-1  max-w-[450px]">
                {task.description}
              </p>
            )}
          </div>
          {/* below the border */}
          <div className="flex gap-4 items-center mt-3">
            <div className=" flex gap-1 items-center text-xs">
              <FiBarChart2 />
              <span className="capitalize">{task.priority}</span>
            </div>

            {task.tags && (
              <span className="text-blue-800 font-semibold capitalize text-xs">
                {task.tags}
              </span>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 ">
            <div className="flex justify-between">
              <div className="mt-4 flex flex-wrap gap-4 items-center text-xs text-gray-600">
                <span>
                  {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-end gap-2 text-sm">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
