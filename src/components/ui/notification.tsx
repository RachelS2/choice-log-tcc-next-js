import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AuthCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function NotificationWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ background: "var(--gradient-subtle)" }}
    >
      {children}
    </div>
  );
}

export function NotificationContent({
  icon: Icon,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card
      className="w-full max-w-md rounded-2xl border border-border shadow-md bg-card p-8 duration-500 transition-all duration-300
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:shadow-lg hover:shadow-blue-100/50 animate-in fade-in slide-in-from-bottom-2 sm:p-10"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Decorative background */}
      <div
        className="
            pointer-events-none absolute -right-16 -top-16
            size-40 rounded-full
            bg-blue-100/40 blur-3xl
            transition-opacity duration-300
            group-hover:bg-blue-200/50
        "
      />
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-7 text-blue-400" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          {title}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="space-y-5">{children}</div>
      {footer ? (
        <div className="mt-6 text-center text-xs text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}
