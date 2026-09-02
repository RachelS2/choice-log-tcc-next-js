export function PageTitle({ title, subtitle, description }: { title: string; subtitle: string; description?: string }) {
    return (
        <header className="relative mb-10 flex flex-col items-center text-center sm:mb-14">
            <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-blue-900 " />
                <span className="text-[10px] font-semibold tracking-[0.24em]  text-blue-900 uppercase">
                    {title}
                </span>
                <span className="h-px w-8 bg-blue-900" />
            </div>
            <h1
                className="
        font-[family-name:var(--font-inter)]
        text-2xl
        font-semibold
        leading-tight
        tracking-[-0.02em]
        text-blue-800 
        sm:text-4xl
    "
            >
                {subtitle}
            </h1>
            {description && (
                <p className="mt-5 max-w-md text-base leading-7 text-blue-900 sm:text-base">
                    {description}
                </p>
            )}
        </header>
    )
}