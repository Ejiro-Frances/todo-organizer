import React from "react";

type Props = {
  editForm: any;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const TaskEditForm: React.FC<Props> = ({
  editForm,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <>
      <input
        type="text"
        value={editForm.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full border p-2 mb-2"
        placeholder="Task name"
      />
      <textarea
        value={editForm.description}
        onChange={(e) => onChange("description", e.target.value)}
        className="w-full border p-2 mb-2"
        placeholder="Description"
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div>
          <label className="text-sm block mb-1">Priority</label>
          <select
            value={editForm.priority}
            onChange={(e) => onChange("priority", e.target.value)}
            className="w-full border p-2"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div>
          <label className="text-sm block mb-1">Tag</label>
          <input
            type="text"
            value={editForm.tags}
            onChange={(e) => onChange("tags", e.target.value)}
            className="w-full border p-2"
            placeholder="Tags"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">Status</label>
          <select
            value={editForm.status}
            onChange={(e) => onChange("status", e.target.value)}
            className="w-full border p-2"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onSave} className="text-green-600 hover:underline">
          Save
        </button>
        <button onClick={onCancel} className="text-gray-600 hover:underline">
          Cancel
        </button>
      </div>
    </>
  );
};

export default TaskEditForm;
