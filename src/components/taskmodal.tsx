import React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { type CreateTaskRequest, type Priority } from "@/types/types";
import FieldInfo from "@/components/fieldinfo";

type Props = {
  onCreateTask: (task: CreateTaskRequest) => Promise<any>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const TaskFormModal: React.FC<Props> = ({
  onCreateTask,
  isOpen,
  setIsOpen,
}) => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      priority: "LOW" as Priority,
    },
    onSubmit: async ({ value }) => {
      try {
        const taskData: CreateTaskRequest = {
          name: value.name.trim(),
          description: value.description?.trim() || null,
          tags: value.tags?.trim() || null,
          priority: value.priority,
          status: "TODO",
          archived: false,
        };
        setIsOpen(false);
        await onCreateTask(taskData);
        form.reset();
      } catch (error: any) {
        alert(
          "Error creating task: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="mt-20">
      <div className="flex justify-end my-8 ">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-800 text-white text-lg font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out"
        >
          + Add Task
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute top-0 left-0 z-50 right-0 h-full flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} role="wrapper">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white w-[34.5rem] min-h-[50vh] rounded-2xl p-10 space-y-3 mb-6 text-sm"
            >
              <div>
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "A title is required"
                        : value.length < 2
                          ? "Title must be at least 2 characters"
                          : undefined,
                  }}
                  children={(field) => {
                    return (
                      <>
                        <label htmlFor={field.name}>Task title</label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Task name"
                          className="w-full p-2 border rounded-md mt-1 bg-transparent"
                        />
                        <FieldInfo field={field} />
                      </>
                    );
                  }}
                />
              </div>

              <div>
                <form.Field
                  name="description"
                  children={(field) => {
                    return (
                      <>
                        <label htmlFor={field.name}>Task description</label>
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Task description (optional)"
                          className="w-full p-2 border rounded-md mt-1"
                        />
                      </>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="tags"
                  children={(field) => (
                    <div className="flex flex-col gap-1">
                      <label htmlFor={field.name}>Task tag</label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Tag (e.g., work, personal)"
                        className="w-full p-2 border rounded-md mt-1"
                      />
                    </div>
                  )}
                />

                <form.Field
                  name="priority"
                  children={(field) => (
                    <div className="flex flex-col gap-1">
                      <label htmlFor={field.name}>Priority</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value as Priority)
                        }
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                  )}
                />
              </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <div className="flex justify-between mt-5">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting ? "Adding..." : "+ Add Task"}
                    </Button>
                  </div>
                )}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFormModal;
