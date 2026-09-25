import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import { cn } from "@/lib/utils";

interface InsightCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}
export function InsightCard({
    icon,
    title,
    children,
}: InsightCardProps) {
    return (
        <Card
            className={cn(
                " bg-blue-50/60",
                "shadow-md hover:-translate-y-1 hover:bg-blue-300 shadow-blue-700 border-none transition-shadow hover:shadow-lg"
            )}
        >
            <CardContent className="p-4">
                <div className="mb-3 flex items-start gap-3">
                    <div
                        className="
              flex size-9 shrink-0 items-center justify-center
              rounded-lg bg-white
            "
                    >
                        {icon}
                    </div>

                    <h3 className="pt-1 text-base font-semibold leading-snug text-slate-900">
                        {title}
                    </h3>
                </div>

                <div className="text-sm leading-relaxed text-slate-700">
                    {children}
                </div>
            </CardContent>
        </Card>
    );
}

interface ChartCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

export function ChartCard({
    title,
    description,
    children,
    className,
}: ChartCardProps) {
    return (
        <Card className={cn("", className)}>
            <CardHeader className="pb-2">
                <PageHeader lineBefore header={title} textClassName="text-base" />
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    );
}