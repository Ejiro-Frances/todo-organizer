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
import { toast } from "sonner";

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
      toast.error(`Error deleting task: ${error}`);
    }
  };

  return (
    <div className="bg-white border border-[#E4E4E7] p-8 mt-28 rounded-md shadow">
      {editingTask === task.id ? (
        <TaskEditForm
          editForm={editForms[task.id]}
          onChange={(field, value) => handleEditChange(task.id, field, value)}
          onSave={() => handleSaveEdit(task.id)}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div>
          <h2 className="text-xl md:text-[2rem] font-medium text-[#2B7FFF] capitalize">
            {task.name}
          </h2>
          {task.description && (
            <p className=" text-gray-700 leading-relaxed mb-4">
              {task.description}
            </p>
          )}
          <div>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
              <PriorityBadge priority={task.priority} label="Priority" />
              <span className="md:justify-self-end font-family-DM text-[#888888] text-xs">
                Created:{" "}
                {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
              </span>
              <div>
                <TaskStatusBadge status={task.status} label="Status" />
              </div>
              {task.tags && (
                <span className="md:justify-self-end w-fit text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-md capitalize">
                  Tag: {task.tags}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-8 mt-10">
            <Button variant="outline" onClick={() => handleEditTask(task)}>
              <CiEdit size={18} />
              <span>Edit</span>
            </Button>
            <Button variant="destructive" onClick={() => setDeleteModal(true)}>
              <MdOutlineDelete size={18} />
              <span>Delete</span>
            </Button>
          </div>
        </div>
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
