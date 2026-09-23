import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/choicelog-pages-title";
import { cn } from "@/lib/utils";

interface InsightCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export function InsightCard({ icon, title, children }: InsightCardProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="mb-3 flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        {icon}
                    </div>

                    <h3 className="pt-1 text-base font-semibold leading-snug">{title}</h3>
                </div>

                <p className="text-md leading-relaxed text-muted-foreground">
                    {children}
                </p>
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