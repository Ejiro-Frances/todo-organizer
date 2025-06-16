import React from "react";

type Props = {
  activeFilter: "ALL" | "TODO" | "IN_PROGRESS" | "DONE";
  setActiveFilter: (status: Props["activeFilter"]) => void;
  counts: Record<Props["activeFilter"], number>;
};

const TaskFilterButtons: React.FC<Props> = ({
  activeFilter,
  setActiveFilter,
  counts,
}) => {
  const filters: Props["activeFilter"][] = [
    "ALL",
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ];

  return (
    <div className="bg-[#FBFBFB] rounded-md py-4 px-4 flex gap-3 md:gap-5 mb-4">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => setActiveFilter(status)}
          className={`md:px-4 md:py-2 text-[0.625rem] md:text-sm font-medium transition-all duration-150 ${activeFilter === status ? "md:border-r-4 border-[#D9D9D9]" : ""}`}
        >
          <span
            className={`mr-2 md:mr-4 font-semibold ${activeFilter === status ? "text-[#004299]" : "text-[#999999]"}`}
          >
            {status === "ALL" ? "ALL" : `${status.replace("_", " ")}`}
          </span>
          <span
            className={`text-white rounded-full px-2 py-1 ${activeFilter === status ? "bg-[#004299]" : "bg-[#D9D9D9]"}`}
          >
            {status === "ALL" ? `${counts.ALL}` : `${counts[status]}`}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilterButtons;
