import { cn } from "@/lib/utils"

export function PageHeaderLine({
    className,
}: {
    className?: string;
}) {
    return (
        <span
            className={cn(
                "h-px w-8 bg-blue-900",
                className
            )}
        />
    );
}

export function PageHeader({
    header,
    lineBefore,
    lineAfter,
    className,
    textClassName,
    lineClassName,
}: {
    header: string;
    lineBefore?: boolean;
    lineAfter?: boolean;
    className?: string;
    textClassName?: string;
    lineClassName?: string;
}) {
    return (
        <div
            className={cn(
                "flex items-center gap-3",
                className
            )}
        >
            {lineBefore && (
                <PageHeaderLine className={lineClassName} />
            )}

            <span
                className={cn(
                    "text-[10px] font-semibold tracking-[0.24em] text-blue-900 uppercase",
                    textClassName
                )}
            >
                {header}
            </span>

            {lineAfter && (
                <PageHeaderLine className={lineClassName} />
            )}
        </div>
    );
}

export function PageTitle({
    title,
    className,
}: {
    title: string
    className?: string
}) {
    return (
        <h1
            className={cn(
                `
                font-[family-name:var(--font-inter)]
                font-semibold
                leading-tight
                tracking-[-0.02em]
                text-blue-800
                sm:text-4xl
                `,
                className
            )}
        >
            {title}
        </h1>
    )
}


export function PageSubtitle({
    subtitle,
    className,
}: {
    subtitle: string
    className?: string
}) {
    return (
        <p
            className={cn(
                "max-w-md text-base leading-7 text-blue-900 sm:text-base",
                className
            )}
        >
            {subtitle}
        </p>
    )
}