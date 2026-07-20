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

export function ForgotPasswordWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ background: "var(--gradient-subtle)" }}
    >
      {children}
    </div>
  );
}

export function ForgotPasswordMainContent({
  icon: Icon,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <Card
      className="w-full max-w-md rounded-2xl border border-border bg-card p-8 duration-500 animate-in fade-in slide-in-from-bottom-2 sm:p-10"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-7 text-blue-400" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
