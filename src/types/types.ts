export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  name: string;
  description: string | null;
  priority: Priority;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  archived: boolean;
  parentId: string | null;
  children: string | string[];
  tags: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  name: string;
  description?: string | null;
  tags?: string | null;
  priority?: Priority;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  archived?: boolean;
}

export interface UpdateTaskRequest {
  name?: string;
  description?: string | null;
  tags?: string | null;
  priority?: Priority;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  archived?: boolean;
  completedAt?: string | null;
}

export interface TaskApiResponse {
  data: Task[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export type SingleTaskApiResponse = {
  data: Task;
};

export interface EditTaskFormState {
  name: string;
  description: string;
  tags: string;
  priority: Priority;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}
