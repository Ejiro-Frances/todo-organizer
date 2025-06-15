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
      console.log("Form submission started", value);
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
        console.error("Error in form submission:", error);
        console.error("Error response:", error.response?.data);
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
    <div>
      {/* flex gap-5 items-center */}
      <div className="flex justify-end my-8 ">
        {/* <h2>Plan your day to increase productivity. Click to add your tasks</h2> */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white text-lg font-semibold px-4 py-2 rounded-lg"
        >
          + Add Task
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute top-0 left-0 right-0 h-full flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} role="wrapper">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white w-[34.5rem] min-h-[50vh] rounded-2xl p-10 space-y-3 mb-6"
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
                          className="w-full p-2 border rounded"
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
                          className="w-full p-2 border rounded"
                        />
                      </>
                    );
                  }}
                />
              </div>

              <div>
                <form.Field
                  name="tags"
                  children={(field) => (
                    <>
                      <label htmlFor={field.name}>Task tag</label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Task tags (e.g., work, personal, etc.)"
                        className="w-full p-2 border rounded"
                      />
                    </>
                  )}
                />
              </div>

              <div>
                <form.Field
                  name="priority"
                  children={(field) => (
                    <>
                      <label htmlFor={field.name}>Priority</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value as Priority)
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </>
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
