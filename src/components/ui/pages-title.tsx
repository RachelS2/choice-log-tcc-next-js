import { cn } from "@/lib/utils"

export function PageHeader({
    header,
    lineBefore,
    lineAfter,
    className,
}: {
    header: string
    lineBefore?: boolean
    lineAfter?: boolean
    className?: string
}) {
    return (
        <div
            className={cn(
                "mb-4 flex items-center  gap-3",
                className
            )}
        >
            {lineBefore && (
                <span className="h-px w-8 bg-blue-900" />
            )}

            <span className="text-[10px] font-semibold tracking-[0.24em] text-blue-900 uppercase">
                {header}
            </span>

            {lineAfter && (
                <span className="h-px w-8 bg-blue-900" />
            )}
        </div>
    )
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
                text-2xl
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
                "mt-5 max-w-md text-base leading-7 text-blue-900 sm:text-base",
                className
            )}
        >
            {subtitle}
        </p>
    )
}