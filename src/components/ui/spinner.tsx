import { PiSpinnerLight } from "react-icons/pi";
import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg" | "xl" | "xxl";

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  color?: string;
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  xxl: "h-12 w-12",
};

export const Spinner = ({
  size = "md",
  className,
  color = "text-muted-foreground",
  label = "Loading...",
}: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label={label}
      className="inline-flex items-center justify-center"
    >
      <PiSpinnerLight
        className={cn(sizeMap[size], color, className)}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};
