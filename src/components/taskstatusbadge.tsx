import React from "react";

const statusColorMap = {
  TODO: "text-blue-600",
  IN_PROGRESS: "text-yellow-600",
  DONE: "text-green-600",
};

type Props = {
  status: "TODO" | "IN_PROGRESS" | "DONE";
};

const TaskStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span className={`capitalize ${statusColorMap[status]}`}>
      Status: {status.replace("_", " ")}
    </span>
  );
};

export default TaskStatusBadge;
