import React from "react";

type Props = {
  activeFilter: "ALL" | "TODO" | "IN_PROGRESS" | "DONE";
  setActiveFilter: (status: Props["activeFilter"]) => void;
};

const TaskFilterButtons: React.FC<Props> = ({
  activeFilter,
  setActiveFilter,
}) => {
  const filters: Props["activeFilter"][] = [
    "ALL",
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => setActiveFilter(status)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition hover:bg-blue-100 hover:text-gray-800 ${
            activeFilter === status
              ? "bg-blue-500  text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {status === "ALL" ? "All" : status.replace("_", " ")}
        </button>
      ))}
    </div>
  );
};

export default TaskFilterButtons;
