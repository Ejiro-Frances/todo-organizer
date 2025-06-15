import React from "react";
import { Skeleton } from "./ui/skeleton";

const LoadingIndicator: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-0 -translate-x-1/2 right-4 px-4 py-2">
      <div className="space-y-2">
        <Skeleton className="h-8 max-w-[40rem] w-[40%] rounded-lg bg-gray-200" />
        {/* <Skeleton className="h-8 max-w-[40rem] w-[70%] rounded-md bg-gray-200" /> */}
      </div>
    </div>
  );
};

export default LoadingIndicator;
