import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface EmptyStateProps {
  mainTitle?: string;
  description?: string;
  className?: string;
}

export default function EmptyDataState({
  mainTitle = "No items registered yet.",
  description = "Start building your personal catalog by registering your first product or service.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl text-center ",
        className
      )}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <Package className="h-8 w-8 text-blue-500" />
      </div>

      <h3 className="text-lg font-bold tracking-tight text-blue-500">
        {mainTitle}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}

