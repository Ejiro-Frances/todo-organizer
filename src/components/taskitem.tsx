import React from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import TaskEditForm from "./taskeditform";
import TaskStatusBadge from "./taskstatusbadge";
import { type Task } from "@/types/types";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Checkbox } from "./ui/checkbox";
import { FiBarChart2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPanelLeftOpen } from "react-icons/lu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
  className?: string;
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
  className,
}) => {
  return (
    <div className="relative bg-white/90 shadow border border-gray-200 rounded-xl mb-4">
      {isEditing ? (
        <div className="bg-[rgba(0,0,0,0.6)] fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center">
          <TaskEditForm
            editForm={editForm}
            onChange={onChange}
            onSave={onSave}
            onCancel={onCancel}
            className="bg-white rounded-md"
          />
        </div>
      ) : (
        <div className={`relative ${className}`}>
          <div className="pb-4 border-b-2">
            <div className="flex justify-between items-center">
              <h3
                className={`text-xl font-medium capitalize ${task.status === "DONE" ? "line-through text-gray-500" : ""}`}
              >
                {task.name}
              </h3>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <Checkbox
                      checked={task.status === "DONE"}
                      onCheckedChange={onToggle}
                      className="shrink-0 rounded-full"
                    />
                  </TooltipTrigger>
                  <TooltipContent>Mark complete</TooltipContent>
                </Tooltip>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <BsThreeDotsVertical size={24} className="p-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <button
                        onClick={onEdit}
                        disabled={isBusy}
                        className="flex items-center gap-2"
                      >
                        <CiEdit size={18} />
                        <span className="">Edit</span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <button
                        onClick={onDelete}
                        disabled={isBusy}
                        className="flex items-center gap-2"
                      >
                        <MdOutlineDelete size={18} />
                        <span>Delete</span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        to="/task/$taskId"
                        params={{ taskId: task.id }}
                        className="flex items-center gap-2"
                      >
                        <LuPanelLeftOpen />
                        <span>View task</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {task.description && (
              <p className="truncate text-sm tracking-normal capitalize text-gray-700 mt-1  max-w-[450px]">
                {task.description}
              </p>
            )}
          </div>
          {/* below the border */}
          <div className="flex flex-col gap-1 justify-center mt-3">
            <div className="flex justify-between items-center">
              <div className=" flex gap-1 items-center text-xs">
                <FiBarChart2 />
                <span className="capitalize">{`${task.priority.toLowerCase()}`}</span>
              </div>

              {task.tags && (
                <span className="text-blue-800 font-semibold capitalize text-xs">
                  {`${task.tags.toLowerCase()}`}
                </span>
              )}
            </div>
            <TaskStatusBadge status={task.status} />
          </div>

          {/* Main content */}
          <div className="flex-1 ">
            <div className="flex justify-between">
              <div className="mt-4 flex flex-wrap gap-4 items-center text-xs text-gray-600">
                <span>
                  {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
