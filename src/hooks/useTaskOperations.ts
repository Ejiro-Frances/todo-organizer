import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { createTask, updateTask, deleteTask } from "@/lib/api";
import { saveTasksToStorage } from "@/lib/storage";
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

  const updateTaskLocally = (taskId: string, updatedFields: Partial<Task>) => {
    queryClient.setQueryData<Task[]>(["tasks"], (oldData = []) =>
      oldData.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );

    queryClient.setQueryData<Task | undefined>(["task", taskId], (old) =>
      old ? { ...old, ...updatedFields } : old
    );
  };

  const handleStorageUpdate = async () => {
    const updatedTasks = queryClient.getQueryData<Task[]>(["tasks"]);
    if (updatedTasks) {
      try {
        await saveTasksToStorage(updatedTasks);
      } catch {
        toast.error("Failed to sync tasks with local storage.");
      }
    }
  };

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      toast.success("Task created!");
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await handleStorageUpdate();
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to create task. Please try again.";
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: async (_, taskId) => {
      toast.success("Task deleted!");
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      await handleStorageUpdate();
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to delete task. Please try again.";
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskRequest }) =>
      updateTask(id, updates),
    onSuccess: async (_, variables) => {
      toast.success("Task updated successfully!");
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
      await handleStorageUpdate();
    },
    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to update task. Please try again.";
      toast.error(message);
    },
  });

  const handleToggleTask = async (task: Task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    const newCompletedAt =
      newStatus === "DONE" ? new Date().toISOString() : null;

    updateTaskLocally(task.id, {
      status: newStatus,
      completedAt: newCompletedAt,
    });

    try {
      await updateMutation.mutateAsync({
        id: task.id,
        updates: {
          status: newStatus,
          completedAt: newCompletedAt,
        },
      });
    } catch {
      updateTaskLocally(task.id, {
        status: task.status,
        completedAt: task.completedAt,
      });
      toast.error("Failed to update task status.");
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
    const editForm = editForms[taskId];
    if (!editForm) return;

    setUpdatingTaskId(taskId);

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
    } catch {
      toast.error("Failed to save task changes.");
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
      setEditingTask(null);
    }
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

    // Mutation States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Handlers
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleSaveEdit,
    handleCancelEdit,
    handleEditChange,
  };
};
