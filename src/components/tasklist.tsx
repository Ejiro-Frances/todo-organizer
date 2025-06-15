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
    <>
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
        />
      ))}
    </>
  );
};

export default TaskList;
