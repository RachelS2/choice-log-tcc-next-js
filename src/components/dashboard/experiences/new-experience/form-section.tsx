import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function FormSection({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: LucideIcon;
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <Card
            className="rounded-2xl  border border-neutral-200 bg-white p-5 transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:border-neutral-300 bg-card p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
        >
            <header className="mb-6 flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon className="size-5 " />
                </div>
                <div>
                    <h2 className="text-lg text-black font-semibold tracking-tight">
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-0.5 text-base text-muted-foreground">{description}</p>
                    ) : null}
                </div>
            </header>
            <div className="space-y-6">{children}</div>
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