import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { createTask, updateTask, deleteTask } from "@/lib/api";
import {
  type Task,
  type UpdateTaskRequest,
  type EditTaskFormState,
} from "@/types/types";

export const useTaskOperations = () => {
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editForms, setEditForms] = useState<Record<string, EditTaskFormState>>(
    {}
  );
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Task created!");
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted!");
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskRequest }) =>
      updateTask(id, updates),
    onSuccess: () => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleToggleTask = async (task: Task) => {
    const updates: UpdateTaskRequest = {
      status: task.status === "DONE" ? "TODO" : "DONE",
      completedAt: task.status === "DONE" ? null : new Date().toISOString(),
    };

    try {
      await updateMutation.mutateAsync({ id: task.id, updates });
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setDeletingTaskId(taskId);
    try {
      await deleteMutation.mutateAsync(taskId);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditForms((prev) => ({
      ...prev,
      [task.id]: {
        name: task.name,
        description: task.description || "",
        tags: task.tags || "",
        priority: task.priority,
        status: task.status,
      },
    }));
  };

  const handleSaveEdit = async (taskId: string) => {
    setUpdatingTaskId(taskId);
    const editForm = editForms[taskId];

    if (!editForm) {
      setUpdatingTaskId(null);
      return;
    }

    const updates: UpdateTaskRequest = {
      name: editForm.name.trim(),
      description: editForm.description.trim() || null,
      tags: editForm.tags.trim() || null,
      priority: editForm.priority,
      status: editForm.status,
    };

    try {
      await updateMutation.mutateAsync({ id: taskId, updates });
      setEditingTask(null);
      setEditForms((prev) => {
        const { [taskId]: _, ...rest } = prev;
        return rest;
      });
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleCancelEdit = () => {
    if (editingTask) {
      setEditForms((prev) => {
        const { [editingTask]: _, ...rest } = prev;
        return rest;
      });
    }
    setEditingTask(null);
  };

  const handleEditChange = (id: string, field: string, value: string) => {
    setEditForms((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return {
    // State
    editingTask,
    editForms,
    updatingTaskId,
    deletingTaskId,
    setEditForms,

    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,

    // Handlers
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleSaveEdit,
    handleCancelEdit,
    handleEditChange,
  };
};
