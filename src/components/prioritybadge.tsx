import React from "react";

const colorMap = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

type Props = {
  priority: "LOW" | "MEDIUM" | "HIGH";
};

const PriorityBadge: React.FC<Props> = ({ priority }) => {
  return (
    <span
      className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded-md ${colorMap[priority]}`}
    >
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </span>
  );
};

export default PriorityBadge;
