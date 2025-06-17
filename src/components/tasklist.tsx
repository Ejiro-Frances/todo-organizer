import React from "react";
import TaskItem from "./taskitem";
import { type Task } from "@/types/types";

type Props = {
  tasks: Task[];
  editingTaskId: string | null;
  editForms: Record<string, any>;
  onEditChange: (id: string, field: string, value: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (task: Task) => void;
  updatingTaskId: string | null;
  deletingTaskId: string | null;
};

const TaskList: React.FC<Props> = ({
  tasks,
  editingTaskId,
  editForms,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onEdit,
  onDelete,
  onToggle,
  updatingTaskId,
  deletingTaskId,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 md:gap-10 `}
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          editForm={editForms[task.id]}
          onChange={(field, value) => onEditChange(task.id, field, value)}
          onSave={() => onSaveEdit(task.id)}
          onCancel={onCancelEdit}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task)}
          isBusy={updatingTaskId === task.id || deletingTaskId === task.id}
          className={`h-full px-4 py-5 border border-l-4 rounded-xl ${task.status === "DONE" ? "border-[#0EA420]" : task.status === "TODO" ? "border-[#F42D2D]" : "border-purple-600"}`}
        />
      ))}
    </div>
  );
};

export default TaskList;
