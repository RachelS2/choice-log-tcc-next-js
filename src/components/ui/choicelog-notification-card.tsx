import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import DecorativeBackground from "./choicelog-decorative-background";

interface AuthCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

export function NotificationContent({
  icon: Icon,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center px-4 py-10"
    >
      <Card
        className="
          w-full max-w-md
          rounded-2xl
          border-b border-blue-900
          bg-card
          shadow-lg
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-blue-100/50
          animate-in fade-in slide-in-from-bottom-2
          sm:p-10
        "
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <DecorativeBackground />

        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-5 grid size-14 place-items-center rounded-full bg-blue-900">
            <Icon className="size-7 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            {title}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        {children && (
          <div className="space-y-3 flex flex-col items-center justify-center">{children}</div>
        )}
        {footer ? (
          <div className="mt-6 text-center text-xs text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </Card>
    </div>
  );
}
