import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function FormSection({
    icon: Icon,
    title,
    description,
    children,
    headerAction,
}: {
    icon: LucideIcon;
    title: string;
    description?: string;
    children: ReactNode;
    headerAction?: ReactNode;
}) {
    return (
        <Card
            className="
      group relative overflow-hidden
      grid grid-cols-1 md:grid-cols-[280px_1fr]
      gap-6
      rounded-2xl
      border border-blue-100
      p-6
      shadow-sm
      transition-all duration-300
      hover:-translate-y-0.5
      hover:border-blue-200
      hover:shadow-lg hover:shadow-blue-100/50
    "
        >
            {/* COLUNA ESQUERDA */}
            <header
                className="
        flex flex-col
        rounded-2xl
        border border-blue-100
        bg-gradient-to-br from-blue-50 to-sky-50/50
        p-5
      "
            >
                <div
                    className="
          grid size-10 shrink-0 place-items-center
          rounded-xl
          bg-white
          text-blue-800
          shadow-md
        "
                >
                    <Icon className="size-5" />
                </div>

                <div className="mt-4 min-w-0">
                    <h2 className="text-xl font-semibold tracking-tight text-blue-900">
                        {title}
                    </h2>

                    {description ? (
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                            {description}
                        </p>
                    ) : null}
                </div>
            </header>

            {/* COLUNA DIREITA */}
            <div
                className="
        min-w-0
        rounded-2xl
        p-2
        space-y-6
      "
            >
                {headerAction && (
                    <div className="flex justify-end">
                        {headerAction}
                    </div>
                )}

                {children}
            </div>
        </Card>
    );
}
export function FieldLabel({
    children,
    required,
    htmlFor,
}: {
    children: ReactNode;
    required?: boolean;
    htmlFor?: string;
}) {
    return (
        <Label
            htmlFor={htmlFor}
            className="mb-2 block text-base text-black font-medium tracking-tight"
        >
            {children}
            {required ? <span className="ml-1 text-blue-500">*</span> : null}
        </Label>
    );
}

export function FieldError({ children }: { children?: ReactNode }) {
    if (!children) return null;
    return (
        <p className="mt-2 text-xs text-destructive duration-200 animate-in fade-in">
            {children}
        </p>
    );
}