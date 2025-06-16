import localforage from "localforage";
import { type Task } from "@/types/types";

const TASKS_KEY = "cachedTasks";

export const saveTasksToStorage = async (data: { data: Task[]; mrta: any }) => {
  try {
    await localforage.setItem(TASKS_KEY, data);
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

export const getTasksFromStorage = async (): Promise<{
  data: Task[];
  meta: any;
} | null> => {
  try {
    const cached = await localforage.getItem(TASKS_KEY);

    return cached as { data: Task[]; meta: any };
  } catch (error) {
    console.error("Error loading tasks:", error);
    return null;
  }
};

export const clearTasksFromStorage = async () => {
  try {
    await localforage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error("Error clearing tasks:", error);
  }
};
