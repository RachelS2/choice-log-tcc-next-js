import { LucideIcon, PackageOpen } from "lucide-react";
import { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center  rounded-2xl px-6 py-14 text-center"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="grid size-14 place-items-center rounded-full justify-center rounded-2xl bg-blue-900">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight text-blue-900">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-lg leading-relaxed text-neutral-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
