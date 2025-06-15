import axios from "axios";
import {
  type CreateTaskRequest,
  type UpdateTaskRequest,
  type TaskApiResponse,
  type SingleTaskApiResponse,
} from "@/types/types";

const API_BASE_URL = "https://api.oluwasetemi.dev/tasks";

// get all tasks
export const getTasks = async (
  page = 1,
  limit = 10,
  status?: string,
  search?: string
): Promise<TaskApiResponse> => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status && status !== "ALL") query.append("status", status);
  if (search?.trim()) query.append("search", search.trim());
  const response = await axios.get(`${API_BASE_URL}?${query.toString()}`);
  return response.data;
};

// get task by id
export const getTask = async (
  taskId: string
): Promise<SingleTaskApiResponse> => {
  const response = await axios.get(`${API_BASE_URL}/${taskId}`);

  return response.data;
};

export const createTask = async (task: CreateTaskRequest) => {
  const response = await axios.post(`${API_BASE_URL}`, task);
  return response.data;
};

export const updateTask = async (
  taskId: string,
  updatedFields: UpdateTaskRequest
) => {
  const { data } = await axios.patch(
    `${API_BASE_URL}/${taskId}`,
    updatedFields
  );
  return data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
  return response.data;
};
